export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function isUniqueViolation(error: { code?: string; message?: string }): boolean {
  if (error.code === "23505") return true
  const m = error.message?.toLowerCase() ?? ""
  return m.includes("duplicate") || m.includes("unique constraint")
}
