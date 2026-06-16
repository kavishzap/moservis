import type { Metadata } from "next"
import { WorkerProfileClient } from "./worker-profile-client"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Worker Profile | ZotServis`,
    description: `View service provider profile ${id} on ZotServis.`,
  }
}

export default async function WorkerProfilePage({ params }: PageProps) {
  const { id } = await params
  return <WorkerProfileClient workerId={id} />
}
