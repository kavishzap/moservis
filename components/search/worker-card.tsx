import Link from "next/link"
import { MapPin, BadgeCheck, Clock, Mail, UserCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WorkerContactActions } from "@/components/worker-contact-actions"
import type { Worker } from "@/lib/worker-map"

export type { Worker } from "@/lib/worker-map"

interface WorkerCardProps {
  worker: Worker
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <div className="group rounded-2xl border border-primary/25 bg-card p-6 shadow-[0_0_20px_rgba(57,255,20,0.06)] transition-all hover:border-primary/50 hover:shadow-[0_0_28px_rgba(57,255,20,0.12)]">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Avatar className="h-16 w-16 shrink-0">
          <AvatarFallback className="bg-primary text-lg text-primary-foreground">
            {worker.initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/worker/${worker.id}`}
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                {worker.name}
              </Link>
              {worker.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden />}
            </div>
            <p className="text-sm text-muted-foreground">{worker.title}</p>
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

          <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{worker.description}</p>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Job types:
            </span>
            {worker.jobTypes.map((slug, i) => (
              <Badge key={slug} variant="outline" className="text-xs">
                {worker.jobTypeLabels[i] ?? slug}
              </Badge>
            ))}
          </div>

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
            {worker.services.length === 0 && (
              <span className="text-xs text-muted-foreground">No services listed yet</span>
            )}
          </div>

          {worker.email ? (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <Mail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <a
                href={`mailto:${worker.email}?subject=Inquiry%20from%20ZotServis`}
                className="text-primary underline-offset-2 hover:underline"
              >
                {worker.email}
              </a>
            </div>
          ) : null}

          <WorkerContactActions phone={worker.phone} workerName={worker.name} title={worker.title} />
        </div>
      </div>
    </div>
  )
}
