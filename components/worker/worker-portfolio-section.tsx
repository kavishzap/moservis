import { PortfolioGallery } from "@/components/worker/portfolio-gallery"
import type { WorkerPortfolio } from "@/services/workerService"

type WorkerPortfolioSectionProps = {
  portfolio: WorkerPortfolio
}

export function WorkerPortfolioSection({ portfolio }: WorkerPortfolioSectionProps) {
  if (portfolio.count === 0 || portfolio.images.length === 0) {
    return null
  }

  return (
    <section className="rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_2px_10px_rgb(11_60_93_/_0.04)] sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-foreground">Portfolio</h2>
        <p className="text-xs text-muted-foreground">
          {portfolio.count} {portfolio.count === 1 ? "photo" : "photos"}
        </p>
      </div>
      <PortfolioGallery images={portfolio.images} />
    </section>
  )
}
