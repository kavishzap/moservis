import Link from "next/link"
import { MapPin, BadgeCheck, Clock, Mail, UserCircle, Star } from "lucide-react"
import { WorkerAvatar } from "@/components/worker/worker-avatar"
import { Badge } from "@/components/ui/badge"
import { WorkerContactActions } from "@/components/worker-contact-actions"
import { workerProfilePath } from "@/lib/worker-urls"
import type { Worker } from "@/lib/worker-map"

export type { Worker } from "@/lib/worker-map"

interface WorkerCardProps {
  worker: Worker
}

export function WorkerCard({ worker }: WorkerCardProps) {
  const profileHref = workerProfilePath(worker.id)

  return (
    <article className="group relative rounded-2xl border border-teal/25 bg-card p-6 shadow-[0_8px_28px_rgb(30_111_138_/_0.08)] transition-all hover:border-teal/45 hover:shadow-[0_12px_36px_rgb(30_111_138_/_0.14)]">
      <Link
        href={profileHref}
        className="absolute inset-0 z-[1] rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        aria-label={`View profile for ${worker.name}`}
      />

      <div className="pointer-events-none relative z-[2] flex flex-col gap-4 sm:flex-row">
        <WorkerAvatar
          profileImage={worker.profileImage}
          initials={worker.initials}
          className="h-16 w-16 shrink-0"
          fallbackClassName="text-lg"
        />

        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-foreground underline-offset-4 group-hover:underline">
                {worker.name}
              </p>
              {worker.verified && (
                <BadgeCheck
                  className="h-5 w-5 shrink-0 text-accent"
                  aria-label="Listed profile"
                />
              )}
              {worker.totalReviews > 0 && (
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
                  <span className="font-semibold tabular-nums text-foreground">
                    {worker.averageRating.toFixed(1)}
                  </span>
                  <span>
                    ({worker.totalReviews}{" "}
                    {worker.totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </span>
              )}
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              <span>{worker.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              <span>{worker.experience} years experience</span>
            </div>
            <div className="flex items-center gap-1">
              <UserCircle className="h-4 w-4 shrink-0" aria-hidden />
              <span className="capitalize">{worker.workerKind}</span>
            </div>
          </div>

          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {worker.description}
          </p>

          {worker.jobTypeLabels.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Categories:
              </span>
              {worker.jobTypeLabels.map((label, i) => (
                <Badge key={`${worker.jobTypes[i] ?? label}-${i}`} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}

          <div className="mb-4 flex flex-wrap gap-2">
            {worker.services.slice(0, 4).map((service, idx) => (
              <Badge key={`${service}-${idx}`} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {worker.services.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{worker.services.length - 4} more
              </Badge>
            )}
            {worker.services.length === 0 && worker.jobTypeLabels.length === 0 && (
              <span className="text-xs text-muted-foreground">No services listed yet</span>
            )}
          </div>

          <div className="pointer-events-auto relative z-[3]">
            {worker.email ? (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                <a
                  href={`mailto:${worker.email}?subject=Inquiry%20from%20ZotServis`}
                  className="text-teal underline-offset-2 hover:underline"
                >
                  {worker.email}
                </a>
              </div>
            ) : null}

            <WorkerContactActions phone={worker.phone} workerName={worker.name} title={worker.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
