import type { ReactNode } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

type LegalDocLayoutProps = {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalDocLayout({ title, lastUpdated, children }: LegalDocLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/30 py-10 md:py-14">
        <article className="container mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="text-primary underline-offset-4 hover:underline">
              Home
            </Link>
            <span className="mx-2 text-border" aria-hidden>
              /
            </span>
            <span className="text-foreground">{title}</span>
          </nav>
          <h1 className="mb-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mb-10 border-b border-border pb-10 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <div
            className={[
              "legal-doc space-y-6 text-sm leading-relaxed text-muted-foreground",
              "[&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:first:mt-0",
              "[&_h3]:mt-8 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-foreground",
              "[&_p]:text-pretty",
              "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-pretty",
              "[&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5",
              "[&_li]:marker:text-muted-foreground/80",
              "[&_strong]:font-semibold [&_strong]:text-foreground",
              "[&_a]:text-primary [&_a]:underline-offset-4 [&_a]:hover:underline",
            ].join(" ")}
          >
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
