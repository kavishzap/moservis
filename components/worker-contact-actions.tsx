"use client"

import { useEffect, useId, useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  buildTelHref,
  buildWhatsAppHref,
  defaultWhatsAppMessage,
  toInternationalDigits,
} from "@/lib/contact"

type WorkerContactActionsProps = {
  phone: string
  workerName: string
  title: string
  className?: string
  /** full-width stacked buttons (e.g. profile sidebar) */
  layout?: "inline" | "stacked"
}

export function WorkerContactActions({
  phone,
  workerName,
  title,
  className,
  layout = "inline",
}: WorkerContactActionsProps) {
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [message, setMessage] = useState("")
  const messageFieldId = useId()
  const telHref = buildTelHref(phone)
  const waDigits = toInternationalDigits(phone)
  const canContact = waDigits.length >= 8

  useEffect(() => {
    if (whatsappOpen) {
      setMessage(defaultWhatsAppMessage(workerName, title))
    }
  }, [whatsappOpen, workerName, title])

  const openWhatsApp = () => {
    if (!canContact) return
    const url = buildWhatsAppHref(phone, message)
    window.open(url, "_blank", "noopener,noreferrer")
    setWhatsappOpen(false)
  }

  const btnClass = layout === "stacked" ? "w-full" : ""

  return (
    <>
      <div
        className={
          layout === "stacked"
            ? `flex flex-col gap-2 ${className ?? ""}`
            : `flex flex-wrap gap-2 ${className ?? ""}`
        }
      >
        <Button
          size="sm"
          className={`gap-2 bg-primary text-primary-foreground hover:bg-primary/90 ${btnClass}`}
          disabled={!canContact}
          asChild={canContact}
        >
          {canContact ? (
            <a href={telHref}>
              <Phone className="h-4 w-4" />
              Call now
            </a>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call now
            </span>
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className={`gap-2 border-accent text-accent hover:bg-accent/10 ${btnClass}`}
          disabled={!canContact}
          onClick={() => setWhatsappOpen(true)}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Button>
      </div>

      <Dialog open={whatsappOpen} onOpenChange={setWhatsappOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Message {workerName}</DialogTitle>
            <DialogDescription>
              Edit your message, then open WhatsApp to send it to this worker.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor={messageFieldId}>Your message</Label>
            <Textarea
              id={messageFieldId}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="min-h-[140px] resize-y text-sm"
              placeholder="Type your message…"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setWhatsappOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#25D366] text-white hover:bg-[#20BD5A]"
              disabled={!canContact}
              onClick={openWhatsApp}
            >
              Open WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
