"use client"

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="top-right"
      offset={16}
      closeButton
      visibleToasts={4}
      expand
      gap={12}
      className="toaster group z-[200]"
      icons={{
        success: <CheckCircle2 className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />,
        error: <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />,
        info: <Info className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />,
        warning: <AlertTriangle className="h-5 w-5 shrink-0" strokeWidth={2.25} aria-hidden />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "zot-toast",
          title: "zot-toast-title",
          description: "zot-toast-description",
          content: "zot-toast-content",
          icon: "zot-toast-icon",
          closeButton: "zot-toast-close",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
