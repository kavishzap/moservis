-- Return portfolio images small enough for Edge Function API responses.
-- Oversized base64 entries stay in DB but are excluded from public API payloads.
CREATE OR REPLACE FUNCTION public.safe_portfolio_images(
  p_worker_id uuid,
  p_max_elem_length int DEFAULT 200000
)
RETURNS jsonb
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(
    (
      SELECT jsonb_agg(to_jsonb(value))
      FROM public.worker_profiles wp,
      LATERAL jsonb_array_elements_text(COALESCE(wp.portfolio_images, '[]'::jsonb)) AS t(value)
      WHERE wp.id = p_worker_id
        AND length(value) <= p_max_elem_length
    ),
    '[]'::jsonb
  );
$$;

-- Return profile image only when small enough for Edge Function API responses.
CREATE OR REPLACE FUNCTION public.safe_profile_image(
  p_worker_id uuid,
  p_max_length int DEFAULT 200000
)
RETURNS text
LANGUAGE sql
STABLE
AS $$
  SELECT CASE
    WHEN length(coalesce(profile_image, '')) <= p_max_length THEN profile_image
    ELSE NULL
  END
  FROM public.worker_profiles
  WHERE id = p_worker_id;
$$;

COMMENT ON FUNCTION public.safe_portfolio_images(uuid, int) IS
  'Filters worker portfolio_images to elements under max length for API responses.';

COMMENT ON FUNCTION public.safe_profile_image(uuid, int) IS
  'Returns profile_image only when under max length for API responses.';

-- Shrink legacy oversized base64 blobs that can crash Edge Functions.
UPDATE public.worker_profiles
SET profile_image = NULL
WHERE length(coalesce(profile_image, '')) > 200000;

UPDATE public.worker_profiles wp
SET portfolio_images = COALESCE(
  (
    SELECT jsonb_agg(to_jsonb(value))
    FROM jsonb_array_elements_text(COALESCE(wp.portfolio_images, '[]'::jsonb)) AS t(value)
    WHERE length(value) <= 500000
  ),
  '[]'::jsonb
)
WHERE portfolio_images IS NOT NULL
  AND jsonb_array_length(COALESCE(portfolio_images, '[]'::jsonb)) > 0;
