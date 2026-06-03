"use client"

import { useState, type FormEvent } from "react"
import { Loader2, Star } from "lucide-react"
import { toast } from "@/lib/toast"
import { RequiredStar } from "@/components/auth/required-star"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveWorkerReview } from "@/services/workerService"
import { cn } from "@/lib/utils"

type WorkerReviewFormProps = {
  workerName: string
  reviewToken: string
  onSuccess?: () => void
  className?: string
}

function RatingPicker({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (rating: number) => void
  disabled?: boolean
}) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {Array.from({ length: 5 }).map((_, index) => {
        const star = index + 1
        const active = star <= (hover || value)
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star === 1 ? "" : "s"}`}
            className="rounded p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
          >
            <Star
              className={cn(
                "h-7 w-7",
                active ? "fill-gold text-gold" : "text-muted-foreground/35"
              )}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}

export function WorkerReviewForm({
  workerName,
  reviewToken,
  onSuccess,
  className,
}: WorkerReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [employeeName, setEmployeeName] = useState("")
  const [dateOfService, setDateOfService] = useState("")
  const [comments, setComments] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (rating < 1) {
      toast.error("Please select a star rating.")
      return
    }

    const trimmedComments = comments.trim()
    if (!trimmedComments) {
      toast.error("Please enter a comment about your experience.")
      return
    }

    setSubmitting(true)
    try {
      const result = await saveWorkerReview({
        review_token: reviewToken,
        rating,
        employee_name: employeeName.trim() || null,
        date_of_service: dateOfService || null,
        comments: trimmedComments,
      })
      toast.success(result.message || "Review submitted successfully.")
      setRating(0)
      setEmployeeName("")
      setDateOfService("")
      setComments("")
      onSuccess?.()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not submit review.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="review-worker-name">Worker</Label>
        <Input
          id="review-worker-name"
          value={workerName}
          disabled
          readOnly
          className="bg-muted/50"
        />
      </div>

      <div className="space-y-2">
        <Label>
          Rating <RequiredStar />
        </Label>
        <RatingPicker value={rating} onChange={setRating} disabled={submitting} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-your-name">Your name (optional)</Label>
        <Input
          id="review-your-name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="How you'd like to appear"
          maxLength={150}
          disabled={submitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-date">Date of service (optional)</Label>
        <Input
          id="review-date"
          type="date"
          value={dateOfService}
          onChange={(e) => setDateOfService(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="review-comments">
          Comments <RequiredStar />
        </Label>
        <Textarea
          id="review-comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Share details about your experience…"
          rows={4}
          maxLength={1000}
          required
          disabled={submitting}
        />
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          "Submit review"
        )}
      </Button>
    </form>
  )
}
