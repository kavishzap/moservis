import type { Metadata } from "next"
import { ReviewWorkerPageClient } from "./review-worker-page-client"

type PageProps = {
  params: Promise<{ reviewToken: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Leave a Review | ZotServis",
    description: "Share your experience with a ZotServis worker.",
    robots: { index: false, follow: false },
  }
}

export default async function ReviewWorkerPage({ params }: PageProps) {
  const { reviewToken } = await params
  return <ReviewWorkerPageClient reviewToken={decodeURIComponent(reviewToken)} />
}
