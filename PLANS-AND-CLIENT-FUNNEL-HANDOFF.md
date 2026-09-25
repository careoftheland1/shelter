# Shelter plan access and client funnel

Date: 2026-09-25
Status: Planning handoff. No implementation or deployment has been performed.

Visual and interaction direction: [Client funnel design direction](CLIENT-FUNNEL-DESIGN-DIRECTION.md), based on the supplied application reference and Shelter's stacked package layers.

## Objective

Keep Shelter plans free while introducing email capture for complete plan sets. Help prospective Supported and Guided clients understand the offerings and share enough project context to make the first meeting more efficient.

The requested direction is an email gate, a client funnel, and dedicated offering pages with scope details and FAQs. The recommendations below are a proposed implementation plan; unresolved business terms are listed at the end.

## Current state

Verified in the local repository; production parity has not been verified:

- `src/ShelterPage.jsx` offers a public sample plan sheet and specifications. Complete plan sets are requested through a `mailto:` link.
- `src/PackagesPage.jsx` compares The Open Set, Starting Point, Supported, Guided, and Custom. Paid service inquiries currently use `mailto:` links.
- Starting Point is advertised as $200 for a one-hour session, credited toward Supported or Guided.
- Supported is advertised at $1,000 for pre-construction support.
- Guided is advertised at $5,000 for support through construction within an agreed project duration.
- `STARTING-POINT-FLOW.md` describes a two-hour session, which conflicts with the current page's one-hour offer. Resolve this before implementing booking.
- `SHELTER-ECOSYSTEM-LAUNCH-PREP.md` identifies privacy updates needed when introducing email, scheduling, payments, or stored project information.

## Proposed customer paths

Plan discovery:

Public shelter page → email capture → plan delivery → optional project-stage question → opted-in guidance emails → offering page → project brief.

Direct service inquiry:

Supported or Guided page → project brief → Shelter review → fit call → written scope → acceptance and payment → kickoff.

Early-stage advice:

Starting Point → paid working session → written next steps → Supported or Guided if appropriate, with the advertised $200 credit.

Do not require prospective clients to download plans before inquiring. Do not make Starting Point a prerequisite for ready Supported or Guided clients.

## 1. Email access to free plans

### Public content

Keep shelter descriptions, images, sample sheets, and specifications public. Gate complete plan sets only.

Suggested CTA: **Email me the free plans**.

This is a soft email gate, consistent with an open building system. Recipients can share downloaded files. It is not a paid subscription or a digital rights management system.

### Capture and delivery

- Require email only at the first step.
- Preserve the selected shelter/plan automatically.
- Offer a separate optional opt-in for building guidance and updates.
- Deliver the requested plans regardless of marketing opt-in.
- Send a return link so recipients can retrieve plans without creating an account.
- Explain what is included, file formats, version, and how to get help if delivery fails.
- Provide clear success, error, retry, and resend states.

After submission, ask one optional question: **Where are you in the process?**

- Exploring
- Looking for land
- Have land
- Preparing to build
- Already building

Do not delay delivery pending this answer. Confirm which complete plan files are actually ready before promising automatic delivery. If a set is unavailable, describe its real availability instead.

## 2. Dedicated offering pages

Keep `/packages/` as the comparison page. Add `/supported/` and `/guided/`, and link to them from relevant package rows and shelter pages.

Each offering page should contain:

1. Who the service is for and the outcome it supports.
2. Price and the conditions defining that price.
3. Concrete deliverables, with examples where available.
4. How the relationship works from inquiry to completion.
5. What the client supplies and handles locally.
6. Scope limits and how additional work is agreed.
7. FAQs and relevant service terms.
8. A **Tell us about your project** CTA.

### Scope to define before final copy

| Topic | Supported — currently $1,000 | Guided — currently $5,000 |
| --- | --- | --- |
| Endpoint | Ready to move into construction | Support through an agreed construction period |
| Core work | Siting, adaptations, permit preparation | Supported plus construction consultations |
| Time boundaries | Meetings, revisions, permit response rounds | Meeting frequency, response times, project duration |
| Local responsibilities | Engineering, surveys, submissions | Inspections, contractors, site decisions |
| Additional work | Changes beyond the agreed scope | Delays, expanded scope, extended duration |

Do not imply unlimited revisions, guaranteed permit approval, engineering services, or continuous availability unless those are expressly part of the offer.

### FAQs to answer

- Can I use plans of my own?
- Do I need land before starting?
- Where do you work?
- What exactly does permit preparation include?
- Who submits to and communicates with the building department?
- Are engineering, surveys, testing, and permit fees included?
- How many meetings and revisions are included?
- How quickly can I expect a response?
- Who is responsible for construction and on-site decisions?
- Can I move from Supported to Guided, and how is previous payment treated?
- How does the Starting Point credit work?
- What happens if the project pauses or takes longer than expected?
- How are additional work, cancellations, and refunds handled?

A dedicated Starting Point page can follow once its session length and booking terms are settled. A Custom page is outside the first release.

## 3. Shared project brief

Both offering pages should lead to one short form. Preselect the originating offering, but allow the visitor to change it or choose **Not sure**.

Collect:

- Name and email
- Approximate project location
- Land status
- Selected plan or approximate project size
- Expected timeline, including an unsure option
- Rough construction budget, including an unsure option
- Who will lead/build the project
- Main question or help needed
- Optional links to plans, photographs, or site information

Reuse previously supplied information when possible. Avoid requiring uploads in the first release; optional links are enough to begin a conversation.

After submission, show a confirmation, the next step, and a response window Shelter can sustain. Create a concise internal brief containing the answers, selected offering, plan interest, and source page.

## 4. Qualification and meetings

Review briefs manually at first. Use location, project scope, readiness, timeline, and desired support to decide the next step. Budget alone should not silently reject an inquiry.

Proposed routing:

- Suitable Supported/Guided prospect: invite to a short free fit call.
- Needs substantive help finding direction: suggest the $200 Starting Point session.
- Needs original design: route to a Custom conversation.
- Too early or outside the service scope: respond with an appropriate resource or explanation.

The free fit call establishes mutual fit and proposed scope. Starting Point is paid project advice with preparation and written next steps. Keep those purposes clear in customer-facing copy.

After a successful fit call, provide a written scope covering deliverables, client responsibilities, exclusions, schedule, fees, and change handling before kickoff.

## 5. Follow-up emails

The requested plan-delivery email is separate from optional prospect marketing. Send the following proposed sequence only to people who opt in, over approximately ten days:

| Message | Useful content | Next step |
| --- | --- | --- |
| Getting oriented | How to read the plans and what to establish about the site | Identify project stage or reply with a question |
| Preparing to build | Decisions that need local input and preparation | Explore Supported |
| Building with help | What working with Shelter during construction looks like | Explore Guided or submit a project brief |

Use a monitored reply address. Stop the prospect sequence when someone inquires, becomes a client, or unsubscribes. Avoid duplicate enrollment from repeated downloads. Inquiry confirmations and client communications should follow their own workflow.

## 6. Operational and technical requirements

Select implementation services later; no provider is selected by this handoff. First check existing On the Land systems for reusable email delivery, contact storage, forms, and scheduling.

Minimum capabilities:

- Server-side form handling and input validation
- Basic abuse prevention
- Reliable plan email delivery and resend handling
- Contact records with selected plans, stage, source, consent status, and inquiry status
- Consent timestamps and unsubscribe handling for the optional sequence
- Duplicate submission/enrollment handling
- Internal project brief notification and a simple inquiry pipeline
- Privacy notice updated to reflect the actual data flow and providers
- Agreed retention and deletion handling for contact and project information

Suggested pipeline: **New inquiry → Reviewing → Invited to call → Call booked → Proposal sent → Client / Not proceeding**.

Keep API credentials server-side. If download access is intended to be enforced, implement it at the server/storage level; hiding a public URL in the interface does not enforce access. Choose the lightest access mechanism consistent with the intended soft gate.

## 7. Release plan

### Phase 1 — clarify the offers and remove manual delivery

1. Confirm complete plan files and versions available for delivery.
2. Set Supported/Guided scope boundaries and resolve Starting Point duration.
3. Draft and build Supported and Guided pages.
4. Add the shared project brief and internal notification.
5. Add email capture, automatic plan delivery, and optional stage capture.
6. Update relevant CTAs and privacy copy.
7. Test the complete customer and internal handoffs before launch.

Review inquiries manually during this phase to learn which questions predict a useful fit call.

### Phase 2 — follow-up and scheduling

1. Add the optional email sequence and suppression rules.
2. Connect reviewed inquiries to fit-call scheduling.
3. Add the simple inquiry pipeline and proposal follow-up.
4. Implement Starting Point booking once its terms are resolved, reconciling `STARTING-POINT-FLOW.md`.
5. Adjust questions and copy based on real inquiry quality.

## 8. Acceptance checks

- Public previews remain accessible without email.
- Each selected plan leads to the correct available file/version.
- A visitor can receive plans without opting into marketing.
- Delivery failures have a usable recovery path.
- Repeated requests do not create duplicate sequences.
- Both offering pages communicate approved scope and lead to the correct preselected inquiry form.
- A submitted inquiry reaches Shelter with enough context for review.
- Inquirers, clients, and unsubscribed contacts are excluded from prospect follow-up.
- Forms work on mobile and with keyboard navigation, including validation and confirmation states.
- Published prices, session duration, credits, and service terms agree across pages and emails.
- Production links and delivery are checked after deployment.

## 9. Measures of success

Track plan requests, successful deliveries, project briefs, qualified inquiries, booked/attended fit calls, proposals, and signed clients. Measure time Shelter spends per signed client as well as conversion between stages.

Use these to improve inquiry quality and reduce repeated explanation. Email list size alone is not the objective. Avoid placing email addresses or project details in analytics events.

## Decisions still needed

1. What exact deliverables and amount of time do Supported and Guided include at their current prices? Are prices fixed within defined scope or starting prices?
2. What geographic/project limits apply, and which services remain with local professionals?
3. What meeting cadence, response window, revision allowance, and duration are sustainable?
4. What happens with pauses, upgrades, additional work, cancellations, and refunds?
5. Is Starting Point one hour or two, and what are its credit terms?
6. Which complete plan sets are ready for automated delivery?
7. Which existing email, contact, and scheduling systems should be reused?
8. Who reviews inquiries, and what response window can be published?

Start with decisions 1–5: they determine the promises on the offering pages and the clients the funnel should bring into meetings.
