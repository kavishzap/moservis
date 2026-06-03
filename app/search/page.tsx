import { redirect } from "next/navigation"

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** Legacy `/search` URLs — browse workers at `/worker`. */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(sp)) {
    if (value === undefined) continue
    if (Array.isArray(value)) {
      for (const entry of value) {
        if (entry) query.append(key, entry)
      }
    } else if (value) {
      query.set(key, value)
    }
  }

  const q = query.toString()
  redirect(q ? `/worker?${q}` : "/worker")
}
