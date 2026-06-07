"use client"

import { useRef, useState } from "react"
import { toast } from "@/lib/toast"
import { Camera, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { WorkerAvatar } from "@/components/worker/worker-avatar"
import {
  compressProfileImage,
  ProfileImageError,
} from "@/lib/compress-profile-image"
import { cn } from "@/lib/utils"

type ProfilePhotoUploadProps = {
  profileImage: string | null
  initials: string
  onChange: (value: string | null) => void
  disabled?: boolean
}

export function ProfilePhotoUpload({
  profileImage,
  initials,
  onChange,
  disabled = false,
}: ProfilePhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [compressing, setCompressing] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    setCompressing(true)
    try {
      const compressed = await compressProfileImage(file)
      onChange(compressed)
    } catch (err) {
      const message =
        err instanceof ProfileImageError
          ? err.message
          : "Could not process this image."
      toast.error(message)
    } finally {
      setCompressing(false)
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Profile photo</Label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <WorkerAvatar
          profileImage={profileImage}
          initials={initials}
          className={cn(
            "h-20 w-20 text-xl",
            compressing && "opacity-60",
          )}
        />

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="sr-only"
            disabled={disabled || compressing}
            onChange={(event) => void handleFileChange(event)}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={disabled || compressing}
            onClick={() => inputRef.current?.click()}
          >
            {compressing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Compressing…
              </>
            ) : (
              <>
                <Camera className="h-4 w-4" aria-hidden />
                {profileImage ? "Change photo" : "Upload photo"}
              </>
            )}
          </Button>
          {profileImage ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
              disabled={disabled || compressing}
              onClick={() => onChange(null)}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
              Remove
            </Button>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        JPG, PNG, or WebP up to 5 MB. We resize and compress it for a small avatar.
      </p>
    </div>
  )
}
