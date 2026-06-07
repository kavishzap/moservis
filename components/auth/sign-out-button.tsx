"use client"

import { useState, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, type ButtonProps } from "@/components/ui/button"

type SignOutButtonProps = Omit<ButtonProps, "onClick"> & {
  onSignOut: () => void | Promise<void>
  children: ReactNode
}

export function SignOutButton({
  onSignOut,
  children,
  ...buttonProps
}: SignOutButtonProps) {
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const confirmSignOut = async () => {
    setSigningOut(true)
    try {
      await onSignOut()
      setOpen(false)
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" {...buttonProps}>
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your worker dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={signingOut}>Cancel</AlertDialogCancel>
          <Button
            type="button"
            variant="destructive"
            disabled={signingOut}
            onClick={() => void confirmSignOut()}
          >
            {signingOut ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing out…
              </>
            ) : (
              "Sign out"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
