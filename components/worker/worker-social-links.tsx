import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

type SocialLinks = {
  facebook_url: string | null
  instagram_url: string | null
  tiktok_url: string | null
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

export function WorkerSocialLinks({ links }: { links: SocialLinks }) {
  const items = [
    { href: links.facebook_url, label: "Facebook", icon: Facebook },
    { href: links.instagram_url, label: "Instagram", icon: Instagram },
    { href: links.tiktok_url, label: "TikTok", icon: TikTokIcon },
  ].filter((item) => item.href?.trim())

  if (items.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-muted/30 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-teal/45 hover:bg-muted/50"
        >
          <Icon className="h-4 w-4 shrink-0 text-teal" aria-hidden />
          {label}
        </Link>
      ))}
    </div>
  )
}
