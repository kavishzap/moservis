-- Allow portfolio RPC to return images up to the store limit by default.
CREATE OR REPLACE FUNCTION public.safe_portfolio_images(
  p_worker_id uuid,
  p_max_elem_length int DEFAULT 500000
)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
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

GRANT EXECUTE ON FUNCTION public.safe_portfolio_images(uuid, int) TO service_role;
