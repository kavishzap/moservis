import type { Metadata } from "next"
import { WorkerProfileDashboardClient } from "./worker-profile-dashboard-client"

export const metadata: Metadata = {
  title: "My Worker Profile | ZotServis",
  description: "View and update your ZotServis worker profile.",
}

export default function DashboardProfilePage() {
  return <WorkerProfileDashboardClient />
}
