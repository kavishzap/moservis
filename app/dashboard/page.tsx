import { redirect } from "next/navigation"
import { AUTH_PATHS } from "@/lib/auth-urls"

export default function DashboardIndexPage() {
  redirect(AUTH_PATHS.dashboardProfile)
}
