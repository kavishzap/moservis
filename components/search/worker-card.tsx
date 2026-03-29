import { MapPin, BadgeCheck, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WorkerContactActions } from "@/components/worker-contact-actions"

export interface Worker {
  id: string
  name: string
  title: string
  location: string
  description: string
  services: string[]
  experience: number
  verified: boolean
  phone: string
  initials: string
}

interface WorkerCardProps {
  worker: Worker
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Avatar */}
        <Avatar className="h-16 w-16 shrink-0">
          <AvatarFallback className="bg-primary text-lg text-primary-foreground">
            {worker.initials}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{worker.name}</h3>
              {worker.verified && (
                <BadgeCheck className="h-5 w-5 text-accent" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{worker.title}</p>
          </div>

          {/* Location & Experience */}
          <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{worker.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{worker.experience} years experience</span>
            </div>
          </div>

          {/* Description */}
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{worker.description}</p>

          {/* Services */}
          <div className="mb-4 flex flex-wrap gap-2">
            {worker.services.slice(0, 4).map((service) => (
              <Badge key={service} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {worker.services.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{worker.services.length - 4} more
              </Badge>
            )}
          </div>

          <WorkerContactActions
            phone={worker.phone}
            workerName={worker.name}
            title={worker.title}
          />
        </div>
      </div>
    </div>
  )
}
