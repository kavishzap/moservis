"use client"

import { useCallback, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  ExternalLink,
  Loader2,
  LogOut,
  Star,
} from "lucide-react"
import { toast } from "@/lib/toast"
import { RequiredStar } from "@/components/auth/required-star"
import { SelectionPills } from "@/components/search/selection-pills"
import { WorkerReviewActions } from "@/components/worker/worker-review-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { PHONE_INPUT_PLACEHOLDER } from "@/lib/contact"
import { siteContainer } from "@/lib/site-layout"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import {
  districtLabelForApi,
  planKpiPeriod,
  planKpiTitle,
  resolveDistrictSelectValue,
} from "@/lib/worker-dashboard"
import { workerProfilePath } from "@/lib/worker-urls"
import { cn } from "@/lib/utils"
import { signOut } from "@/services/authService"
import { getServiceCategories, type ServiceCategory } from "@/services/categoryService"
import {
  getMyWorkerProfile,
  updateMyWorkerProfile,
  type WorkerDashboardProfile,
  type WorkerType,
} from "@/services/workerProfileService"

type FormState = {
  workerType: WorkerType
  firstName: string
  lastName: string
  companyName: string
  phone: string
  email: string
  yearsOfExperience: string
  district: string
  areasServed: string
  about: string
  categoryIds: string[]
  subcategoryIds: string[]
}

function profileToForm(profile: WorkerDashboardProfile): FormState {
  return {
    workerType: profile.worker_type,
    firstName: profile.first_name ?? "",
    lastName: profile.last_name ?? "",
    companyName: profile.company_name ?? "",
    phone: profile.phone_number,
    email: profile.email,
    yearsOfExperience:
      profile.years_of_experience != null ? String(profile.years_of_experience) : "",
    district: resolveDistrictSelectValue(profile.district),
    areasServed: profile.areas_served ?? "",
    about: profile.about ?? "",
    categoryIds: [...profile.category_ids],
    subcategoryIds: [...profile.subcategory_ids],
  }
}

function ProfileCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_2px_10px_rgb(11_60_93_/_0.04)] sm:p-6",
        className
      )}
    >
      {children}
    </section>
  )
}

export function WorkerProfileDashboardClient() {
  const router = useRouter()
  const [profile, setProfile] = useState<WorkerDashboardProfile | null>(null)
  const [form, setForm] = useState<FormState | null>(null)
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getMyWorkerProfile()
      setProfile(result.profile)
      setForm(profileToForm(result.profile))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not load your worker profile."
      setError(message)
      setProfile(null)
      setForm(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProfile()
  }, [loadProfile])

  useEffect(() => {
    let cancelled = false
    async function loadCategories() {
      try {
        setCategoriesLoading(true)
        const result = await getServiceCategories()
        if (!cancelled) setCategories(result)
      } catch (err) {
        console.error("Dashboard categories:", err)
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }
    void loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  const categoryItems = useMemo(
    () => categories.map((c) => ({ id: c.id, name: c.name })),
    [categories]
  )

  const subcategoryItems = useMemo(() => {
    if (!form) return []
    return categories
      .filter((c) => form.categoryIds.includes(c.id))
      .flatMap((c) => c.subcategories.map((s) => ({ id: s.id, name: s.name })))
  }, [categories, form])

  const toggleCategory = (categoryId: string) => {
    setForm((prev) => {
      if (!prev) return prev
      if (prev.categoryIds.includes(categoryId)) {
        const category = categories.find((c) => c.id === categoryId)
        const subIds = new Set(category?.subcategories.map((s) => s.id) ?? [])
        return {
          ...prev,
          categoryIds: prev.categoryIds.filter((id) => id !== categoryId),
          subcategoryIds: prev.subcategoryIds.filter((id) => !subIds.has(id)),
        }
      }
      return { ...prev, categoryIds: [...prev.categoryIds, categoryId] }
    })
  }

  const toggleSubcategory = (subcategoryId: string) => {
    setForm((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        subcategoryIds: prev.subcategoryIds.includes(subcategoryId)
          ? prev.subcategoryIds.filter((id) => id !== subcategoryId)
          : [...prev.subcategoryIds, subcategoryId],
      }
    })
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace(AUTH_PATHS.login)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not sign out.")
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!form || !profile) return

    if (!form.phone.trim()) {
      toast.error("Phone number is required.")
      return
    }
    if (!form.email.trim()) {
      toast.error("Email is required.")
      return
    }
    if (form.workerType === "Individual" && (!form.firstName.trim() || !form.lastName.trim())) {
      toast.error("First and last name are required.")
      return
    }
    if (form.workerType === "Company" && !form.companyName.trim()) {
      toast.error("Company name is required.")
      return
    }
    if (!form.district) {
      toast.error("Please select your district.")
      return
    }
    if (form.categoryIds.length === 0) {
      toast.error("Select at least one category.")
      return
    }
    if (form.subcategoryIds.length === 0) {
      toast.error("Select at least one subcategory.")
      return
    }
    if (!form.about.trim()) {
      toast.error("Please add a short bio.")
      return
    }

    const yearsRaw = form.yearsOfExperience.trim()
    let years: number | null = null
    if (yearsRaw) {
      const parsed = Number.parseInt(yearsRaw, 10)
      if (Number.isNaN(parsed) || parsed < 0) {
        toast.error("Use a whole number for years of experience.")
        return
      }
      years = parsed
    }

    setSaving(true)
    try {
      const result = await updateMyWorkerProfile({
        worker_type: form.workerType,
        first_name: form.workerType === "Individual" ? form.firstName.trim() : null,
        last_name: form.workerType === "Individual" ? form.lastName.trim() : null,
        company_name: form.workerType === "Company" ? form.companyName.trim() : null,
        phone_number: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        years_of_experience: years,
        district: districtLabelForApi(form.district),
        areas_served: form.areasServed.trim() || null,
        about: form.about.trim(),
        category_ids: form.categoryIds,
        subcategory_ids: form.subcategoryIds,
      })
      setProfile(result.profile)
      setForm(profileToForm(result.profile))
      toast.success(result.message || "Profile updated successfully.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className={`${siteContainer} flex items-center justify-center gap-2 py-24 text-muted-foreground`}>
        <Loader2 className="h-5 w-5 animate-spin text-teal" aria-hidden />
        Loading your profile…
      </div>
    )
  }

  if (error || !profile || !form) {
    return (
      <div className={`${siteContainer} py-16 text-center`}>
        <p className="font-medium text-foreground">Could not load profile</p>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={() => void loadProfile()} variant="outline">
            Try again
          </Button>
          <Button onClick={() => void handleSignOut()} variant="ghost">
            Sign out
          </Button>
        </div>
      </div>
    )
  }

  const displayName = profile.display_name?.trim() || "Worker"
  const planPeriod = planKpiPeriod(profile)

  return (
    <>
      <div className={`${siteContainer} py-8 sm:py-10`}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">My worker profile</h1>
            <p className="mt-1 text-muted-foreground">
              Update how customers find and contact you on ZotServis.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link href={workerProfilePath(profile.id)} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden />
                View public profile
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => void handleSignOut()}
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out
            </Button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProfileCard>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Rating
            </p>
            <p className="mt-1 flex items-center gap-1 text-xl font-semibold text-foreground">
              <Star className="h-5 w-5 fill-gold text-gold" aria-hidden />
              {profile.average_rating.toFixed(1)}
            </p>
          </ProfileCard>
          <ProfileCard>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Reviews
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">{profile.total_reviews}</p>
          </ProfileCard>
          <ProfileCard>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Verification
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              {profile.is_verified ? (
                <>
                  <BadgeCheck className="h-4 w-4 text-accent" aria-hidden />
                  Verified
                </>
              ) : (
                profile.verification_status
              )}
            </p>
          </ProfileCard>
          <ProfileCard>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Plan
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {planKpiTitle(profile)}
            </p>
            {planPeriod ? (
              <p className="mt-1 text-xs leading-snug text-muted-foreground">
                {planPeriod}
              </p>
            ) : null}
          </ProfileCard>
        </div>

        <ProfileCard className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{displayName}</h2>
              <p className="text-sm text-muted-foreground">
                Share your review link so customers can leave feedback.
              </p>
            </div>
            <WorkerReviewActions reviewToken={profile.review_token} />
          </div>
        </ProfileCard>

        <form onSubmit={handleSubmit}>
          <ProfileCard className="space-y-8">
            <div>
              <h2 className="mb-1 text-lg font-semibold text-foreground">Personal information</h2>
              <p className="mb-5 text-sm text-muted-foreground">
                How you appear on your public profile and how customers reach you.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-3 sm:col-span-2">
                  <Label id="worker-type-label" className="text-sm font-medium">
                    Registering as <RequiredStar />
                  </Label>
                  <RadioGroup
                    value={form.workerType}
                    onValueChange={(value) =>
                      setForm((prev) =>
                        prev ? { ...prev, workerType: value as WorkerType } : prev
                      )
                    }
                    className="grid gap-3 sm:grid-cols-2"
                    aria-labelledby="worker-type-label"
                  >
                    <label
                      htmlFor="dash-individual"
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                        form.workerType === "Individual"
                          ? "border-teal bg-teal/5 ring-2 ring-teal/20"
                          : "border-border bg-background hover:bg-muted/40"
                      )}
                    >
                      <RadioGroupItem value="Individual" id="dash-individual" className="mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Individual</span>
                        <p className="mt-0.5 text-xs text-muted-foreground">Solo tradesperson</p>
                      </div>
                    </label>
                    <label
                      htmlFor="dash-company"
                      className={cn(
                        "flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors",
                        form.workerType === "Company"
                          ? "border-teal bg-teal/5 ring-2 ring-teal/20"
                          : "border-border bg-background hover:bg-muted/40"
                      )}
                    >
                      <RadioGroupItem value="Company" id="dash-company" className="mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Company</span>
                        <p className="mt-0.5 text-xs text-muted-foreground">Business or team</p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                {form.workerType === "Individual" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="firstName">
                        First name <RequiredStar />
                      </Label>
                      <Input
                        id="firstName"
                        className="h-11"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm((prev) => (prev ? { ...prev, firstName: e.target.value } : prev))
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">
                        Last name <RequiredStar />
                      </Label>
                      <Input
                        id="lastName"
                        className="h-11"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm((prev) => (prev ? { ...prev, lastName: e.target.value } : prev))
                        }
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="companyName">
                      Company name <RequiredStar />
                    </Label>
                    <Input
                      id="companyName"
                      className="h-11"
                      value={form.companyName}
                      onChange={(e) =>
                        setForm((prev) =>
                          prev ? { ...prev, companyName: e.target.value } : prev
                        )
                      }
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone / WhatsApp <RequiredStar />
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="h-11"
                    placeholder={PHONE_INPUT_PLACEHOLDER}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, phone: e.target.value } : prev))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <RequiredStar />
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-11"
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-1 text-lg font-semibold text-foreground">Services & location</h2>
              <p className="mb-5 text-sm text-muted-foreground">
                Categories and areas you cover in Mauritius.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label id="dash-categories">
                    Categories <RequiredStar />
                  </Label>
                  {categoriesLoading ? (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Loading categories…
                    </p>
                  ) : (
                    <SelectionPills
                      items={categoryItems}
                      selectedIds={form.categoryIds}
                      onToggle={toggleCategory}
                      labelId="dash-categories"
                    />
                  )}
                </div>

                {form.categoryIds.length > 0 && (
                  <div className="space-y-2 sm:col-span-2">
                    <Label id="dash-subcategories">
                      Subcategories <RequiredStar />
                    </Label>
                    {subcategoryItems.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No subcategories for selected categories.
                      </p>
                    ) : (
                      <SelectionPills
                        items={subcategoryItems}
                        selectedIds={form.subcategoryIds}
                        onToggle={toggleSubcategory}
                        labelId="dash-subcategories"
                      />
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="years">
                    Years of experience <RequiredStar />
                  </Label>
                  <Input
                    id="years"
                    type="number"
                    min={0}
                    className="h-11"
                    value={form.yearsOfExperience}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev ? { ...prev, yearsOfExperience: e.target.value } : prev
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">
                    District <RequiredStar />
                  </Label>
                  <Select
                    value={form.district || undefined}
                    onValueChange={(value) =>
                      setForm((prev) => (prev ? { ...prev, district: value } : prev))
                    }
                  >
                    <SelectTrigger id="district" className="h-11 w-full">
                      <SelectValue placeholder="Select district" />
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
                  <Label htmlFor="areasServed">Areas served</Label>
                  <Input
                    id="areasServed"
                    className="h-11"
                    placeholder="e.g. Curepipe, Vacoas, Phoenix"
                    value={form.areasServed}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev ? { ...prev, areasServed: e.target.value } : prev
                      )
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="about">
                    Short bio / description <RequiredStar />
                  </Label>
                  <Textarea
                    id="about"
                    rows={5}
                    value={form.about}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, about: e.target.value } : prev))
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {profile.categories.length > 0 && (
              <div className="rounded-xl border border-teal/20 bg-muted/20 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Saved on profile
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.categories.map((c) => (
                    <Badge key={c.id} variant="outline">
                      {c.name}
                    </Badge>
                  ))}
                  {profile.subcategories.map((s) => (
                    <Badge key={s.id} variant="secondary">
                      {s.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={saving}
                onClick={() => setForm(profileToForm(profile))}
              >
                Reset changes
              </Button>
              <Button type="submit" disabled={saving} className="min-w-[10rem]">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Saving…
                  </>
                ) : (
                  "Save profile"
                )}
              </Button>
            </div>
          </ProfileCard>
        </form>
      </div>
    </>
  )
}
