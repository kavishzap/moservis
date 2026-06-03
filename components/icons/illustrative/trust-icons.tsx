import { cn } from "@/lib/utils"

const stroke = "#2a3640"
const sw = 2.2

type SvgProps = { className?: string }

export function TrustedExpertsIllustration({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-full w-full", className)} aria-hidden>
      <path
        d="M10 36h44v14H10z"
        fill="#d9a07a"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M16 36V26l16-12 16 12v10"
        fill="#f3e2c8"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M30 36h4v10h-4z" fill="#8eb8c9" stroke={stroke} strokeWidth={sw} />
      <path
        d="M20 44c3-4 7-6 12-6s9 2 12 6"
        fill="#e8c4a0"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M22 44c2-2 5-3 10-3s8 1 10 3M42 44c-2-2-5-3-10-3"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M28 46h8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  )
}

export function CommunityFocusIllustration({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-full w-full", className)} aria-hidden>
      <path
        d="M14 42c0-10 8-16 18-16s18 6 18 16"
        fill="#f3e2c8"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M20 42c4-6 8-9 12-9s8 3 12 9"
        fill="#e8c4a0"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <path
        d="M32 20c-7 0-12 5-12 11 0 8 12 17 12 17s12-9 12-17c0-6-5-11-12-11z"
        fill="#d4846f"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <circle cx="28" cy="30" r="2.5" fill="#f3e2c8" stroke={stroke} strokeWidth={1.6} />
      <circle cx="32" cy="27" r="2.8" fill="#f3e2c8" stroke={stroke} strokeWidth={1.6} />
      <circle cx="36" cy="30" r="2.5" fill="#f3e2c8" stroke={stroke} strokeWidth={1.6} />
      <path
        d="M27 33h10"
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SimpleTransparentIllustration({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-full w-full", className)} aria-hidden>
      <path
        d="M32 12L17 21v15c0 11 7 17 15 20 8-3 15-9 15-20V21L32 12z"
        fill="#8eb8c9"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M25 33l5 6 9-11"
        stroke="#fff"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="43" r="12" fill="#f3e2c8" stroke={stroke} strokeWidth={sw} />
      <path d="M47 37v10M41 43h12" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      <circle cx="47" cy="43" r="1.5" fill={stroke} />
      <path
        d="M26 48l6 4"
        stroke="#7cb88a"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
}
