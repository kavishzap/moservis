"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  getCookieConsent,
  setCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent"

export function CookieConsentModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(getCookieConsent() === null)
  }, [])

  const saveChoice = (choice: CookieConsentChoice) => {
    setCookieConsent(choice)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-2xl border-teal/20 p-0 sm:max-w-lg"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="border-b border-teal/10 bg-teal/5 px-6 py-5">
          <DialogHeader className="gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <Cookie className="h-5 w-5" aria-hidden />
            </div>
            <DialogTitle className="text-xl text-ocean">We use cookies</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
              ZotServis uses essential cookies to keep the site working and optional analytics
              cookies to understand how the platform is used. You can accept all cookies or only
              essential ones.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-3 px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-medium text-foreground">Essential cookies</strong> are required
            for sign-in, security, and basic preferences.
          </p>
          <p>
            <strong className="font-medium text-foreground">Analytics cookies</strong> help us
            improve ZotServis by measuring visits and page performance.
          </p>
          <p>
            Read our{" "}
            <Link href="/privacy" className="font-medium text-teal hover:underline">
              Privacy Policy
            </Link>{" "}
            for more details.
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 border-t border-border bg-muted/20 px-6 py-4 sm:flex-col sm:justify-stretch">
          <Button type="button" className="w-full" onClick={() => saveChoice("all")}>
            Accept all cookies
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => saveChoice("essential")}
          >
            Essential cookies only
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
