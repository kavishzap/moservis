import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type AuthPageShellProps = {
  title: string
  description?: string
  children: ReactNode
}

export function AuthPageShell({ title, description, children }: AuthPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
              {description ? (
                <p className="text-muted-foreground">{description}</p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md ring-1 ring-ocean/5 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
