# Stamp 3 deployment notes

The audit form stores submissions in `public.free_audit_requests` and optional images in the private `free-audit-references` Supabase Storage bucket. Apply `supabase/migrations/20260927000000_free_audits.sql` to the connected Supabase project before deploying this code. The existing server environment must include `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Never expose the service role key in client environment variables.

The form shows success only after the database insert succeeds. Uploaded files have no public access policy. Review incoming records in Supabase; the `reference_path` points to an optional file in the private bucket. No automatic notification email was added, since no email provider or notification route was supplied.

The site emits a PII-free `imagenmerce:analytics` browser event with `{ event, source }` for CTA clicks, form open/submit, project CTA clicks and portfolio category interactions. An existing analytics listener can subscribe to it. No third-party tracker was added.

A local production build and responsive browser QA remain required before release when dependencies are available.
