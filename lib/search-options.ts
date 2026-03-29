/** Service / job types — single source of truth. `value` is used in ?category= and form state. */
export const SERVICE_TYPES = [
  { label: "Electrician", value: "electrician" },
  { label: "Plumber", value: "plumber" },
  { label: "Cleaner", value: "cleaner" },
  { label: "Gardener", value: "gardener" },
  { label: "Painter", value: "painter" },
  { label: "Carpenter", value: "carpenter" },
  { label: "Mason", value: "mason" },
  { label: "Handyman", value: "handyman" },
  { label: "AC Technician", value: "ac-technician" },
  { label: "Mechanic", value: "mechanic" },
  { label: "Welder", value: "welder" },
  { label: "Appliance Repair", value: "appliance-repair" },
  { label: "CCTV Installer", value: "cctv-installer" },
  { label: "Housemaid", value: "housemaid" },
  { label: "Babysitter", value: "babysitter" },
  { label: "Other", value: "other" },
] as const

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number]["value"]

/** Subset shown on the home “Browse by Category” grid (same slugs as search). */
export const BROWSE_CATEGORY_ORDER: readonly ServiceTypeValue[] = [
  "electrician",
  "plumber",
  "cleaner",
  "gardener",
  "painter",
  "carpenter",
  "mason",
  "handyman",
  "ac-technician",
  "mechanic",
]

/** Mauritius districts — use labels in UI, values in URLs (?location=) */
export const MAURITIUS_DISTRICTS = [
  { label: "Port Louis (Capital)", value: "port-louis" },
  { label: "Pamplemousses", value: "pamplemousses" },
  { label: "Rivière du Rempart", value: "riviere-du-rempart" },
  { label: "Flacq", value: "flacq" },
  { label: "Moka", value: "moka" },
  { label: "Plaines Wilhems", value: "plaines-wilhems" },
  { label: "Black River (Rivière Noire)", value: "black-river" },
  { label: "Grand Port", value: "grand-port" },
  { label: "Savanne", value: "savanne" },
] as const
