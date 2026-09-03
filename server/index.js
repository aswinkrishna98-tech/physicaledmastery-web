// ============================================================================
// index.js — PE Prep payments server.
//
// This single Express app does two jobs:
//   1. Serves the PE Prep front-end (../index.html) as static files, so the
//      whole product deploys as ONE service.
//   2. Exposes the payment API the front-end calls to go from "Free" to
//      "Pro"/"Pro+" for real, via Razorpay.
//
// See server/README.md for how to get Razorpay keys and deploy this.
// ============================================================================

require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const db = require("./db");
const { createOrder, verifyPaymentSignature, verifyWebhookSignature } = require("./razorpay");

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));

// ----------------------------------------------------------------------------
// IMPORTANT: the webhook route needs the raw request body (not JSON-parsed)
// to verify Razorpay's signature correctly, so it's registered BEFORE the
// express.json() middleware and given its own raw-body parser.
// ----------------------------------------------------------------------------
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signatureHeader = req.headers["x-razorpay-signature"];
    let valid = false;
    try {
      valid = verifyWebhookSignature({ rawBody: req.body, signatureHeader });
    } catch (e) {
      console.error("Webhook verification error:", e.message);
      return res.status(500).send("Webhook not configured");
    }
    if (!valid) {
      console.warn("Webhook signature mismatch — ignoring request");
      return res.status(400).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString("utf8"));
    // payment.captured is the reliable, authoritative confirmation that money
    // actually moved. This is what should ultimately gate access in
    // production — not just the browser-side "verify-payment" call below,
    // which can be skipped if a user closes the tab mid-flow.
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;
      const { userId, plan } = payment.notes || {};
      if (userId && plan) {
        db.setPlan(userId, plan);
        db.recordOrder(userId, {
          orderId: payment.order_id,
          paymentId: payment.id,
          amount: payment.amount,
          source: "webhook",
        });
        console.log(`[webhook] Activated "${plan}" for user ${userId}`);
      }
    }
    res.json({ received: true });
  }
);

app.use(express.json());

// ----------------------------------------------------------------------------
// GET /api/plan/:userId — what plan is this browser currently entitled to?
// The front-end calls this on load to sync its local UI with the real,
// server-side entitlement (instead of trusting whatever is in localStorage).
// ----------------------------------------------------------------------------
app.get("/api/plan/:userId", (req, res) => {
  const user = db.getUser(req.params.userId);
  res.json({ plan: user.plan });
});

// ----------------------------------------------------------------------------
// POST /api/create-order — step 1 of checkout: ask Razorpay for an order.
// Body: { userId: string, plan: "pro" | "proplus" }
// ----------------------------------------------------------------------------
app.post("/api/create-order", async (req, res) => {
  const { userId, plan } = req.body || {};
  if (!userId || !plan) {
    return res.status(400).json({ error: "userId and plan are required" });
  }
  try {
    const order = await createOrder({ plan, userId });
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID, // public key — safe to send to the browser
    });
  } catch (e) {
    // Razorpay SDK errors come in different shapes depending on whether the
    // failure happened before or after reaching Razorpay's API (a bad key vs.
    // a network-level failure vs. a validation error) — normalize to a
    // readable string either way so the client never sees a bare `{}`.
    const message =
      e?.message ||
      e?.error?.description ||
      (typeof e === "string" ? e : null) ||
      "Order creation failed — check RAZORPAY_KEY_ID/SECRET and server network access.";
    console.error("create-order failed:", message, e);
    res.status(500).json({ error: message });
  }
});

// ----------------------------------------------------------------------------
// POST /api/verify-payment — step 2 of checkout: the browser calls this right
// after Razorpay's Checkout modal reports success, so the UI can unlock
// immediately. The webhook above is the durable, authoritative record — this
// endpoint is what makes the unlock feel instant instead of waiting on a
// webhook round-trip.
// Body: { userId, plan, razorpay_order_id, razorpay_payment_id, razorpay_signature }
// ----------------------------------------------------------------------------
app.post("/api/verify-payment", (req, res) => {
  const {
    userId,
    plan,
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = req.body || {};

  if (!userId || !plan || !orderId || !paymentId || !signature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const valid = verifyPaymentSignature({ orderId, paymentId, signature });
  if (!valid) {
    console.warn(`Signature mismatch for user ${userId}, order ${orderId}`);
    return res.status(400).json({ error: "Payment signature verification failed" });
  }

  const user = db.setPlan(userId, plan);
  db.recordOrder(userId, { orderId, paymentId, source: "verify-payment" });
  res.json({ success: true, plan: user.plan });
});

// ----------------------------------------------------------------------------
// Static front-end (built index.html lives one directory up)
// ----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "..")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`PE Prep server listening on http://localhost:${PORT}`);
  if (!process.env.RAZORPAY_KEY_ID) {
    console.warn(
      "⚠️  RAZORPAY_KEY_ID is not set — copy .env.example to .env and add your keys, " +
        "or payment endpoints will fail. See server/README.md."
    );
  }
});
