import { redirect } from "next/navigation"
import { workerReviewPath } from "@/lib/worker-urls"

type PageProps = {
  searchParams: Promise<{ token?: string }>
}

/** Legacy `/worker/review?token=…` → `/review-worker/:reviewToken` */
export default async function LegacyWorkerReviewRedirect({ searchParams }: PageProps) {
  const { token } = await searchParams
  if (token?.trim()) {
    redirect(workerReviewPath(token.trim()))
  }
  redirect("/worker")
}
