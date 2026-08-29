# Analytics and error reporting

## Recommended launch setup

Use two small, separate systems:

1. **Cloudflare Web Analytics** for aggregate traffic and real-user performance.
2. **Sentry error monitoring** for production JavaScript failures.

Do not add session replay, heatmaps, advertising pixels, cross-site tracking or a tag manager at launch.

## Cloudflare Web Analytics

### What it provides

- Page views and visitors
- Paths visited
- Referring sites
- Country
- Device type
- Browser and operating system
- Page-load timing
- Core Web Vitals
- Automatic measurement of SPA navigation

Cloudflare describes Web Analytics as privacy-first and states that it does not collect or use visitors’ personal data. Its browser beacon collects performance and navigation measurements and, for proxied sites, sends them to the site’s own `/cdn-cgi/rum` endpoint.

Cloudflare Web Analytics does not currently provide custom events or UTM query reporting. It can show visits to `/packages/`, but it will not answer detailed conversion questions such as how many people clicked a particular mail link or completed a future Stripe purchase.

### Current implementation

The site is registered in Cloudflare Web Analytics as `shelter.onthe.land`. Because the root DNS zone is managed outside Cloudflare, the site-specific beacon is embedded manually in `index.html`. Vite's static-route build copies that entry point into every generated public page.

After deployment, visit the production site and confirm that the Web Analytics dashboard begins reporting. Keep the beacon in the repository unless the Pages project is later switched to automatic injection; do not enable both methods at once.

### Suggested launch configuration

- Manual Cloudflare beacon: on
- Automatic Cloudflare injection: off
- SPA measurement: on
- Advertising or marketing integrations: none
- Google Analytics: none
- Tag manager: none
- Custom event tracking: none

The manual beacon is site-wide and does not currently apply a geographic exclusion. Revisit that scope after a jurisdiction-specific privacy assessment or if Cloudflare adds a suitable account-level control.

## EU and UK privacy posture

This document is an implementation recommendation, not legal advice. Privacy and electronic-communications rules vary by country and can change.

### Cookie banner

Cloudflare Web Analytics is not a conventional cookie-based advertising product. Cloudflare says the product does not collect or use visitors’ personal data and does not track individuals across customer sites. The current browser beacon is enabled worldwide.

Because legal treatment can vary by jurisdiction, the cookie-free product description alone is not a guarantee that no consent or disclosure obligation applies. Obtain jurisdiction-specific advice before broad EU or UK promotion. A banner becomes relevant if required for the current beacon or if the site later adds non-essential storage or tracking such as advertising pixels, cross-site identifiers or session replay.

The ePrivacy rules concern cookies and similar access to information on a visitor’s device, not just technologies named “cookies.” The safest rule is therefore functional: do not place or access non-essential information on a visitor’s device before consent unless a reviewed exemption applies.

### Privacy notice

Even without a banner, publish a short privacy notice before broad promotion. It should identify:

- The site operator and contact email
- Cloudflare as hosting, security and analytics provider
- The categories of aggregate traffic and performance information used
- The purpose: operating, securing and improving the site
- That the current analytics beacon is enabled worldwide
- Retention information or a link to the provider’s current retention terms
- International processing or transfer information where applicable
- How someone can ask a privacy question or exercise applicable rights
- Any future providers such as Stripe, scheduling software or Sentry

Also review and accept Cloudflare’s current data-processing terms for the account. Cloudflare may set strictly necessary security cookies when particular security products are enabled; Cloudflare recommends disclosing those cookies even when they are considered necessary.

### Before changing the configuration

Reassess consent and notice requirements before adding:

- Changes to the geographic scope of Web Analytics
- Sentry session replay
- Detailed user or form context in error reports
- Stripe checkout
- Scheduling software
- Newsletter signup
- Uploaded plans or images
- Custom conversion tracking
- Advertising or retargeting

## Sentry error monitoring

### Purpose

Sentry would report failures that aggregate analytics cannot explain, including:

- React rendering crashes
- Failed lazy-loaded page chunks
- Unhandled JavaScript errors
- Unhandled promise rejections
- 3D model and WebGL failures
- Browser-specific problems

### Minimal configuration

- Install the Sentry React/browser SDK.
- Initialize it only in production.
- Add a top-level React error boundary.
- Tag reports with the current route and deployed release.
- Upload production source maps during the Cloudflare build.
- Store the Sentry DSN and build token in Cloudflare environment variables.
- Alert only on new or meaningfully recurring production errors.
- Disable session replay.
- Disable user-identifying context.
- Disable performance tracing initially; Cloudflare already supplies real-user performance data.
- Scrub query strings, email addresses, project names and other user-entered values before sending events.

### Source maps

Production JavaScript is minified. Private source-map upload lets Sentry translate a production stack trace back to the original component and source line.

Source maps should be uploaded during the production build and then removed from the public deployment output. The Sentry authentication token is a build secret and must never be committed.

### Privacy boundary

Sentry should not be enabled until its account, data region, retention, data-processing terms and event-scrubbing rules have been reviewed. If enabled, the privacy notice should name the provider and describe the limited error data sent.

Do not send:

- Email contents
- Mailto query values
- Uploaded plans
- Render prompts or images
- Full URLs containing sensitive query parameters
- User names or email addresses
- Session recordings

## Recommended sequence

1. Deploy the installed Cloudflare Web Analytics beacon and confirm reporting.
2. Publish a short privacy notice before broad promotion.
3. Observe traffic and performance without adding custom tracking.
4. Add minimal Sentry error capture once the account and privacy settings are ready.
5. Reassess analytics and legal requirements when Stripe, scheduling or user uploads are introduced.

## References

- Cloudflare Web Analytics: https://developers.cloudflare.com/web-analytics/about/
- Cloudflare Pages setup: https://developers.cloudflare.com/web-analytics/get-started/
- Data collection: https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/
- Cloudflare cookies: https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/
- EU ePrivacy Directive: https://eur-lex.europa.eu/eli/dir/2002/58/oj
