# Stamp 6 final production QA

## Result

Source-level audit and targeted fixes are complete. Browser and live submission QA are **not complete**, so this is **not a production sign-off**. This workspace cannot install the project's dependencies from the package registry, and the accumulated Stamp 1–6 source has not been deployed to a reachable preview with the Stamp 3 Supabase migration applied.

## Changes made in this pass

- Mobile navigation logo constrained to fit alongside the audit CTA and menu at narrow widths; audit dialog header gives its close button space.
- Accent green darkened for small text/button contrast; the hero's green label uses the same signal token.
- Removed 61 unused flat assets (about 48 MB), converted five referenced pet listing PNGs to high-quality WebP (about 12 MB down to 0.75 MB), and kept all 24 provided Stamp 2 images in WebP.
- Added per-route canonical, title, description and Open Graph metadata; removed homepage canonical/OG defaults from the shared root so privacy and terms do not inherit a wrong URL.
- Added an HTTPS-only HSTS response header, clarified workflow copy that overstated a specific production technique, and added concept labels to illustrative sections.
- Added HTTP(S) URL patterns to audit inputs; the server continues to validate URLs, file signatures, MIME types and 5 MB maximum size.

## Static checks passed

| Check | Evidence |
| --- | --- |
| Referenced images | 36 literal `/images/...` paths resolve to local files; all 24 Stamp 2 assets are referenced. |
| Alt attributes | Every `<img>` in application TSX has an `alt` attribute; decorative images use empty alt text. |
| Site anchors | All homepage `#` targets exist. |
| Page headings | Homepage, Privacy and Terms each define one main H1; root 404 and error states have separate H1 elements. |
| CTA destinations | Audit buttons dispatch the audit form event; Studio Project opens the existing Jotform dialog; View Our Work links to `#work`; Trial opens a prefilled trial email. |
| Lead validation | Browser fields and server schema cover required names, brand, email, platform, product count, improvement choice, an image or listing URL, HTTP(S) URLs and optional image restrictions. |
| Claims | No testimonial, customer logo, success statistic, US office or fabricated domain mailbox was added. Concept portfolio examples are labeled. |

## Required release checks after deployment

| Area | Required widths or cases | Status |
| --- | --- | --- |
| Desktop visual/layout | 1920, 1440, 1280, 1024 px; clipping, spacing, nav, footer | **Blocked: no runnable build/preview** |
| Mobile visual/layout | 390, 375, 360 px; sliders, portfolio, pricing, form scrolling | **Blocked: no runnable build/preview** |
| Build/type check | `npm install` and `npm run build` | **Blocked: package registry unavailable** |
| Live audit submission | Success, required field, email, URL, image upload, error and thank-you | **Blocked: migration and deployed server needed** |
| Studio form | Jotform iframe and submission | **Blocked: deployed preview and provider access needed** |
| Trial and email links | Mail client handling and inbox delivery | **Requires configured mail client/inbox** |
| Image rendering and Web Vitals | Network requests, layout shifts, contrast screenshot, load timings | **Blocked: no runnable build/preview** |
| Social preview | Open Graph crawler against deployed URL | **Blocked: new code not deployed** |

The prior `STAMP-3-SETUP.md` and `STAMP-5-REVIEW.md` contain the database and business-policy prerequisites. A successful ZIP validation does not substitute for the checks above.

## Subsequent multi-page and contact update

The site now also has dedicated `/portfolio`, `/about` and `/contact` routes, shared navigation, a four-category homepage portfolio preview, the supplied New Delhi address and `+91 70118 36415`, and clear terms stating that website payments are not collected. A local uploaded `.env` is ignored and excluded from the handoff ZIP. These newer routes and contact links passed static path/heading checks; the live QA matrix above remains blocked until deployment.

Services and Pricing were subsequently promoted to dedicated routes; homepage keeps concise portfolio and pricing previews. Re-run the post-deployment checks against all eight routes.
