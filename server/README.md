# PE Prep — Payments Backend

This is the real backend the PE Prep front-end talks to once you configure it: it
creates Razorpay orders, verifies payments, and handles Razorpay's webhook. It
also serves the app's `index.html`, so the whole product deploys as one
service.

**Read this before you start:** the version of PE Prep published as a Claude
Artifact (the link in your conversation) cannot use this backend as-is. The
Artifact hosting environment only allows a small allowlist of script sources,
and `checkout.razorpay.com` (Razorpay's checkout widget) is not on it — so a
real payment popup can never open there, no matter how this backend is
configured. To actually take real payments, you need to run **both** this
backend and the front-end (`index.html`) somewhere you control — see
"Deploying" below. Until you do that, the Artifact link keeps working exactly
as it does today (the free demo toggle, clearly labeled as not a real charge).

## What you get

- `POST /api/create-order` — creates a Razorpay order for the "pro" (₹499) or
  "proplus" (₹899) plan.
- `POST /api/verify-payment` — verifies the signature Razorpay's Checkout
  returns after a successful payment, and unlocks the plan for that user.
- `POST /api/webhook` — Razorpay's server-to-server webhook. This is the
  authoritative record of payment (it fires even if the user closes the tab
  right after paying), and is what production should ultimately trust.
- `GET /api/plan/:userId` — lets the front-end ask "what plan does this
  browser actually have?" instead of trusting local storage.
- Serves `../index.html` as static files, so `http://localhost:4000/` shows
  the app itself.

## What this is NOT

This is a working reference implementation, not a finished production system.
Before real users and real money touch it:

- **Swap the database.** `db.js` is a single JSON file with no locking — fine
  for trying this out, unsafe under concurrent traffic. Replace its three
  functions with calls to Postgres (or similar); nothing else needs to change.
- **Add real user accounts.** Right now "userId" is just a random ID the
  front-end generates and stores in `localStorage` — good enough to prove the
  payment flow end-to-end, but it means switching browsers loses your plan,
  and there's no login. Pair this with a real auth system before launch.
- **Use HTTPS everywhere.** Razorpay requires it in live mode; most hosts
  (Render, Railway, Vercel) give you this by default.

## 1. Get Razorpay API keys

1. Sign up at [razorpay.com](https://razorpay.com) (this requires your own
   business details — Claude can't create this account for you).
2. In the Razorpay Dashboard, switch to **Test Mode** (toggle top-left) —
   test mode lets you run the entire flow with fake money and Razorpay's
   published test card numbers, with zero risk, before ever touching live
   keys.
3. Go to **Settings → API Keys → Generate Test Key**. Copy the Key ID and Key
   Secret.
4. Copy `.env.example` to `.env` in this folder and paste them in:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 2. Run it locally

```bash
cd server
npm install
npm start
```

Visit `http://localhost:4000` — you should see the PE Prep app itself, now
served by this backend.

To actually test a payment locally, also point the front-end at this backend
(see "Front-end configuration" below), then use one of
[Razorpay's test cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
— e.g. card number `4111 1111 1111 1111`, any future expiry, any CVV — to
complete a fake but fully real end-to-end payment in test mode.

## 3. Set up the webhook

1. In the Razorpay Dashboard: **Settings → Webhooks → Add New Webhook**.
2. Webhook URL: `https://YOUR_DEPLOYED_URL/api/webhook`
   (this only works once the backend is deployed somewhere with a public URL
   — see "Deploying" below; you can skip this step while testing purely
   locally, since `verify-payment` alone is enough to see the flow work).
3. Active events: check at least `payment.captured`.
4. Save, then copy the "Webhook Secret" it generates into your `.env`:
   ```
   RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 4. Front-end configuration

Open `app-01-core.jsx` (in the parent `pe-prep/` folder) and find the
`PAYMENTS` config near the top:

```js
const PAYMENTS = {
  backendUrl: "", // e.g. "https://pe-prep-api.onrender.com" once deployed
};
```

- **Left empty** (the default): the app behaves exactly as it does in the
  published Artifact today — "Upgrade" instantly flips the plan locally with
  a toast explaining no real payment occurred. Nothing about this file
  changes what's currently live.
- **Set to your backend's URL**: "Upgrade" now calls this backend, opens
  Razorpay's real Checkout modal, and only unlocks the plan after a verified
  payment. If the Razorpay script fails to load (for example, because it's
  running somewhere with a script-loading restriction), the app tells the
  user real checkout isn't available there rather than silently faking it.

After changing this constant, rebuild `index.html` with `python3 build.py`
(from the `pe-prep/` folder) so the change is baked into the file this server
serves.

## 5. Deploying

This backend + the static `index.html` need to run together, on a host that
can run a persistent Node process (not a purely static host). Render and
Railway both have straightforward free/cheap tiers for this:

**Render**
1. Push this whole `pe-prep/` folder (including `server/`) to a GitHub repo.
2. New → Web Service → connect the repo.
3. Root directory: `server`. Build command: `npm install`. Start command:
   `npm start`.
4. Add your `.env` values as environment variables in Render's dashboard
   (never commit the real `.env` file to git).
5. Once deployed, Render gives you a URL like
   `https://pe-prep-api.onrender.com` — use that as `PAYMENTS.backendUrl`
   (step 4 above) and as the webhook URL (step 3 above).

**Railway** follows the same shape: connect the repo, set the root directory
to `server`, add the environment variables, deploy.

Once both the webhook and `PAYMENTS.backendUrl` point at your live deployment,
and you've flipped your Razorpay keys from test mode to live mode (a separate
step in the Razorpay dashboard, with its own KYC requirements), real payments
are live.
