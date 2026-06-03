"use client"

import { useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { AuthPageShell } from "@/components/auth/auth-page-shell"
import { RequiredStar } from "@/components/auth/required-star"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { getSession, signInWithEmail } from "@/services/authService"
import { getMyWorkerProfile } from "@/services/workerProfileService"
import { toast } from "@/lib/toast"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath =
    searchParams.get("next")?.startsWith("/") && !searchParams.get("next")?.startsWith("//")
      ? searchParams.get("next")!
      : AUTH_PATHS.dashboardProfile
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function checkExistingSession() {
      try {
        const session = await getSession()
        if (!cancelled && session) {
          router.replace(AUTH_PATHS.dashboardProfile)
        }
      } catch {
        // not signed in
      } finally {
        if (!cancelled) setCheckingSession(false)
      }
    }

    checkExistingSession()
    return () => {
      cancelled = true
    }
  }, [router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    if (!email.trim()) {
      setFormError("Email is required.")
      return
    }
    if (!password) {
      setFormError("Password is required.")
      return
    }

    setIsSubmitting(true)
    try {
      await signInWithEmail(email, password)
      await getMyWorkerProfile()
      toast.success("Signed in successfully.")
      router.replace(nextPath)
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not sign in. Please try again."
      setFormError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (checkingSession) {
    return (
      <AuthPageShell title="Log in" description="Checking your session…">
        <p className="text-center text-sm text-muted-foreground">Please wait…</p>
      </AuthPageShell>
    )
  }

  return (
    <AuthPageShell
      title="Log in"
      description="Access your ZotServis worker account."
    >
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

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password <RequiredStar />
            </Label>
            <Link
              href={AUTH_PATHS.forgotPassword}
              className="text-xs font-medium text-teal underline-offset-2 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            className="h-11"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {isSubmitting ? "Signing in…" : "Log in"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          New worker?{" "}
          <Link
            href={AUTH_PATHS.register}
            className="font-medium text-teal underline-offset-2 hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </AuthPageShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <AuthPageShell title="Log in" description="Loading…">
          <p className="text-center text-sm text-muted-foreground">Please wait…</p>
        </AuthPageShell>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
