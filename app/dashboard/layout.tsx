import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { WorkerAuthGuard } from "@/components/dashboard/worker-auth-guard"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <BrandAmbientBlurs subtle />
        <WorkerAuthGuard>{children}</WorkerAuthGuard>
      </main>
      <Footer />
    </div>
  )
}
