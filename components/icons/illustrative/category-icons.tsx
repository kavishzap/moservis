import type { ComponentType, ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { ServiceTypeValue } from "@/lib/search-options"

const stroke = "#2a3640"
const sw = 2

type SvgProps = { className?: string }

function IconSvg({ className, children }: SvgProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={cn("h-full w-full", className)} aria-hidden>
      {children}
    </svg>
  )
}

export function ElectricianIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <rect x="16" y="10" width="16" height="22" rx="3" fill="#f3e2c8" stroke={stroke} strokeWidth={sw} />
      <path d="M22 18h4M22 22h4M22 26h4" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
      <path
        d="M24 6v4M18 8l2 3.5M30 8l-2 3.5"
        stroke="#e8b84a"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path d="M10 34h28" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <circle cx="14" cy="34" r="2" fill="#8eb8c9" stroke={stroke} strokeWidth={1.4} />
      <circle cx="34" cy="34" r="2" fill="#8eb8c9" stroke={stroke} strokeWidth={1.4} />
    </IconSvg>
  )
}

export function PlumberIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M14 14h8v10c0 4-2 6-4 6s-4-2-4-6V14z"
        fill="#8eb8c9"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M22 20h10v4H22z" fill="#d9a07a" stroke={stroke} strokeWidth={sw} />
      <path d="M32 16v12" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <path
        d="M30 32c0 3 2 5 4 5h6"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <circle cx="36" cy="12" r="4" fill="#c9e9f5" stroke={stroke} strokeWidth={1.6} />
      <path d="M34 12h4M36 10v4" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
    </IconSvg>
  )
}

export function CleanerIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M14 22h14l-2 16H16l-2-16z"
        fill="#8eb8c9"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <ellipse cx="21" cy="20" rx="9" ry="3" fill="#6aa3b8" stroke={stroke} strokeWidth={sw} />
      <circle cx="16" cy="14" r="2" fill="#fff" stroke={stroke} strokeWidth={1.4} />
      <circle cx="22" cy="11" r="2.5" fill="#fff" stroke={stroke} strokeWidth={1.4} />
      <circle cx="28" cy="14" r="1.8" fill="#fff" stroke={stroke} strokeWidth={1.4} />
      <path
        d="M30 12l10 28"
        stroke="#d9a07a"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path
        d="M36 38l4 4"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </IconSvg>
  )
}

export function GardenerIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <ellipse cx="18" cy="36" rx="10" ry="4" fill="#d9a07a" stroke={stroke} strokeWidth={sw} />
      <path
        d="M18 36V24c0-6 4-10 0-14"
        stroke="#7cb88a"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path
        d="M18 18c4 2 6 0 8-4"
        stroke="#7cb88a"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M30 34l10-8 4 4-10 8-4-4z"
        fill="#f3e2c8"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M34 30l6 6" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </IconSvg>
  )
}

export function PainterIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <rect x="10" y="28" width="14" height="10" rx="2" fill="#d4846f" stroke={stroke} strokeWidth={sw} />
      <path d="M12 28V18h10v10" fill="#f3e2c8" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <path
        d="M28 10v26"
        stroke="#d9a07a"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <rect x="24" y="8" width="12" height="8" rx="2" fill="#8eb8c9" stroke={stroke} strokeWidth={sw} />
      <path d="M26 12h8" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
    </IconSvg>
  )
}

export function CarpenterIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M12 34h24l-4-8H16l-4 8z"
        fill="#d9a07a"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M28 12l12 12-4 4-12-12 4-4z"
        fill="#f3e2c8"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M24 20l4 4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <rect x="10" y="34" width="28" height="4" rx="1" fill="#c49a6c" stroke={stroke} strokeWidth={1.6} />
    </IconSvg>
  )
}

export function MasonIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <rect x="12" y="18" width="10" height="6" fill="#d4846f" stroke={stroke} strokeWidth={sw} />
      <rect x="22" y="18" width="10" height="6" fill="#e8b070" stroke={stroke} strokeWidth={sw} />
      <rect x="17" y="26" width="10" height="6" fill="#d4846f" stroke={stroke} strokeWidth={sw} />
      <rect x="27" y="26" width="10" height="6" fill="#e8b070" stroke={stroke} strokeWidth={sw} />
      <rect x="12" y="34" width="10" height="6" fill="#e8b070" stroke={stroke} strokeWidth={sw} />
      <rect x="22" y="34" width="10" height="6" fill="#d4846f" stroke={stroke} strokeWidth={sw} />
      <path
        d="M34 14l8 20"
        stroke="#d9a07a"
        strokeWidth={2.4}
        strokeLinecap="round"
      />
      <path d="M30 32l12 4" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </IconSvg>
  )
}

export function HandymanIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M14 30l12-12 6 6-12 12-6-6z"
        fill="#d9a07a"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M26 18l10-6 4 4-10 6-4-4z"
        fill="#f3e2c8"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <circle cx="34" cy="34" r="6" fill="#8eb8c9" stroke={stroke} strokeWidth={sw} />
      <path d="M34 30v8M30 34h8" stroke={stroke} strokeWidth={1.8} strokeLinecap="round" />
    </IconSvg>
  )
}

export function AcTechnicianIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <rect x="10" y="16" width="28" height="18" rx="3" fill="#f3e2c8" stroke={stroke} strokeWidth={sw} />
      <path d="M14 22h20M14 28h20" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
      <circle cx="34" cy="25" r="2" fill="#8eb8c9" stroke={stroke} strokeWidth={1.4} />
      <path
        d="M18 10c2-4 6-6 6-6s4 2 6 6"
        stroke="#8eb8c9"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M24 10c2-4 6-6 6-6s4 2 6 6"
        stroke="#8eb8c9"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </IconSvg>
  )
}

export function MechanicIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M10 30h28l-2-8H12l-2 8z"
        fill="#8eb8c9"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <rect x="14" y="22" width="20" height="8" rx="2" fill="#f3e2c8" stroke={stroke} strokeWidth={sw} />
      <circle cx="16" cy="32" r="3" fill="#2a3640" stroke={stroke} strokeWidth={1.4} />
      <circle cx="32" cy="32" r="3" fill="#2a3640" stroke={stroke} strokeWidth={1.4} />
      <path
        d="M30 14l8 6-2 2-8-6 2-2z"
        fill="#d9a07a"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </IconSvg>
  )
}

export function MoreCategoriesIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <circle cx="24" cy="24" r="14" fill="#f4a300" stroke={stroke} strokeWidth={sw} />
      <path d="M24 16v16M16 24h16" stroke="#fff" strokeWidth={2.8} strokeLinecap="round" />
    </IconSvg>
  )
}

function PersonalCareIllustration(props: SvgProps) {
  return (
    <IconSvg {...props}>
      <path
        d="M24 12c-6 0-10 4-10 9 0 7 10 15 10 15s10-8 10-15c0-5-4-9-10-9z"
        fill="#d4846f"
        stroke={stroke}
        strokeWidth={sw}
      />
      <circle cx="20" cy="20" r="2" fill="#f3e2c8" stroke={stroke} strokeWidth={1.4} />
      <circle cx="24" cy="17" r="2.2" fill="#f3e2c8" stroke={stroke} strokeWidth={1.4} />
      <circle cx="28" cy="20" r="2" fill="#f3e2c8" stroke={stroke} strokeWidth={1.4} />
    </IconSvg>
  )
}

/** Pool of illustrations — one is picked per category id (stable pseudo-random). */
export const CATEGORY_ILLUSTRATION_POOL = [
  ElectricianIllustration,
  PlumberIllustration,
  CleanerIllustration,
  GardenerIllustration,
  PainterIllustration,
  CarpenterIllustration,
  MasonIllustration,
  HandymanIllustration,
  AcTechnicianIllustration,
  MechanicIllustration,
  PersonalCareIllustration,
] as const

function illustrationIndexForSeed(seed: string, poolSize: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % poolSize
}

export function CategoryIllustrationBySeed({
  seed,
  className,
}: {
  seed: string
  className?: string
}) {
  const index = illustrationIndexForSeed(seed, CATEGORY_ILLUSTRATION_POOL.length)
  const Icon = CATEGORY_ILLUSTRATION_POOL[index] ?? HandymanIllustration
  return <Icon className={className} />
}

const CATEGORY_ILLUSTRATIONS: Record<ServiceTypeValue, ComponentType<SvgProps>> = {
  electrician: ElectricianIllustration,
  plumber: PlumberIllustration,
  cleaner: CleanerIllustration,
  gardener: GardenerIllustration,
  painter: PainterIllustration,
  carpenter: CarpenterIllustration,
  mason: MasonIllustration,
  handyman: HandymanIllustration,
  "ac-technician": AcTechnicianIllustration,
  mechanic: MechanicIllustration,
  welder: HandymanIllustration,
  "appliance-repair": HandymanIllustration,
  "cctv-installer": ElectricianIllustration,
  housemaid: CleanerIllustration,
  babysitter: PersonalCareIllustration,
  "waste-transportation": MechanicIllustration,
  other: MoreCategoriesIllustration,
}

export function CategoryIllustration({
  category,
  className,
}: {
  category: ServiceTypeValue
  className?: string
}) {
  const Icon = CATEGORY_ILLUSTRATIONS[category] ?? HandymanIllustration
  return <Icon className={className} />
}
