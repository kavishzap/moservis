-- Store compressed profile photo as a base64 data URI (e.g. data:image/jpeg;base64,...).
ALTER TABLE public.worker_profiles
ADD COLUMN IF NOT EXISTS profile_image text;

COMMENT ON COLUMN public.worker_profiles.profile_image IS
  'Compressed profile photo as a base64 data URI for small UI avatars.';
