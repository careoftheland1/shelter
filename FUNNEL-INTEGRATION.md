# Funnel delivery integration

The pages now run at `/free-plans/`, `/project/`, `/supported/`, and `/guided/`. The local repository has a public sample sheet and specifications, but no complete plan sets or form delivery service. In the default build, both forms open a prepared email to `build@onthe.land`; the interface explicitly says the visitor still needs to send it. No receipt or plan-delivery claim is shown in that mode.

The frontend supports two optional build-time variables:

- `VITE_PLAN_REQUEST_ENDPOINT`: accepts `POST` JSON `{ plan, email, marketingOptIn, source }`. A successful response means the request was recorded and the server has arranged delivery or a clear availability follow-up. It should send the selected set or return link only after the actual files and versions are verified. The optional stage buttons then send `PATCH` JSON `{ plan, email, stage }` to the same endpoint. A failed stage update must not affect the original request.
- `VITE_PROJECT_BRIEF_ENDPOINT`: accepts `POST` JSON with the project fields, selected offering, and source. A successful response means the brief was recorded for human review. Only then does the page show its receipt confirmation.

These variables are public URLs, never secret credentials. The server must validate input, prevent abuse and duplicate sends, record consent with a timestamp, keep marketing enrollment separate from requested plan delivery, support resend/recovery, and send the internal project brief. Keep keys, contact records and private plan access on the server. Before enabling either endpoint, verify plan availability, update the privacy notice for the actual provider and data flow, and agree the response window and offering terms described in the handoff documents.
