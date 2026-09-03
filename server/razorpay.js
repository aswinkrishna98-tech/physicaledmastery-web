// ============================================================================
// razorpay.js — thin wrapper around the Razorpay SDK.
//
// Two responsibilities, both of which MUST happen server-side because they
// require RAZORPAY_KEY_SECRET, which must never be shipped to the browser:
//   1. createOrder()      — ask Razorpay to create an order before checkout opens
//   2. verifySignature()  — confirm a completed payment's signature is genuine
// ============================================================================

const crypto = require("crypto");
const Razorpay = require("razorpay");

const PLAN_AMOUNTS_INR = {
  // Amounts in paise (INR x100), matching the prices shown on the Pricing page.
  pro: 49900, // ₹499
  proplus: 89900, // ₹899
};

function getClient() {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new Error(
      "RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET are not set. Copy .env.example to " +
        ".env and fill in your Razorpay test (or live) keys before calling this."
    );
  }
  return new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
}

async function createOrder({ plan, userId }) {
  const amount = PLAN_AMOUNTS_INR[plan];
  if (!amount) {
    throw new Error(`Unknown plan "${plan}". Expected "pro" or "proplus".`);
  }
  const client = getClient();
  const order = await client.orders.create({
    amount, // in paise
    currency: "INR",
    receipt: `pe-prep-${userId}-${Date.now()}`,
    notes: { userId, plan },
  });
  return order;
}

/**
 * Verifies the signature Razorpay's Checkout returns to the browser after a
 * successful payment. This confirms the response genuinely came from
 * Razorpay and wasn't forged by a client trying to unlock Pro for free.
 *
 * Per Razorpay's docs, the expected signature is:
 *   HMAC_SHA256(order_id + "|" + payment_id, key_secret)
 */
function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const { RAZORPAY_KEY_SECRET } = process.env;
  const expected = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return expected === signature;
}

/**
 * Verifies a Razorpay webhook's signature. Webhooks are the authoritative,
 * server-to-server source of truth (unlike the browser-returned signature
 * above, which a modified client could simply choose not to send).
 * Must be computed over the RAW request body — see index.js for why the
 * webhook route uses express.raw() instead of express.json().
 */
function verifyWebhookSignature({ rawBody, signatureHeader }) {
  const { RAZORPAY_WEBHOOK_SECRET } = process.env;
  if (!RAZORPAY_WEBHOOK_SECRET) {
    throw new Error("RAZORPAY_WEBHOOK_SECRET is not set in .env");
  }
  const expected = crypto
    .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  return expected === signatureHeader;
}

module.exports = { PLAN_AMOUNTS_INR, createOrder, verifyPaymentSignature, verifyWebhookSignature };
