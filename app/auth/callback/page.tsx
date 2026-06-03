"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AuthPageShell } from "@/components/auth/auth-page-shell"
import { Button } from "@/components/ui/button"
import { AUTH_PATHS } from "@/lib/auth-urls"
import {
  isPasswordSetupType,
  readAuthLinkType,
  readAuthNextPath,
} from "@/lib/auth-callback"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const finishedRef = useRef(false)
  const linkTypeRef = useRef<string | null>(null)

  useEffect(() => {
    linkTypeRef.current = readAuthLinkType()

    const timeout = window.setTimeout(() => {
      if (!finishedRef.current) {
        setError(
          "Sign-in timed out. Open the link from your email again or try logging in."
        )
      }
    }, 15000)

    const finish = (sessionPresent: boolean) => {
      if (finishedRef.current) return
      finishedRef.current = true
      window.clearTimeout(timeout)

      if (!sessionPresent) {
        setError("Could not verify your session. Try the email link again.")
        return
      }

      const type = linkTypeRef.current
      if (isPasswordSetupType(type)) {
        const reason = type === "invite" ? "invite" : "recovery"
        router.replace(`${AUTH_PATHS.updatePassword}?reason=${reason}`)
        return
      }

      router.replace(readAuthNextPath())
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "PASSWORD_RECOVERY") {
        finish(!!session)
      }
    })

    async function runPkceExchange() {
      const code = new URLSearchParams(window.location.search).get("code")
      if (!code) return

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        finishedRef.current = true
        window.clearTimeout(timeout)
        setError(exchangeError.message)
        return
      }

      const { data } = await supabase.auth.getSession()
      finish(!!data.session)
    }

    async function runHashSession() {
      const hash = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash
      if (!hash) return

      const params = new URLSearchParams(hash)
      const access_token = params.get("access_token")
      const refresh_token = params.get("refresh_token")
      if (!access_token || !refresh_token) return

      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (sessionError) {
        finishedRef.current = true
        window.clearTimeout(timeout)
        setError(sessionError.message)
        return
      }

      finish(true)
    }

    void (async () => {
      await runPkceExchange()
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        finish(true)
        return
      }
      await runHashSession()
    })()

    return () => {
      subscription.unsubscribe()
      window.clearTimeout(timeout)
    }
  }, [router])

  if (error) {
    return (
      <AuthPageShell title="Sign-in problem" description={error}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href={AUTH_PATHS.login}>Log in</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={AUTH_PATHS.forgotPassword}>Forgot password</Link>
          </Button>
        </div>
      </AuthPageShell>
    )
  }

  return (
    <AuthPageShell title="Completing sign-in" description="Please wait while we verify your link.">
      <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-teal" aria-hidden />
        Redirecting…
      </p>
    </AuthPageShell>
  )
}
