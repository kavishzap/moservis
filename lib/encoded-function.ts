import { supabase } from "@/lib/supabase"

type EncodedEnvelope = {
  payload: string
}

type EncodedErrorBody = {
  error?: string
}

export async function encodedInvoke<TPayload, TResult>(
  functionName: string,
  payload: TPayload,
): Promise<TResult> {
  const encodedBody = encodePayload(payload)

  const { data, error } = await supabase.functions.invoke(functionName, {
    body: encodedBody,
  })

  if (error) {
    throw new Error(error.message)
  }

  const decoded = decodePayload<TResult & EncodedErrorBody>(data)

  if (decoded?.error) {
    throw new Error(decoded.error)
  }

  return decoded as TResult
}

export function encodePayload<T>(payload: T): EncodedEnvelope {
  return {
    payload: base64UrlEncode(JSON.stringify(payload)),
  }
}

export function decodePayload<T>(response: EncodedEnvelope): T {
  if (!response?.payload) {
    throw new Error("Invalid encoded response")
  }

  const decoded = base64UrlDecode(response.payload)

  return JSON.parse(decoded) as T
}

function base64UrlEncode(value: string) {
  const bytes = new TextEncoder().encode(value)

  let binary = ""

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function base64UrlDecode(value: string) {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4)

  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"))

  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}
