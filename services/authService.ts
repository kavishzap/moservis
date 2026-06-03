import { getAuthCallbackUrl } from "@/lib/auth-urls"
import { supabase } from "@/lib/supabase"

export type LoginPayload = {
  email: string
  password: string
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    {
      redirectTo: getAuthCallbackUrl(),
    }
  )

  if (error) {
    throw new Error(error.message)
  }
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({ password })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  return data.session
}

/** @alias signInWithEmail */
export async function loginWorker(payload: LoginPayload) {
  return signInWithEmail(payload.email, payload.password)
}

/** @alias signOut */
export async function logoutWorker() {
  return signOut()
}

/** @alias getSession */
export async function getCurrentSession() {
  return getSession()
}
