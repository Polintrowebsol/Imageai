# GitHub → Vercel deployment

This project is arranged under `imagenmerce-main/`. If that directory remains nested in the GitHub repository, set Vercel's Root Directory to `imagenmerce-main`; if its contents are the repository root, keep Vercel's Root Directory at `.`.

## Environment

The supplied environment values were copied into a local `.env` for development. `.env` is ignored by Git and deliberately excluded from the deliverable ZIP. Do not commit it to GitHub.

Set the same values in Vercel Project Settings → Environment Variables for the environments you deploy:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_PROJECT_ID` and `VITE_SUPABASE_PROJECT_ID` if used by the connected project
- `SUPABASE_SERVICE_ROLE_KEY` **server-side only** for the free audit submission endpoint. This key was absent from the supplied environment file. Obtain it privately from the connected Supabase project; never give it a `VITE_` prefix or expose it in client code.

## Database and release checks

Apply `supabase/migrations/20260927000000_free_audits.sql` to the connected Supabase project with its migration workflow before accepting free audit submissions. Merely committing the file does not create the table or private upload bucket.

There is no online checkout or website payment collection. Trial enquiries use a prefilled email, while paid project terms are agreed separately in writing.

After deployment, confirm build success, all eight routes (`/`, `/services`, `/portfolio`, `/pricing`, `/about`, `/contact`, `/privacy`, `/terms`), responsive layouts, Jotform studio enquiry, audit form success/error/upload flows, phone and email links, and the deployed social preview. The `$XX` and `$XXX` prices remain placeholders until the business provides final numbers.
