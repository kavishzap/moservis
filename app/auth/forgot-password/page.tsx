"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { AuthPageShell } from "@/components/auth/auth-page-shell"
import { RequiredStar } from "@/components/auth/required-star"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { requestPasswordReset } from "@/services/authService"
import { toast } from "@/lib/toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    if (!email.trim()) {
      setFormError("Email is required.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    try {
      await requestPasswordReset(email)
      setSent(true)
      toast.success("Check your email for the reset link.")
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not send reset email."
      setFormError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageShell
      title="Forgot password"
      description="We will email you a link to reset your password."
    >
      {sent ? (
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            If an account exists for <strong className="text-foreground">{email}</strong>,
            you will receive a password reset link shortly.
          </p>
          <p>
            Open the link in the email, then set your new password on the next screen.
          </p>
          <Button asChild className="w-full" variant="outline">
            <Link href={AUTH_PATHS.login}>Back to log in</Link>
          </Button>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email <RequiredStar />
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="h-11"
              autoComplete="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {formError ? (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="h-12 w-full text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send reset link"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href={AUTH_PATHS.login}
              className="font-medium text-teal underline-offset-2 hover:underline"
            >
              Back to log in
            </Link>
          </p>
        </form>
      )}
    </AuthPageShell>
  )
}
