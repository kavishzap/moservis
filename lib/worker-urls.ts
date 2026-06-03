import { getSiteUrl } from "@/lib/auth-urls"

export function workerProfilePath(workerId: string): string {
  return `/worker/${workerId}`
}

/** Public anonymous review link — uses review_token only, never worker_id. */
export function workerReviewPath(reviewToken: string): string {
  return `/review-worker/${encodeURIComponent(reviewToken)}`
}

export function buildWorkerReviewUrl(reviewToken: string): string {
  return `${getSiteUrl()}${workerReviewPath(reviewToken)}`
}

export function buildWorkerProfileUrl(workerId: string): string {
  return `${getSiteUrl()}${workerProfilePath(workerId)}`
}
