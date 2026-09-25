# Shelter client funnel — design direction

Date: 2026-09-25
Status: Interface implemented; form delivery integration remains pending.

Companion: [Plans and client funnel handoff](PLANS-AND-CLIENT-FUNNEL-HANDOFF.md).

## Direction

A quiet, one-question-at-a-time conversation built from Shelter's stacked earth-colored layers. Each answer adds to a project brief. Continuing brings the next layer forward; previous layers remain available to revisit.

Carry the clarity and restraint of the supplied reference into the visual language already established on `/packages/`: broad surfaces, oversized Public Sans headings, small monospace labels, fine rules, square edges, and progressive material colors.

This document defines the application experience for Supported and Guided. The free-plan email gate stays a separate, much shorter interaction.

## Reference observations

Source: `/home/careoftheland/Downloads/ethereal-application-funnel.mp4`.

Reviewed sampled frames across the 27-second silent screen recording. The video demonstrates a narrow mobile presentation within a larger background; it does not establish a desktop layout. Timing below is approximate. Exact transition durations should be determined in the Shelter prototype.

| Moment | Observed behavior | Shelter interpretation |
| --- | --- | --- |
| Opening | Sparse introduction, prominent primary action, secondary “How this works” link | Brief invitation and a clear explanation of what happens after submission |
| Around 3 seconds | Dark information sheet explains application, personal review, and conversation | Offer a concise process explanation without leaving the flow |
| Around 6–18 seconds | One prompt and answer area, restrained progress indicator, consistent Continue and Back actions | One decision per layer, stable controls, visible progress |
| Around 21 seconds | Contact details collected near the end | Let people describe the project before asking where to reply |
| Around 24 seconds | Personalized confirmation and next-step explanation | Confirm receipt and set an honest expectation for human review |

The reference's cleanliness comes from limited competing elements, generous space, a clear text hierarchy, and repeated control placement. Its teal glow, translucent surfaces, rounded phone frame, serif display type, and exclusivity language are not part of this direction. Shelter should use its own palette and welcoming project language.

The recording does not demonstrate error recovery, keyboard behavior, persistence, or a full desktop experience. Requirements for those below are design proposals.

## Existing Shelter foundation

Sources: `src/PackagesPage.jsx` and `src/index.css`, including later overrides.

- Desktop package rows use sticky positioning with successive offsets of 72, 100, 128, 156, and 184 pixels, creating a visible stack.
- Current package colors progress through `#e0d9cb`, `#c9bda1`, `#ad8f68`, `#8a5a3c`, and `#241e17`.
- Large headings use Public Sans with tight tracking; small labels use Source Code Pro.
- Rows combine a strong left-hand title with supporting material on the right.
- Fine borders and broad rectangular actions provide structure.
- The existing mobile package rows use normal document flow rather than the desktop sticky stack.

Reuse this visual grammar. The questionnaire needs its own controlled progression; do not directly copy the marketing page's long scrolling behavior or small body-text sizes into form controls.

## Entry and page structure

Proposed route: `/project/`, shared by Supported and Guided. Preserve the originating offering and selected plan as editable context. Direct entry works without either.

Use a compact Shelter header, a back-to-offering link when relevant, and restrained progress. Keep service details and FAQs on the offering pages, with a small contextual link available from the flow.

Opening copy direction:

> Tell us about your build.
>
> A few questions about the land, the project, and where you could use a hand. We’ll read your brief and reply with a useful next step.
>
> Begin →

Secondary action: **How this works**. Explain: share the brief, Shelter reviews it, then agrees the next step with the visitor. Do not promise an automatic calendar invitation or a response deadline until the operational policy is approved.

Avoid a full-height introductory marketing section before the first question. An approximate completion time may be added after testing with real users.

## The layer interaction

One active question occupies the main panel. A compact strip above it represents completed steps. Each completed step has a short topic label and an Edit action; keep detailed answers in the review screen.

1. The visitor answers the active question.
2. They explicitly choose Continue. Selecting an option never advances automatically.
3. Validate that question and preserve the answer.
4. The next opaque panel rises from below, covering the prior panel while leaving its header strip visible.
5. Focus moves to the new question heading after the transition.
6. Back or a completed-step Edit action returns to that answer without clearing later answers.

On returning from an edit, preserve all answers that remain applicable. If an answer makes a dependent field irrelevant, explain the change and omit that field from the submitted brief.

The stack is controlled by form state. Wheel/touch scrolling moves within content; it must not answer, skip, or advance questions. Do not use scroll snapping to trap someone in a step.

### Desktop composition

Use the available page width with roughly 6vw outer gutters. Place the question on the left and its answer controls on the right, following the package-row composition. Keep answer text to a readable width, approximately 480–640px.

```text
Shelter                                        Back to Supported

01 / Land          Completed                              Edit
02 / Project       Completed                              Edit
┌─────────────────────────────────────────────────────────────┐
│ 03 / Timing                                                 │
│                                                             │
│ When are you             ○ Within six months                 │
│ hoping to build?         ○ Six to twelve months               │
│                          ○ Later                             │
│                          ○ Still exploring                   │
│                                                             │
│                          Back                Continue →      │
└─────────────────────────────────────────────────────────────┘
```

This is a spatial sketch, not exact sizing. Completed-step labels must remain comfortably clickable; do not inherit the package page's 28px offset as the hit-target height.

Show at most three completed strips at once on large screens. Earlier steps remain reachable through a compact “View answers” control. Avoid allowing eight or more accumulated strips to consume the viewport.

### Mobile composition

Use full-width panels with 20–24px internal gutters. Put the question above the answer controls. Preserve a small hint of the preceding layer and a progress label; collapse the rest of the stack into View answers.

Keep Back and Continue in a consistent action area where space permits. When the keyboard opens or content is long, allow natural scrolling so controls and errors remain reachable. Never cover an input with a fixed action bar. Respect device safe areas and small landscape viewports.

## Question sequence

Use one main question per layer, with closely related fields grouped only where that makes answering easier. The following is a proposed content sequence; it covers the information in the funnel handoff.

| Step | Main prompt | Input and guidance |
| --- | --- | --- |
| 01 / Land | Where are you with the land? | Exploring / Looking / Have land / Already building. Approximate town or region in the same layer; label optional when still looking. No exact street address required. |
| 02 / Project | What are you hoping to build? | Four Walls / Courtyard / Longhouse / My own plans / Not sure. Optional short description or approximate size. Prefill known plan interest. |
| 03 / Timing | When are you hoping to build? | Within six months / Six to twelve months / Later / Still exploring. If already building, ask about the current stage instead. |
| 04 / Budget | What construction budget are you working toward? | Optional rough amount or range with currency and an explicit Not sure choice. State that this means the build budget, separate from Shelter's fee. Do not invent qualification thresholds. |
| 05 / Builder | Who will lead the build? | I will / A local builder / A mix of both / Still deciding. |
| 06 / Support | Where could you use a hand? | Preparing to build / Support through construction / Finding a direction / Not sure. Preserve the originating Supported/Guided preference as an editable selection. |
| 07 / Context | What would be useful for us to understand? | Optional short free-text answer. Optional document/photo links under “Add a link.” No required essay or file upload. |
| 08 / Contact | Where should we reply? | Name and email with real labels and autocomplete. Prefill when reliably known and allow correction. |
| Review | Your project, so far. | Readable answer summary, Edit links, and Send project brief. |

The precise sequence is adjustable after a usability pass. Do not pad the form with questions that will not change preparation or routing. Keep optional questions visibly optional and provide Skip where appropriate.

Show “Question 3 of 8” with a subtle progress rule. Review is a separate final step. If future branching changes the count, compute it accurately rather than showing a misleading percentage.

## Visual treatment

### Color

Assign colors by chapter, not by answer quality or qualification:

| Chapter | Surface | Text direction |
| --- | --- | --- |
| Land and project | `#e0d9cb` and `#c9bda1` | Dark ink `#242219` |
| Timing and budget | `#ad8f68` | Dark ink |
| Builder and support | `#8a5a3c` | Warm light text `#f0e9df` |
| Context and contact | `#241e17` | Warm light text |
| Review and confirmation | Return to pale earth | Dark ink |

Verify contrast for real text, borders, selection states, errors, and focus indicators during implementation. Palette inheritance alone does not establish accessibility.

### Typography and controls

- Public Sans for the question, approximately 48–80px on desktop and 32–44px on mobile, adjusted to actual copy length.
- Source Code Pro for step numbers and short utility labels. Keep labels legible, approximately 12–14px.
- Answer text and inputs at least 16px with comfortable line height.
- Broad rectangular options separated by fine rules or simple outlines.
- Selected options use both a visible marker and a clear surface/border change.
- Text fields use a quiet, opaque or lightly tinted surface with a visible boundary and persistent label.
- One primary action per step; Back is visually quieter but clearly available.
- Keep decorative imagery out of question panels. Let surface, type, and spacing provide the character.

### Motion

Prototype a short upward panel transition, approximately 300–450ms with gentle ease-out. Keep lateral movement and scaling out of the primary sequence. Previous panels settle into their strips without bounce or a 3D effect.

Animate the panel as a unit. Avoid staggering every label and answer choice. Prevent duplicate navigation while transitioning, without adding a noticeable wait after the motion completes.

With reduced motion enabled, change panels immediately and retain the same focus and progress behavior. Motion must never be required to understand which question is active.

## Review, submission, and confirmation

Review shows the complete brief, offering preference, and contact details with Edit links. Optional omissions read naturally and do not appear as errors. The final CTA is **Send project brief**.

Submission states:

- Sending: explicit status and duplicate-submit prevention.
- Error: plain-language explanation, preserved answers, and Retry.
- Success: only after the server confirms receipt.

Confirmation copy direction:

> Thank you, [first name].
> Your project brief is with us.
>
> We’ll read through it and reply at [email] with the next step.

Add the response window once agreed. Provide a return-to-Shelter action. Do not immediately present a calendar unless review and scheduling policy supports that behavior.

## Keep plan delivery short

The free-plan entry remains: email → delivery confirmation → optional project-stage question. Use the same typography, controls, and earthy surfaces, but do not require the eight-question application to access plans.

After delivery, offer **Want a hand with your project?** as an optional route into this brief. Carry forward known plan interest and stage. Marketing opt-in remains separate from receiving requested plans or submitting an inquiry.

## Accessibility and state requirements

- Use semantic form controls, fieldsets, labels, and buttons.
- Support keyboard selection and visible focus; aim for at least 44px interactive targets.
- Announce progress and submission status without repeatedly reading the entire stack.
- Inactive panels must not leave hidden focusable controls in the keyboard or accessibility tree.
- Associate errors with fields and focus the first invalid field on attempted progression.
- Enter may continue from suitable single-line inputs; Enter in a textarea inserts a new line.
- Preserve answers while moving backward, editing, or recovering from failed submission.
- For the initial design, keep drafts in the active page session. Do not promise cross-device saving or silently persist personal project data in browser storage. Decide refresh recovery separately before implementation.
- Completed-step navigation and View answers must be usable without the stacking animation.

## First prototype and review

Build a local visual prototype before connecting delivery or inquiry services. Include an introductory state, a choice question, a text question, visible completed layers, contact, review, and confirmation/error examples. Use fictional data.

Review at desktop, narrow mobile, and short viewport sizes. Test long answers, long question copy, keyboard-open behavior, backward editing, optional skips, and reduced motion. Check that the active question remains the clear focus and that the stack leaves enough room to answer comfortably.

Acceptance criteria:

- The flow feels visually continuous with `/packages/`.
- Each question arrives as a distinct layer and previous answers are easy to revisit.
- The active panel contains one clear task and one primary action.
- The form remains usable without animation and with keyboard navigation.
- Contact appears near the end; final submission is explicit.
- The complete brief gathers the information needed for human review without requiring a long essay.
- Free-plan delivery remains independently accessible through its short email flow.

## Open decisions

- Confirm the proposed eight-question sequence after reviewing the prototype.
- Set the real response window and fit-call invitation policy.
- Resolve offering scope and pricing terms using the companion handoff.
- Decide whether refresh recovery is needed for the first release.
- Validate completion time before publishing a time estimate.

The user-specified direction is the clean reference experience combined with Shelter's stacked layers. Layout dimensions, motion timing, route, question copy, and stack navigation above are implementation recommendations to validate in the prototype.
