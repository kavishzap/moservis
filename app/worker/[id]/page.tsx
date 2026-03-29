import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WorkerContactActions } from "@/components/worker-contact-actions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Star,
  Phone,
  BadgeCheck,
  Clock,
  Mail,
  Calendar,
  Briefcase,
} from "lucide-react"

// Sample worker data (in real app, fetch from API based on ID)
const worker = {
  id: "1",
  name: "Rajesh Plumbing Services",
  title: "Professional Plumber",
  location: "Curepipe",
  areasServed: ["Curepipe", "Vacoas", "Phoenix", "Quatre Bornes", "Rose Hill"],
  description: "I am an experienced plumber with over 12 years in the trade. I specialize in residential and commercial plumbing, from simple repairs to complete installations. I take pride in my work and always ensure customer satisfaction. Available for emergency repairs 24/7.",
  services: ["Pipe Repair", "Water Heater Installation", "Drain Cleaning", "Toilet Installation", "Leak Detection", "Bathroom Renovation", "Kitchen Plumbing", "Water Tank Installation"],
  experience: 12,
  rating: 4.9,
  reviewCount: 87,
  verified: true,
  phone: "+230 5123 4567",
  email: "rajesh@example.com",
  availability: "Weekdays & Saturdays",
  priceRange: "Rs 500 - Rs 5,000",
  initials: "RP",
  reviews: [
    {
      id: 1,
      name: "Marie-Claire D.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service! Rajesh fixed our leaking pipes quickly and professionally. Very reasonable pricing too.",
      initials: "MC",
    },
    {
      id: 2,
      name: "Ashvin P.",
      rating: 5,
      date: "1 month ago",
      comment: "Very reliable and punctual. He installed our new water heater perfectly. Highly recommend!",
      initials: "AP",
    },
    {
      id: 3,
      name: "Sophie L.",
      rating: 4,
      date: "2 months ago",
      comment: "Good work on the bathroom renovation. Minor delay but overall satisfied with the result.",
      initials: "SL",
    },
  ],
}

function ContactCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Contact {worker.name.split(" ")[0]}</h3>
      <div className="space-y-3">
        <WorkerContactActions
          phone={worker.phone}
          workerName={worker.name}
          title={worker.title}
          layout="stacked"
        />
        <Button variant="outline" className="w-full gap-2" asChild>
          <a href={`mailto:${worker.email}?subject=Inquiry%20from%20ZotServis`}>
            <Mail className="h-4 w-4" />
            Send inquiry
          </a>
        </Button>
      </div>
      <div className="mt-6 space-y-3 border-t border-border pt-6">
        <div className="flex items-center gap-3 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{worker.phone}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{worker.availability}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{worker.priceRange}</span>
        </div>
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof worker.reviews[0] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {review.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{review.comment}</p>
    </div>
  )
}

export default function WorkerProfilePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-secondary/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Avatar */}
              <Avatar className="h-24 w-24 shrink-0 md:h-32 md:w-32">
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground md:text-4xl">
                  {worker.initials}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-foreground md:text-3xl">{worker.name}</h1>
                  {worker.verified && (
                    <BadgeCheck className="h-6 w-6 text-accent" />
                  )}
                </div>
                <p className="mb-4 text-lg text-muted-foreground">{worker.title}</p>

                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{worker.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{worker.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-amber-700">{worker.rating}</span>
                    <span className="text-amber-600">({worker.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="md:hidden">
                  <WorkerContactActions
                    phone={worker.phone}
                    workerName={worker.name}
                    title={worker.title}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* About */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">About</h2>
                <p className="text-muted-foreground leading-relaxed">{worker.description}</p>
              </section>

              {/* Services Offered */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {worker.services.map((service) => (
                    <Badge key={service} variant="secondary" className="text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Areas Covered */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">Areas Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {worker.areasServed.map((area) => (
                    <Badge key={area} variant="outline" className="text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {area}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Portfolio */}
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">Portfolio</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl bg-secondary"
                    />
                  ))}
                </div>
              </section>

              {/* Reviews */}
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    Reviews ({worker.reviewCount})
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-foreground">{worker.rating}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {worker.reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  View All Reviews
                </Button>
              </section>
            </div>

            {/* Sticky Sidebar */}
            <aside className="hidden w-80 shrink-0 lg:block">
              <div className="sticky top-24">
                <ContactCard />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
