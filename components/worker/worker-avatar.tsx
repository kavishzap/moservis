import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type WorkerAvatarProps = {
  profileImage?: string | null
  initials: string
  className?: string
  fallbackClassName?: string
  loading?: "lazy" | "eager"
}

export function WorkerAvatar({
  profileImage,
  initials,
  className,
  fallbackClassName,
  loading = "eager",
}: WorkerAvatarProps) {
  return (
    <Avatar className={className}>
      {profileImage ? (
        <AvatarImage
          src={profileImage}
          alt=""
          loading={loading}
          decoding="async"
          className="object-cover"
        />
      ) : null}
      <AvatarFallback className={cn("bg-teal text-white", fallbackClassName)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
