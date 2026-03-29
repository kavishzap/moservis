"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { ServiceTypeSelect } from "@/components/service-type-select"
import {
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
  WORKER_YEARLY_SAVINGS_RS,
} from "@/lib/worker-pricing"
import { PHONE_INPUT_PLACEHOLDER } from "@/lib/contact"
import { WORKER_PROMO_PNG } from "@/lib/promo-assets"
import { CheckCircle2, Users, Phone, TrendingUp, Shield, X } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Get Discovered",
    description: "Be found by customers actively searching for your services",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Receive calls and WhatsApp messages directly from customers",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Expand your customer base and increase your earnings",
  },
  {
    icon: Shield,
    title: "Build Trust",
    description: "Get verified and build your reputation with reviews",
  },
]

export default function RegisterPage() {
  const [jobType, setJobType] = useState("")
  const [services, setServices] = useState<string[]>([])
  const [serviceInput, setServiceInput] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [district, setDistrict] = useState("")
  const [successOpen, setSuccessOpen] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if (!agreedToTerms) return
    setSuccessOpen(true)
  }

  const addService = () => {
    if (serviceInput.trim() && !services.includes(serviceInput.trim())) {
      setServices([...services, serviceInput.trim()])
      setServiceInput("")
    }
  }

  const removeService = (service: string) => {
    setServices(services.filter((s) => s !== service))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addService()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Become a Worker
              </h1>
              <p className="text-muted-foreground">
                Join ZotServis and start getting more clients today
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Form */}
              <div className="flex-1">
                <form
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
                  onSubmit={handleSubmit}
                >
                  {/* Native validation for controlled Radix selects */}
                  <input type="hidden" name="_jobType" value={jobType} required aria-hidden />
                  <input type="hidden" name="_district" value={district} required aria-hidden />
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h2 className="mb-4 text-lg font-semibold text-foreground">
                        Personal Information
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input id="fullName" placeholder="Enter your full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" type="tel" placeholder={PHONE_INPUT_PLACEHOLDER} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                          <Input id="whatsapp" type="tel" placeholder={PHONE_INPUT_PLACEHOLDER} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                      </div>
                    </div>

                    {/* Service Information */}
                    <div className="border-t border-border pt-6">
                      <h2 className="mb-4 text-lg font-semibold text-foreground">
                        Service Information
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="jobType">Job Type *</Label>
                          <ServiceTypeSelect
                            id="jobType"
                            value={jobType}
                            onValueChange={setJobType}
                            placeholder="Select your profession"
                          />
                        </div>
                        {jobType === "other" && (
                          <div className="space-y-2">
                            <Label htmlFor="otherJobType">Specify Job Type *</Label>
                            <Input id="otherJobType" placeholder="Enter your profession" />
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience *</Label>
                          <Input id="experience" type="number" min="0" placeholder="e.g. 5" required />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="location">Your district *</Label>
                          <Select value={district} onValueChange={setDistrict} required>
                            <SelectTrigger id="location" className="w-full">
                              <SelectValue placeholder="Select your district" />
                            </SelectTrigger>
                            <SelectContent>
                              {MAURITIUS_DISTRICTS.map((d) => (
                                <SelectItem key={d.value} value={d.value}>
                                  {d.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor="areasServed">Areas Served</Label>
                          <Input id="areasServed" placeholder="e.g. Curepipe, Vacoas, Phoenix" />
                        </div>
                      </div>
                    </div>

                    {/* Services Offered */}
                    <div className="border-t border-border pt-6">
                      <h2 className="mb-4 text-lg font-semibold text-foreground">
                        Services Offered
                      </h2>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            value={serviceInput}
                            onChange={(e) => setServiceInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Add a service (e.g. Pipe Repair)"
                          />
                          <Button type="button" variant="outline" onClick={addService}>
                            Add
                          </Button>
                        </div>
                        {services.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {services.map((service) => (
                              <Badge key={service} variant="secondary" className="gap-1 pr-1">
                                {service}
                                <button
                                  type="button"
                                  onClick={() => removeService(service)}
                                  className="ml-1 rounded-full p-0.5 hover:bg-muted"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="border-t border-border pt-6">
                      <h2 className="mb-4 text-lg font-semibold text-foreground">
                        About You
                      </h2>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Short Bio / Description *</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          placeholder="Tell customers about yourself, your experience, and what makes your service special..."
                          required
                        />
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="border-t border-border pt-6">
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                          I agree to the{" "}
                          <Link href="/terms" className="text-primary underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-primary underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={!agreedToTerms}
                    >
                      Register as a Worker
                    </Button>
                  </div>
                </form>
              </div>

              {/* Sidebar - Why Join */}
              <aside className="w-full lg:w-80">
                <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Why Join ZotServis?
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground">
                    List your business and receive leads from customers across Mauritius. Workers pay a simple
                    subscription to stay visible on the platform.
                  </p>
                  <div className="relative mb-6 min-h-[160px] w-full">
                    <Image
                      src={WORKER_PROMO_PNG}
                      alt="Professional worker representing ZotServis"
                      fill
                      className="object-contain object-bottom"
                      sizes="320px"
                    />
                  </div>
                  <div className="space-y-6">
                    {benefits.map((benefit) => (
                      <div key={benefit.title} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <benefit.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Pricing
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
                      <div>
                        <p className="text-2xl font-bold tabular-nums text-foreground">
                          Rs {WORKER_MONTHLY_RS}
                          <span className="text-base font-semibold text-muted-foreground">/month</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-2xl font-bold tabular-nums text-foreground">
                          Rs {WORKER_YEARLY_RS.toLocaleString("en-MU")}
                          <span className="text-base font-semibold text-muted-foreground">/year</span>
                        </p>
                        <span className="inline-flex rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                          Save {WORKER_YEARLY_SAVINGS_PCT}%
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Yearly billing saves Rs {WORKER_YEARLY_SAVINGS_RS} compared to 12 monthly payments (
                      {WORKER_YEARLY_SAVINGS_PCT}% off).
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center sm:items-center sm:text-center">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden />
            </div>
            <DialogTitle>Your application has been submitted</DialogTitle>
            <DialogDescription className="space-y-3 pt-1 text-base leading-relaxed" asChild>
              <div>
                <p className="text-muted-foreground">
                  An administrator will contact you to validate your subscription and complete the next steps.
                </p>
                <p className="text-foreground/90">
                  This process can take up to{" "}
                  <strong className="font-semibold text-foreground">24 hours</strong>.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button type="button" className="w-full sm:w-auto" onClick={() => setSuccessOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
