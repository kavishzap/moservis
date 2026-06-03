/** Section title lands ~25% from the top (3/4 from the bottom of the viewport). */
const SECTION_VIEWPORT_ANCHOR = 0.25

let skipNextHashScroll = false

/** Logo / home nav — land on `/` without restoring a previous section hash. */
export function markSkipNextHashScroll() {
  skipNextHashScroll = true
}

export function consumeSkipNextHashScroll(): boolean {
  if (!skipNextHashScroll) return false
  skipNextHashScroll = false
  return true
}

function replaceUrlHash(id: string) {
  const base = `${window.location.pathname}${window.location.search}`
  window.history.replaceState(null, "", `${base}#${id}`)
}

/** Scroll to a page section with the heading slightly above vertical center. */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id)
  if (!el) return false

  const rect = el.getBoundingClientRect()
  const absoluteTop = rect.top + window.scrollY
  const viewportHeight = window.innerHeight
  const anchorFromTop = viewportHeight * SECTION_VIEWPORT_ANCHOR

  let top = absoluteTop - anchorFromTop
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight)
  top = Math.max(0, Math.min(top, maxScroll))

  window.scrollTo({ top, behavior })

  if (window.location.pathname === "/" && window.location.hash !== `#${id}`) {
    replaceUrlHash(id)
  }

  return true
}

/** Retry scroll until the target exists (e.g. after client navigation to `/`). */
export function scrollToSectionWhenReady(
  id: string,
  options: { behavior?: ScrollBehavior; maxAttempts?: number; intervalMs?: number } = {},
) {
  const { behavior = "smooth", maxAttempts = 12, intervalMs = 50 } = options
  let attempts = 0

  const tryScroll = () => {
    if (scrollToSection(id, behavior)) return
    attempts += 1
    if (attempts < maxAttempts) {
      window.setTimeout(tryScroll, intervalMs)
    }
  }

  tryScroll()
}
