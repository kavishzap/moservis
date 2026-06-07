"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export type SocialLinksForm = {
  facebookUrl: string
  instagramUrl: string
  tiktokUrl: string
}

type SocialLinksFieldsProps = {
  value: SocialLinksForm
  onChange: (value: SocialLinksForm) => void
  disabled?: boolean
}

const FIELDS: {
  key: keyof SocialLinksForm
  id: string
  label: string
  placeholder: string
}[] = [
  {
    key: "facebookUrl",
    id: "facebookUrl",
    label: "Facebook",
    placeholder: "https://facebook.com/your-page",
  },
  {
    key: "instagramUrl",
    id: "instagramUrl",
    label: "Instagram",
    placeholder: "https://instagram.com/your-handle",
  },
  {
    key: "tiktokUrl",
    id: "tiktokUrl",
    label: "TikTok",
    placeholder: "https://tiktok.com/@your-handle",
  },
]

export function SocialLinksFields({
  value,
  onChange,
  disabled = false,
}: SocialLinksFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">Social media links</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Optional links shown on your public profile.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, id, label, placeholder }) => (
          <div key={key} className="space-y-2 sm:col-span-2 lg:col-span-1">
            <Label htmlFor={id}>{label}</Label>
            <Input
              id={id}
              type="url"
              className="h-11"
              placeholder={placeholder}
              value={value[key]}
              disabled={disabled}
              onChange={(event) =>
                onChange({ ...value, [key]: event.target.value })
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}
