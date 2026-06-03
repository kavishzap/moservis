import { encodedInvoke } from "@/lib/encoded-function"

export type ServiceSubcategory = {
  id: string
  name: string
  slug: string
  description: string | null
}

export type ServiceCategory = {
  id: string
  name: string
  slug: string
  description: string | null
  subcategories: ServiceSubcategory[]
}

type GetServiceCategoriesResult = {
  success: boolean
  categories: ServiceCategory[]
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const result = await encodedInvoke<
    Record<string, never>,
    GetServiceCategoriesResult
  >("get-service-categories", {})

  return result.categories || []
}
