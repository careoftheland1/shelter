# Starting Point flow

## Offer

**Starting Point** is a fixed-price, conversation-first service for someone who is curious, beginning a project or trying to identify the right first move.

- Price: $200, paid once
- Format: one private two-hour video working session
- Preparation: light review before the meeting
- Client may bring: land information, a Shelter plan, plans of their own or early questions
- Follow-up: a written outline of useful next steps

The plans remain free. The client is paying for focused time, judgment and guidance—not access to drawings.

## Customer flow

1. The visitor selects **Book your Starting Point** on the Support page.
2. The button opens a Stripe Payment Link for the $200 Starting Point product.
3. Stripe collects payment and sends a receipt.
4. After payment, Stripe redirects the client to a scheduling page.
5. The client chooses a two-hour meeting time and submits relevant plans, site information or questions.
6. Shelter reviews the submitted material before the meeting.
7. The two-hour video session takes place.
8. Shelter sends a concise written outline of useful next steps.

## Stripe product

- Product name: `Starting Point`
- Price: `$200 USD`
- Payment type: one-time
- Description: `One private two-hour working session, light preparation and a written outline of useful next steps.`
- Quantity: fixed at one
- Promotion codes: optional
- Billing address: only if needed for tax or bookkeeping

Recommended payment-link button text:

> Book your Starting Point ↗

## After payment

Preferred destination:

> Stripe success page → scheduling page

The scheduling page can be provided by Calendly, Cal.com or a simple Shelter page connected to an appointment system. It should:

- Offer only eligible two-hour appointment windows
- Collect the client’s name, email and timezone
- Ask what they are hoping to understand or decide
- Accept links or uploads for plans, site photographs and supporting material
- Explain how the video link will be delivered
- Send confirmations and reminders

If scheduling software is not ready, redirect to a Shelter confirmation page instructing the client to email `build@onthe.land` with availability and project material.

## Policy copy

Suggested concise language near checkout:

> Reschedule with at least 24 hours’ notice. Fully refundable until the session is scheduled.

The final cancellation, refund, rescheduling and no-show terms should also appear in the Stripe product description or linked service terms.

## Temporary flow

Until the Stripe Payment Link and scheduling destination exist, keep the current email CTA:

- Button: `Find your starting point ↗`
- Link: `mailto:build@onthe.land?subject=Starting Point session`

## Site handoff

When the Stripe Payment Link is ready:

1. Replace the Starting Point email link in `src/PackagesPage.jsx` with the Stripe URL.
2. Change the CTA from **Find your starting point** to **Book your Starting Point**.
3. Add the short rescheduling/refund policy near the CTA.
4. Configure Stripe’s successful-payment redirect to the scheduling destination.
5. Complete a real test payment, refund and rescheduling pass before publishing.

The $1,000+ Supported, Guided and Custom paths should continue to begin by email at `build@onthe.land`; they are scoped through conversation rather than purchased directly.
