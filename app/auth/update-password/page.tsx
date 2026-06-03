"use client"

import { Suspense, useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { AuthPageShell } from "@/components/auth/auth-page-shell"
import { RequiredStar } from "@/components/auth/required-star"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { getSession, updatePassword } from "@/services/authService"
import { toast } from "@/lib/toast"

function UpdatePasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reason = searchParams.get("reason")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [hasSession, setHasSession] = useState(false)

  const title =
    reason === "recovery"
      ? "Reset password"
      : reason === "invite"
        ? "Set up your password"
        : "Update password"

  const description =
    reason === "invite"
      ? "Create a password to finish activating your worker account."
      : reason === "recovery"
        ? "Choose a new password for your account."
        : "Enter a new password for your account."

  useEffect(() => {
    let cancelled = false

    async function checkSession() {
      try {
        const session = await getSession()
        if (!cancelled) {
          setHasSession(!!session)
        }
      } catch {
        if (!cancelled) setHasSession(false)
      } finally {
        if (!cancelled) setCheckingSession(false)
      }
    }

    checkSession()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)
    try {
      await updatePassword(password)
      toast.success("Password saved.")
      router.replace(AUTH_PATHS.dashboardProfile)
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not update password."
      setFormError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (checkingSession) {
    return (
      <AuthPageShell title={title} description="Verifying your session…">
        <p className="text-center text-sm text-muted-foreground">Please wait…</p>
      </AuthPageShell>
    )
  }

  if (!hasSession) {
    return (
      <AuthPageShell
        title={title}
        description="Your link may have expired or already been used."
      >
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            Open the link from your invite or password reset email again, or request a new
            reset link.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1">
              <Link href={AUTH_PATHS.forgotPassword}>Forgot password</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={AUTH_PATHS.login}>Log in</Link>
            </Button>
          </div>
        </div>
      </AuthPageShell>
    )
  }

  return (
    <AuthPageShell title={title} description={description}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            New password <RequiredStar />
          </Label>
          <PasswordInput
            id="password"
            name="password"
            className="h-11"
            autoComplete="new-password"
            minLength={6}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password <RequiredStar />
          </Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            className="h-11"
            autoComplete="new-password"
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {isSubmitting ? "Saving…" : "Save password"}
        </Button>
      </form>
    </AuthPageShell>
  )
}

export default function UpdatePasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthPageShell title="Update password" description="Loading…">
          <p className="text-center text-sm text-muted-foreground">Please wait…</p>
        </AuthPageShell>
      }
    >
      <UpdatePasswordForm />
    </Suspense>
  )
}
