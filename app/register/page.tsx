"use client"

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { districtLabelForApi } from "@/lib/worker-dashboard"
import { cn } from "@/lib/utils"
import {
  PHONE_INPUT_PLACEHOLDER,
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONE,
  buildWhatsAppHref,
  formatSitePhoneDisplay,
} from "@/lib/contact"
import { AUTH_PATHS } from "@/lib/auth-urls"
import {
  CheckCircle2,
  Loader2,
  Users,
  Phone,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import { SelectionPills } from "@/components/search/selection-pills"
import { toast } from "@/lib/toast"
import { normalizeEmail } from "@/lib/worker-application"
import {
  getServiceCategories,
  type ServiceCategory,
} from "@/services/categoryService"
import { registerWorker } from "@/services/workerService"

const MAX_CATEGORIES = 3

const PRO_UPGRADE_WHATSAPP_MESSAGE =
  "Hello, I'm interested in upgrading to ZotServis Pro. Could you tell me more?"

const freePlanPerks = [
  "Public profile visible across Mauritius",
  "Up to 3 service categories",
  "Direct calls & WhatsApp from customers",
]

const proPlanPerks = [
  "Priority placement in search results",
  "More categories & portfolio space",
  "Featured badge to stand out",
]

const benefits = [
  {
    icon: Users,
    title: "Get Discovered",
    description: "Be found by people actively searching for local services in Mauritius",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Receive calls and WhatsApp messages directly from interested public users",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Increase your local visibility and make it easier for people to discover your services",
  },
  {
    icon: Shield,
    title: "Build Trust",
    description:
      "Build a complete public profile with service details, photos, experience, and areas served",
  },
]

function workerKindToType(kind: "individual" | "contractor"): "Individual" | "Company" {
  return kind === "individual" ? "Individual" : "Company"
}

function isDuplicateRegistrationError(message: string): boolean {
  const m = message.toLowerCase()
  return (
    m.includes("already") ||
    m.includes("duplicate") ||
    m.includes("registered") ||
    m.includes("exists")
  )
}

function RequiredStar() {
  return (
    <span className="text-destructive" aria-hidden>
      *
    </span>
  )
}

function RegisterFormSection({
  title,
  description,
  children,
  className,
  headingId,
}: {
  title: ReactNode
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
  const [mounted, setMounted] = useState(false)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<string[]>([])
  const [categoryError, setCategoryError] = useState(false)
  const [subcategoryError, setSubcategoryError] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [district, setDistrict] = useState("")
  const [workerKind, setWorkerKind] = useState<"individual" | "contractor">("individual")
  const [successOpen, setSuccessOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const availableSubcategories = useMemo(() => {
    return categories
      .filter((c) => selectedCategoryIds.includes(c.id))
      .flatMap((c) =>
        c.subcategories.map((s) => ({
          ...s,
          categoryName: c.name,
        }))
      )
  }, [categories, selectedCategoryIds])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        const category = categories.find((c) => c.id === categoryId)
        const subIds = new Set(category?.subcategories.map((s) => s.id) ?? [])
        setSelectedSubcategoryIds((subs) => subs.filter((id) => !subIds.has(id)))
        return prev.filter((id) => id !== categoryId)
      }
      if (prev.length >= MAX_CATEGORIES) {
        toast.error(`You can select up to ${MAX_CATEGORIES} categories.`)
        return prev
      }
      return [...prev, categoryId]
    })
  }

  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategoryIds((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      try {
        setCategoriesLoading(true)
        setCategoriesError(null)
        const result = await getServiceCategories()
        if (!cancelled) setCategories(result)
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Could not load service categories."
          setCategoriesError(message)
          console.error(err)
        }
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }

    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (selectedCategoryIds.length > 0) setCategoryError(false)
  }, [selectedCategoryIds])

  useEffect(() => {
    if (selectedSubcategoryIds.length > 0) setSubcategoryError(false)
  }, [selectedSubcategoryIds])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setFormError(null)
    if (categoriesLoading) {
      setFormError("Service categories are still loading. Please wait.")
      toast.error("Please wait for categories to load.")
      return
    }
    if (categoriesError) {
      setFormError(categoriesError)
      toast.error("Could not load service categories.")
      return
    }
    if (selectedCategoryIds.length === 0) {
      setCategoryError(true)
      return
    }
    if (selectedCategoryIds.length > MAX_CATEGORIES) {
      setFormError(`You can select up to ${MAX_CATEGORIES} categories.`)
      toast.error(`You can select up to ${MAX_CATEGORIES} categories.`)
      return
    }
    const subcategoriesRequired = categories
      .filter((c) => selectedCategoryIds.includes(c.id))
      .some((c) => c.subcategories.length > 0)
    if (subcategoriesRequired && selectedSubcategoryIds.length === 0) {
      setSubcategoryError(true)
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
    const companyName = String(fd.get("companyName") ?? "").trim()
    const bio = String(fd.get("bio") ?? "").trim()
    const areasServedRaw = String(fd.get("areasServed") ?? "").trim()
    const experienceRaw = String(fd.get("experience") ?? "").trim()

    if (!emailRaw) {
      setFormError("Email is required to create your account.")
      toast.error("Please enter your email.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      setFormError("Please enter a valid email address.")
      toast.error("Please enter a valid email address.")
      return
    }

    if (workerKind === "individual" && (!firstName || !lastName)) {
      setFormError("First name and last name are required for individual registration.")
      toast.error("Please enter your first and last name.")
      return
    }

    if (workerKind === "contractor" && !companyName) {
      setFormError("Company name is required when registering as a company.")
      toast.error("Please enter your company name.")
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
      await registerWorker({
        email: normalizeEmail(emailRaw),
        worker_type: workerKindToType(workerKind),
        first_name: workerKind === "individual" ? firstName : null,
        last_name: workerKind === "individual" ? lastName : null,
        company_name: workerKind === "contractor" ? companyName : null,
        phone_number: phone,
        years_of_experience: yearsExperience,
        district: districtLabelForApi(district),
        areas_served: areasServedRaw || null,
        about: bio,
        subscription_plan: null,
        terms_accepted: true,
        category_ids: selectedCategoryIds,
        subcategory_ids: selectedSubcategoryIds,
      })

      setSuccessOpen(true)
      form.reset()
      setSelectedCategoryIds([])
      setSelectedSubcategoryIds([])
      setCategoryError(false)
      setSubcategoryError(false)
      setDistrict("")
      setWorkerKind("individual")
      setAgreedToTerms(false)
    } catch (err) {
      const raw =
        err instanceof Error ? err.message : "Could not complete registration."
      const message =
        raw.includes("NEXT_PUBLIC_SUPABASE") || raw.includes("Missing NEXT_PUBLIC")
          ? "Registration is not configured. Check environment variables."
          : isDuplicateRegistrationError(raw)
            ? "This email is already registered. Use a different email or contact support if you need help."
            : raw
      setFormError(message)
      toast.error(
        isDuplicateRegistrationError(raw) ? "Email already registered." : message
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                Join as a Service Provider
              </h1>
              <p className="text-muted-foreground">
                Join ZotServis and make your services easier to find across Mauritius
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
              {/* Form */}
              <div className="min-w-0 flex-1 lg:max-w-3xl">
                <form
                  className="rounded-2xl border border-border bg-card p-6 shadow-md ring-1 ring-ocean/5 sm:p-8 lg:p-10"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-6 md:space-y-8">
                    <RegisterFormSection
                      title="Personal information"
                      description="How we will contact you and how your public service provider profile will appear."
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-3 sm:col-span-2">
                          <Label id="worker-kind-label" className="text-sm font-medium">
                            Registering as <RequiredStar />
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
                                  ? "border-teal bg-teal/5 ring-2 ring-teal/20"
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
                                  Individual service provider or freelancer.
                                </p>
                              </div>
                            </label>
                            <label
                              htmlFor="worker-kind-contractor"
                              className={cn(
                                "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                                workerKind === "contractor"
                                  ? "border-teal bg-teal/5 ring-2 ring-teal/20"
                                  : "border-border bg-background hover:bg-muted/40"
                              )}
                            >
                              <RadioGroupItem
                                value="contractor"
                                id="worker-kind-contractor"
                                className="mt-0.5 shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-semibold text-foreground">Company</span>
                                <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                                  Business name, team, or company.
                                </p>
                              </div>
                            </label>
                          </RadioGroup>
                        </div>

                        <div
                          className={cn(
                            "space-y-2",
                            workerKind !== "individual" && "hidden"
                          )}
                          aria-hidden={workerKind !== "individual"}
                        >
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            First name <RequiredStar />
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className="h-11"
                            autoComplete="given-name"
                            placeholder="First name"
                            required={workerKind === "individual"}
                            disabled={workerKind !== "individual"}
                            tabIndex={workerKind === "individual" ? 0 : -1}
                          />
                        </div>
                        <div
                          className={cn(
                            "space-y-2",
                            workerKind !== "individual" && "hidden"
                          )}
                          aria-hidden={workerKind !== "individual"}
                        >
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Last name <RequiredStar />
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className="h-11"
                            autoComplete="family-name"
                            placeholder="Last name"
                            required={workerKind === "individual"}
                            disabled={workerKind !== "individual"}
                            tabIndex={workerKind === "individual" ? 0 : -1}
                          />
                        </div>
                        <div
                          className={cn(
                            "space-y-2 sm:col-span-2",
                            workerKind !== "contractor" && "hidden"
                          )}
                          aria-hidden={workerKind !== "contractor"}
                        >
                          <Label htmlFor="companyName" className="text-sm font-medium">
                            Company name <RequiredStar />
                          </Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            className="h-11"
                            autoComplete="organization"
                            placeholder="Your business name"
                            required={workerKind === "contractor"}
                            disabled={workerKind !== "contractor"}
                            tabIndex={workerKind === "contractor" ? 0 : -1}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Phone / WhatsApp <RequiredStar />
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
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email <RequiredStar />
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
                            We&apos;ll email you a link to set your password. Each email can register once.
                          </p>
                        </div>
                      </div>
                    </RegisterFormSection>

                    <RegisterFormSection
                      title="Service information"
                      description="Your service categories and areas served in Mauritius."
                    >
                      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                        <div className="min-w-0 space-y-2 sm:col-span-2">
                          <Label id="categories-label" className="text-sm font-medium">
                            Categories <RequiredStar />
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Select up to {MAX_CATEGORIES} service categories you work in
                            {selectedCategoryIds.length > 0
                              ? ` (${selectedCategoryIds.length}/${MAX_CATEGORIES} selected)`
                              : ""}
                            .
                          </p>
                          {categoriesLoading ? (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                              Loading categories…
                            </p>
                          ) : categoriesError ? (
                            <p className="text-sm text-destructive" role="alert">
                              {categoriesError}
                            </p>
                          ) : categories.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No categories available. Please try again later.
                            </p>
                          ) : (
                            <SelectionPills
                              items={categories}
                              selectedIds={selectedCategoryIds}
                              onToggle={toggleCategory}
                              labelId="categories-label"
                            />
                          )}
                          {categoryError && (
                            <p className="text-sm text-destructive" role="alert">
                              Select at least one category.
                            </p>
                          )}
                        </div>

                        {selectedCategoryIds.length > 0 && availableSubcategories.length > 0 && (
                          <div className="min-w-0 space-y-2 sm:col-span-2">
                            <Label id="subcategories-label" className="text-sm font-medium">
                              Subcategories <RequiredStar />
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Select the specific services you offer within your categories.
                            </p>
                            <div className="space-y-4">
                              {categories
                                .filter((c) => selectedCategoryIds.includes(c.id))
                                .map((category) =>
                                  category.subcategories.length > 0 ? (
                                    <div key={category.id} className="space-y-2">
                                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        {category.name}
                                      </p>
                                      <SelectionPills
                                        items={category.subcategories}
                                        selectedIds={selectedSubcategoryIds}
                                        onToggle={toggleSubcategory}
                                        labelId="subcategories-label"
                                      />
                                    </div>
                                  ) : null
                                )}
                            </div>
                            {subcategoryError && (
                              <p className="text-sm text-destructive" role="alert">
                                Select at least one subcategory.
                              </p>
                            )}
                          </div>
                        )}

                        {selectedCategoryIds.length > 0 &&
                          availableSubcategories.length === 0 &&
                          !categoriesLoading && (
                            <p className="text-sm text-muted-foreground sm:col-span-2">
                              No subcategories are available for your selected categories.
                            </p>
                          )}

                        <div className="space-y-2">
                          <Label htmlFor="experience" className="text-sm font-medium">
                            Years of experience <RequiredStar />
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
                            onKeyDown={(event) => {
                              const invalidKeys = ["e", "E", "+", "-", ".", ","]
                              if (invalidKeys.includes(event.key)) {
                                event.preventDefault()
                              }
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location" className="text-sm font-medium">
                            District <RequiredStar />
                          </Label>
                          {mounted ? (
                            <Select value={district} onValueChange={setDistrict} required>
                              <SelectTrigger
                                id="location"
                                className="!h-11 min-h-11 w-full py-0"
                              >
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
                          ) : (
                            <div
                              id="location"
                              className="flex h-11 w-full items-center rounded-md border border-input bg-transparent px-3 text-sm text-muted-foreground shadow-xs"
                              aria-hidden
                            >
                              Select your district
                            </div>
                          )}
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
                      title="Your plan"
                      description="Start free. Upgrade to Pro later if you want more visibility."
                      headingId="subscription-plan-heading"
                    >
                      <div
                        className="grid gap-3 sm:grid-cols-2 sm:items-stretch"
                        aria-labelledby="subscription-plan-heading"
                      >
                        <div className="flex h-full flex-col rounded-2xl border border-teal bg-teal/5 p-4 ring-2 ring-teal/20">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground">Free</p>
                            <span className="rounded-full bg-teal px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                              Included
                            </span>
                          </div>
                          <p className="text-2xl font-bold tabular-nums text-foreground">
                            Rs 0
                            <span className="text-base font-semibold text-muted-foreground">
                              /forever
                            </span>
                          </p>
                          <ul className="mt-3 space-y-2">
                            {freePlanPerks.map((perk) => (
                              <li
                                key={perk}
                                className="flex gap-2 text-xs leading-snug text-muted-foreground"
                              >
                                <CheckCircle2
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal"
                                  aria-hidden
                                />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
                              <Sparkles className="h-3.5 w-3.5 text-ocean" aria-hidden />
                              Pro
                            </p>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-muted-foreground">
                              Optional
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground">
                            Upgrade for more advantage
                          </p>
                          <ul className="mt-3 space-y-2">
                            {proPlanPerks.map((perk) => (
                              <li
                                key={perk}
                                className="flex gap-2 text-xs leading-snug text-muted-foreground"
                              >
                                <Sparkles
                                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ocean"
                                  aria-hidden
                                />
                                <span>{perk}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                            Want Pro? Contact an admin after you register — we’ll set it up for you.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={buildWhatsAppHref(
                                SITE_CONTACT_PHONE,
                                PRO_UPGRADE_WHATSAPP_MESSAGE,
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                            >
                              WhatsApp admin
                              <ArrowUpRight className="h-3 w-3" aria-hidden />
                            </a>
                            <a
                              href={`mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent("ZotServis Pro upgrade")}&body=${encodeURIComponent(PRO_UPGRADE_WHATSAPP_MESSAGE)}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                            >
                              Email admin
                              <ArrowUpRight className="h-3 w-3" aria-hidden />
                            </a>
                          </div>
                        </div>
                      </div>
                    </RegisterFormSection>

                    <RegisterFormSection title="About you">
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          Short bio / description <RequiredStar />
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
                          className="mt-0.5 shrink-0 border-teal data-[state=checked]:border-teal data-[state=checked]:bg-teal data-[state=checked]:text-white"
                        />
                        <label
                          htmlFor="terms"
                          className="min-w-0 flex-1 cursor-pointer text-sm leading-relaxed text-pretty text-muted-foreground"
                        >
                          I agree to the{" "}
                          <Link
                            href="/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline font-medium text-teal underline underline-offset-2"
                          >
                            Terms of Service
                          </Link>
                          ,{" "}
                          <Link
                            href="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline font-medium text-teal underline underline-offset-2"
                          >
                            Privacy Policy
                          </Link>
                          , and{" "}
                          <Link
                            href="/service-provider-agreement"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline font-medium text-teal underline underline-offset-2"
                          >
                            Service Provider Agreement
                          </Link>
                          .
                        </label>
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
                      className="h-12 w-full text-base shadow-none focus-visible:ring-ocean/25"
                      disabled={
                        !agreedToTerms || isSubmitting || categoriesLoading || !!categoriesError
                      }
                    >
                      {isSubmitting ? "Submitting…" : "Register as a Service Provider"}
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
                    List your services so people across Mauritius can find and contact you directly.
                    Joining as a service provider is free.
                  </p>
                  <div className="space-y-6">
                    {benefits.map((benefit) => (
                      <div key={benefit.title} className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10">
                          <benefit.icon className="h-5 w-5 text-teal" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="rounded-xl border border-teal/30 bg-teal/5 p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Free Subscription
                      </p>
                      <p className="text-2xl font-bold tabular-nums text-foreground">
                        Rs 0
                        <span className="text-base font-semibold text-muted-foreground">
                          /forever
                        </span>
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Register free and stay visible — no card required.
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/30 p-4">
                      <p className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-ocean" aria-hidden />
                        Upgrade to Pro
                      </p>
                      <p className="text-sm leading-relaxed text-foreground">
                        Get priority in search, a featured badge, and more room to showcase your
                        services.
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Contact an admin to upgrade —{" "}
                        <a
                          href={buildWhatsAppHref(
                            SITE_CONTACT_PHONE,
                            PRO_UPGRADE_WHATSAPP_MESSAGE,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-teal underline underline-offset-2"
                        >
                          WhatsApp {formatSitePhoneDisplay(SITE_CONTACT_PHONE)}
                        </a>{" "}
                        or{" "}
                        <a
                          href={`mailto:${SITE_CONTACT_EMAIL}?subject=${encodeURIComponent("ZotServis Pro upgrade")}`}
                          className="font-medium text-teal underline underline-offset-2"
                        >
                          {SITE_CONTACT_EMAIL}
                        </a>
                        .
                      </p>
                    </div>
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
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-teal/15">
              <CheckCircle2 className="h-8 w-8 text-teal" aria-hidden />
            </div>
            <DialogTitle>Registration complete</DialogTitle>
            <DialogDescription className="space-y-3 pt-1 text-base leading-relaxed" asChild>
              <div>
                <p className="text-muted-foreground">
                  Your worker account has been created. Check your email for an invite link to set your
                  password, then{" "}
                  <Link href={AUTH_PATHS.login} className="font-medium text-teal hover:underline">
                    log in
                  </Link>{" "}
                  to manage your profile.
                </p>
                <p className="text-foreground/90">
                  Your profile is pending verification. An administrator may contact you within{" "}
                  <strong className="font-semibold text-foreground">24 hours</strong> to complete
                  onboarding.
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
