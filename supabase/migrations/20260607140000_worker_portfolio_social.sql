-- Portfolio: up to 5 base64 data URI images (no compression, stored as JSON array).
ALTER TABLE public.worker_profiles
ADD COLUMN IF NOT EXISTS portfolio_images jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.worker_profiles
ADD COLUMN IF NOT EXISTS facebook_url text,
ADD COLUMN IF NOT EXISTS instagram_url text,
ADD COLUMN IF NOT EXISTS tiktok_url text;

COMMENT ON COLUMN public.worker_profiles.portfolio_images IS
  'JSON array of base64 data URI portfolio images (max 5).';
