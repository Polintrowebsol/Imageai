# Stamp 5 release review

- Contact: the repository only identifies `imagenmerce@gmail.com`. Replace it across the site and forms only after a domain mailbox has been configured and can receive messages.
- Company identity: the footer and legal pages identify Imagenmerce as India-based. No US address, client relationship, testimonial or NDA availability is claimed.
- Legal pages: Privacy describes the current audit form, private storage, project form and email workflow. Terms defer prices, payment, revisions, delivery, ownership/licensing, cancellation and refunds to the written project quotation. The business should confirm the actual operating and legal terms before publishing these pages.
- Audit form: the Stamp 3 Supabase migration must be applied and server-only service role credentials configured before accepting live requests. There is no automatic notification email. Review the private `free_audit_requests` table for leads.
- Security: optional images are limited to JPEG, PNG or WebP and 5 MB, checked in the browser and on the server; the storage bucket is private. Service-role credentials are imported only in server code. Confirm HTTPS and response headers on the final deployment.
- QA: dependency installation remained unavailable in this workspace, so a production build, live form submission, mobile browser review and social preview crawl are still required before publication.
