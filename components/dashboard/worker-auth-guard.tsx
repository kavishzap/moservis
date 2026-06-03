"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { getSession } from "@/services/authService"

type WorkerAuthGuardProps = {
  children: ReactNode
}

export function WorkerAuthGuard({ children }: WorkerAuthGuardProps) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const session = await getSession()
        if (cancelled) return
        if (!session) {
          router.replace(
            `${AUTH_PATHS.login}?next=${encodeURIComponent(AUTH_PATHS.dashboardProfile)}`
          )
          return
        }
        setReady(true)
      } catch {
        if (!cancelled) {
          router.replace(
            `${AUTH_PATHS.login}?next=${encodeURIComponent(AUTH_PATHS.dashboardProfile)}`
          )
        }
      }
    }

    void check()
    return () => {
      cancelled = true
    }
  }, [router])

  if (!ready) {
    return (
      <div className="flex flex-1 items-center justify-center gap-2 py-24 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-teal" aria-hidden />
        Loading your account…
      </div>
    )
  }

  return children
}
