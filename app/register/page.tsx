"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { ServiceTypePills } from "@/components/service-type-pills"
import {
  DEFAULT_WORKER_PLAN,
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
  WORKER_YEARLY_SAVINGS_RS,
  type WorkerPlanId,
} from "@/lib/worker-pricing"
import { cn } from "@/lib/utils"
import { PHONE_INPUT_PLACEHOLDER } from "@/lib/contact"
import { WORKER_PROMO_PNG } from "@/lib/promo-assets"
import { CheckCircle2, Users, Phone, TrendingUp, Shield, X } from "lucide-react"
import { toast, Toaster } from "sonner"
import {
  isUniqueViolation,
  normalizeEmail,
  submitWorkerApplication,
} from "@/lib/worker-application"

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

function RegisterFormSection({
  title,
  description,
  children,
  className,
  headingId,
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
  headingId?: string
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border/90 bg-muted/20 p-5 shadow-sm sm:p-6",
        className
      )}
    >
      <header className="mb-5 border-b border-border/70 pb-4">
        <h2
          id={headingId}
          className="text-base font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  )
}

export default function RegisterPage() {
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [jobTypeError, setJobTypeError] = useState(false)
  const [services, setServices] = useState<string[]>([])
  const [serviceInput, setServiceInput] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [district, setDistrict] = useState("")
  const [workerKind, setWorkerKind] = useState<"individual" | "contractor">("individual")
  const [plan, setPlan] = useState<WorkerPlanId>(DEFAULT_WORKER_PLAN)
  const [successOpen, setSuccessOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const toggleJobType = (value: string) => {
    setJobTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  useEffect(() => {
    if (jobTypes.length > 0) setJobTypeError(false)
  }, [jobTypes])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setFormError(null)
    if (jobTypes.length === 0) {
      setJobTypeError(true)
      return
    }
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    if (!agreedToTerms) return
    if (!district) {
      setFormError("Please select your district.")
      toast.error("Please select your district.")
      return
    }

    const fd = new FormData(form)
    const firstName = String(fd.get("firstName") ?? "").trim()
    const lastName = String(fd.get("lastName") ?? "").trim()
    const phone = String(fd.get("phone") ?? "").trim()
    const emailRaw = String(fd.get("email") ?? "").trim()
    const bio = String(fd.get("bio") ?? "").trim()
    const areasServedRaw = String(fd.get("areasServed") ?? "").trim()
    const experienceRaw = String(fd.get("experience") ?? "").trim()
    const otherJobRaw = String(fd.get("otherJobType") ?? "").trim()

    if (!emailRaw) {
      setFormError("Email is required.")
      toast.error("Please enter your email.")
      return
    }

    if (!/^\d+$/.test(experienceRaw)) {
      setFormError("Years of experience must be a whole number (0 or higher).")
      toast.error("Use a whole number for years of experience.")
      return
    }
    const yearsExperience = Number.parseInt(experienceRaw, 10)

    setIsSubmitting(true)
    try {
      const { error } = await submitWorkerApplication({
        first_name: firstName,
        last_name: lastName,
        worker_kind: workerKind,
        phone,
        email: normalizeEmail(emailRaw),
        job_types: jobTypes,
        other_job_type: jobTypes.includes("other") ? otherJobRaw || null : null,
        years_experience: yearsExperience,
        district,
        areas_served: areasServedRaw ? areasServedRaw : null,
        services_offered: services,
        subscription_plan: plan,
        bio,
        terms_accepted_at: new Date().toISOString(),
      })

      if (error) {
        if (isUniqueViolation(error)) {
          const msg =
            "This email is already registered. Use a different email or contact support if you need help."
          setFormError(msg)
          toast.error("Email already registered.")
        } else {
          setFormError(error.message || "Could not submit your application.")
          toast.error("Something went wrong. Please try again.")
        }
        return
      }

      setSuccessOpen(true)
      form.reset()
      setJobTypes([])
      setJobTypeError(false)
      setServices([])
      setServiceInput("")
      setDistrict("")
      setWorkerKind("individual")
      setPlan(DEFAULT_WORKER_PLAN)
      setAgreedToTerms(false)
    } catch (err) {
      const message =
        err instanceof Error && err.message.includes("NEXT_PUBLIC_SUPABASE")
          ? "Application form is not configured. Check environment variables."
          : "Could not submit your application."
      setFormError(message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
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

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
              {/* Form */}
              <div className="min-w-0 flex-1 lg:max-w-3xl">
                <form
                  className="rounded-2xl border border-border bg-card p-6 shadow-md ring-1 ring-black/[0.04] dark:ring-white/10 sm:p-8 lg:p-10"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-6 md:space-y-8">
                    <RegisterFormSection
                      title="Personal information"
                      description="How we’ll reach you and how you appear on your profile."
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First name *
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className="h-11"
                            autoComplete="given-name"
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last name *
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className="h-11"
                            autoComplete="family-name"
                            placeholder="Last name"
                            required
                          />
                        </div>

                        <div className="space-y-3 sm:col-span-2">
                          <Label id="worker-kind-label" className="text-sm font-medium">
                            Registering as *
                          </Label>
                          <RadioGroup
                            value={workerKind}
                            onValueChange={(v) =>
                              setWorkerKind(v as "individual" | "contractor")
                            }
                            className="grid gap-3 sm:grid-cols-2"
                            aria-labelledby="worker-kind-label"
                          >
                            <label
                              htmlFor="worker-kind-individual"
                              className={cn(
                                "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                                workerKind === "individual"
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                  : "border-border bg-background hover:bg-muted/40"
                              )}
                            >
                              <RadioGroupItem
                                value="individual"
                                id="worker-kind-individual"
                                className="mt-0.5 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-semibold text-foreground">Individual</span>
                                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                                  Solo tradesperson or freelancer.
                                </p>
                              </div>
                            </label>
                            <label
                              htmlFor="worker-kind-contractor"
                              className={cn(
                                "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                                workerKind === "contractor"
                                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                  : "border-border bg-background hover:bg-muted/40"
                              )}
                            >
                              <RadioGroupItem
                                value="contractor"
                                id="worker-kind-contractor"
                                className="mt-0.5 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-semibold text-foreground">Contractor / company</span>
                                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                                  Business name, team, or company.
                                </p>
                              </div>
                            </label>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Phone / WhatsApp *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="h-11"
                            autoComplete="tel"
                            placeholder={PHONE_INPUT_PLACEHOLDER}
                            required
                          />
                          <p className="text-xs leading-snug text-muted-foreground">
                            Same number for calls and WhatsApp.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            className="h-11"
                            autoComplete="email"
                            placeholder="your@email.com"
                            required
                          />
                          <p className="text-xs leading-snug text-muted-foreground">
                            Used for your account — each email can register once.
                          </p>
                        </div>
                      </div>
                    </RegisterFormSection>

                    <RegisterFormSection
                      title="Service information"
                      description="What you do and where you work in Mauritius."
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                          <Label id="job-types-label" className="text-sm font-medium">
                            Job types *
                          </Label>
                          <p className="text-xs text-muted-foreground">Select all that apply.</p>
                          <ServiceTypePills
                            selected={jobTypes}
                            onToggle={toggleJobType}
                            labelId="job-types-label"
                          />
                          {jobTypeError && (
                            <p className="text-sm text-destructive" role="alert">
                              Select at least one job type.
                            </p>
                          )}
                        </div>

                        {jobTypes.includes("other") && (
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="otherJobType" className="text-sm font-medium">
                              Specify job type *
                            </Label>
                            <Input
                              id="otherJobType"
                              name="otherJobType"
                              className="h-11 max-w-xl"
                              placeholder="Enter your profession"
                              required
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="experience" className="text-sm font-medium">
                            Years of experience *
                          </Label>
                          <Input
                            id="experience"
                            name="experience"
                            type="number"
                            inputMode="numeric"
                            min={0}
                            step={1}
                            className="h-11"
                            placeholder="e.g. 5"
                            required
                          />
                          <p className="text-xs text-muted-foreground">Whole numbers only (no decimals).</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-medium">
                            District *
                          </Label>
                          <Select value={district} onValueChange={setDistrict} required>
                            <SelectTrigger id="location" className="h-11 w-full">
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
                          <Label htmlFor="areasServed" className="text-sm font-medium">
                            Areas served
                          </Label>
                          <Input
                            id="areasServed"
                            name="areasServed"
                            className="h-11"
                            placeholder="e.g. Curepipe, Vacoas, Phoenix"
                          />
                          <p className="text-xs text-muted-foreground">
                            Towns or regions beyond your main district, if any.
                          </p>
                        </div>
                      </div>
                    </RegisterFormSection>

                    <RegisterFormSection
                      title="Services offered"
                      description="List specific tasks customers can hire you for."
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
                        <Input
                          value={serviceInput}
                          onChange={(e) => setServiceInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="h-11 min-w-0 flex-1"
                          placeholder="e.g. Pipe repair, leak detection"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="h-11 shrink-0 sm:min-w-[5.5rem]"
                          onClick={addService}
                        >
                          Add
                        </Button>
                      </div>
                      {services.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {services.map((service) => (
                            <Badge key={service} variant="secondary" className="gap-1 pr-1">
                              {service}
                              <button
                                type="button"
                                onClick={() => removeService(service)}
                                className="ml-1 rounded-full p-0.5 hover:bg-muted"
                                aria-label={`Remove ${service}`}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </RegisterFormSection>

                    <RegisterFormSection
                      title="Subscription plan *"
                      description="Choose how you want to be billed once your profile is approved."
                      headingId="subscription-plan-heading"
                    >
                      <RadioGroup
                        value={plan}
                        onValueChange={(v) => setPlan(v as WorkerPlanId)}
                        className="grid gap-3 sm:grid-cols-2 sm:items-stretch"
                        aria-labelledby="subscription-plan-heading"
                      >
                        <label
                          htmlFor="plan-monthly"
                          className={cn(
                            "flex h-full min-h-[7.5rem] cursor-pointer flex-col rounded-2xl border p-4 transition-colors sm:min-h-0",
                            plan === "monthly_100"
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border bg-background hover:bg-muted/40"
                          )}
                        >
                          <div className="flex flex-1 items-start gap-3">
                            <RadioGroupItem value="monthly_100" id="plan-monthly" className="mt-0.5" />
                            <div className="min-w-0 flex-1 space-y-1">
                              <span className="text-sm font-semibold text-foreground">Monthly</span>
                              <p className="text-2xl font-bold tabular-nums text-foreground">
                                Rs {WORKER_MONTHLY_RS}
                                <span className="text-base font-semibold text-muted-foreground">
                                  /month
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">Flexible — cancel anytime.</p>
                            </div>
                          </div>
                        </label>
                        <label
                          htmlFor="plan-yearly"
                          className={cn(
                            "flex h-full min-h-[7.5rem] cursor-pointer flex-col rounded-2xl border p-4 transition-colors sm:min-h-0",
                            plan === "yearly_1000"
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border bg-background hover:bg-muted/40"
                          )}
                        >
                          <div className="flex flex-1 items-start gap-3">
                            <RadioGroupItem value="yearly_1000" id="plan-yearly" className="mt-0.5" />
                            <div className="min-w-0 flex-1 space-y-1">
                              <span className="inline-flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                                Yearly
                                <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-primary-foreground">
                                  Save {WORKER_YEARLY_SAVINGS_PCT}%
                                </span>
                              </span>
                              <p className="text-2xl font-bold tabular-nums text-foreground">
                                Rs {WORKER_YEARLY_RS.toLocaleString("en-MU")}
                                <span className="text-base font-semibold text-muted-foreground">/year</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Saves Rs {WORKER_YEARLY_SAVINGS_RS} vs 12 monthly payments.
                              </p>
                            </div>
                          </div>
                        </label>
                      </RadioGroup>
                    </RegisterFormSection>

                    <RegisterFormSection title="About you">
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          Short bio / description *
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          className="min-h-[8rem] resize-y"
                          rows={5}
                          placeholder="Tell customers about yourself, your experience, and what makes your service special..."
                          required
                        />
                      </div>
                    </RegisterFormSection>

                    <div className="rounded-xl border border-border bg-muted/25 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                          className="mt-0.5"
                        />
                        <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
                          I agree to the{" "}
                          <Link href="/terms" className="font-medium text-primary underline underline-offset-2">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="font-medium text-primary underline underline-offset-2">
                            Privacy Policy
                          </Link>
                          .
                        </Label>
                      </div>
                    </div>

                    {formError ? (
                      <p className="text-sm text-destructive" role="alert">
                        {formError}
                      </p>
                    ) : null}

                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 w-full text-base bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={!agreedToTerms || isSubmitting}
                    >
                      {isSubmitting ? "Submitting…" : "Register as a worker"}
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

      <Toaster richColors position="top-center" />

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
