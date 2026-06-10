"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWorkerReviewUrl, workerReviewPath } from "@/lib/worker-urls"

type WorkerReviewActionsProps = {
  reviewToken: string
}

export function WorkerReviewActions({ reviewToken }: WorkerReviewActionsProps) {
  const [copied, setCopied] = useState(false)
  const reviewUrl = buildWorkerReviewUrl(reviewToken)
  const reviewPagePath = workerReviewPath(reviewToken)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const buttonClass =
    "gap-1.5 rounded-full border-teal/35 px-3 font-semibold text-teal hover:border-ocean hover:bg-ocean hover:text-white sm:gap-2 sm:px-4"

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={buttonClass}
        onClick={() => void copyLink()}
        aria-label="Copy review link"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" aria-hidden />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" aria-hidden />
            Share
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" className={buttonClass} asChild>
        <Link href={reviewPagePath}>
          <Star className="h-4 w-4" aria-hidden />
          Review
        </Link>
      </Button>
    </div>
  )
}
