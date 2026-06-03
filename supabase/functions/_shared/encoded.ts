export async function readEncodedPayload<T>(req: Request): Promise<T> {
  const body = await req.json().catch(() => null)

  if (!body?.payload) {
    throw new Error("Invalid encoded payload")
  }

  const decoded = base64UrlDecode(body.payload)

  return JSON.parse(decoded) as T
}

export function encodedJsonResponse(
  body: unknown,
  status = 200,
  extraHeaders: Record<string, string> = {},
) {
  return new Response(
    JSON.stringify({
      payload: base64UrlEncode(JSON.stringify(body)),
    }),
    {
      status,
      headers: {
        ...extraHeaders,
        "Content-Type": "application/json",
      },
    },
  )
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
