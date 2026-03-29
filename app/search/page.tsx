import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  SearchFiltersMobile,
  SearchFiltersProvider,
  SearchFiltersSidebar,
} from "@/components/search/search-filters"
import { WorkerCard, type Worker } from "@/components/search/worker-card"

// Sample worker data
const workers: Worker[] = [
  {
    id: "1",
    name: "Rajesh Plumbing Services",
    title: "Professional Plumber",
    location: "Curepipe",
    description: "Experienced plumber specializing in residential and commercial plumbing. Available for emergency repairs, installations, and maintenance work.",
    services: ["Pipe Repair", "Water Heater", "Drain Cleaning", "Toilet Installation", "Leak Detection"],
    experience: 12,
    verified: true,
    phone: "+230 5123 4567",
    initials: "RP",
  },
  {
    id: "2",
    name: "Marie Cleaning Co.",
    title: "House Cleaner",
    location: "Quatre Bornes",
    description: "Professional house cleaning services for homes and offices. We use eco-friendly products and provide thorough, reliable service.",
    services: ["Deep Cleaning", "Regular Cleaning", "Office Cleaning", "Move-in/out Cleaning"],
    experience: 8,
    verified: true,
    phone: "+230 5234 5678",
    initials: "MC",
  },
  {
    id: "3",
    name: "Anil Electrical Works",
    title: "Certified Electrician",
    location: "Rose Hill",
    description: "Licensed electrician with expertise in wiring, installations, and repairs. Safety is our top priority.",
    services: ["Wiring", "Light Installation", "Circuit Breaker", "Emergency Repairs", "Solar Panel"],
    experience: 15,
    verified: true,
    phone: "+230 5345 6789",
    initials: "AE",
  },
  {
    id: "4",
    name: "Green Thumb Gardens",
    title: "Landscaper & Gardener",
    location: "Moka",
    description: "Transform your outdoor space with our professional gardening and landscaping services. From maintenance to complete garden makeovers.",
    services: ["Lawn Care", "Landscaping", "Tree Trimming", "Garden Design", "Irrigation"],
    experience: 10,
    verified: true,
    phone: "+230 5456 7890",
    initials: "GT",
  },
  {
    id: "5",
    name: "Patrick Painting Pro",
    title: "Interior & Exterior Painter",
    location: "Port Louis",
    description: "Quality painting services for residential and commercial properties. We guarantee clean work and vibrant, long-lasting results.",
    services: ["Interior Painting", "Exterior Painting", "Wall Repair", "Texture Coating"],
    experience: 7,
    verified: false,
    phone: "+230 5567 8901",
    initials: "PP",
  },
  {
    id: "6",
    name: "Sanjay AC Solutions",
    title: "AC Technician",
    location: "Vacoas",
    description: "Expert AC installation, repair, and maintenance. We service all major brands and offer emergency repairs.",
    services: ["AC Installation", "AC Repair", "Maintenance", "Gas Refill", "Duct Cleaning"],
    experience: 9,
    verified: true,
    phone: "+230 5678 9012",
    initials: "SA",
  },
]

function SearchHeader() {
  return (
    <div className="border-b border-border bg-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Find Workers Near You
        </h1>
      </div>
    </div>
  )
}

function SearchResults() {
  return (
    <SearchFiltersProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <SearchFiltersSidebar />

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{workers.length}</span> workers
              </p>
              <SearchFiltersMobile />
            </div>

            <div className="space-y-4">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SearchFiltersProvider>
  )
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <SearchHeader />
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
