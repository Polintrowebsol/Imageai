CREATE TABLE public.free_audit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_website TEXT,
  product_url TEXT,
  email TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('Amazon', 'Shopify', 'Other')),
  number_of_products TEXT NOT NULL CHECK (number_of_products IN ('1', '2–5', '6–20', '21–50', '50+')),
  improvements TEXT[] NOT NULL CHECK (cardinality(improvements) > 0),
  reference_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.free_audit_requests ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.free_audit_requests TO service_role;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('free-audit-references', 'free-audit-references', false, 5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;
-- No public storage policies: only the server-side service role can access uploads.
