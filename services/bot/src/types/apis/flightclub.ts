export interface FlightClubResponse {
  hits: Hit[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  processingTimeMS: number
  facets: Record<string, any>
  exhaustiveFacetsCount: boolean
  exhaustiveNbHits: boolean
  query: Record<string, any>
  params: string
}

export interface Hit {
  name: string
  url: string
  visibility_search: number
  visibility_catalog: number
  categories: HitCategories
  categories_without_path: string[]
  thumbnail_url: string
  image_url: string
  in_stock: number
  brand: string
  sku: string[]
  style: string
  price: { [key: string]: HitPrice }
  product_year: number
  created_at: Date
  tag_subclass: string
  tag_division: string
  tag_dept: string
  available_conditions: string[]
  sizegroup_men: string[]
  sizegroup_hats: string[]
  type_id: string
  algoliaLastUpdateAtCET: Date
  objectID: string
  _highlightResult: HighlightResult
  shoe_color?: string[] | string
  upc?: string[]
  sales_count?: number
}

export interface HighlightResult {
  name: Brand
  categories: HighlightResultCategories
  categories_without_path: Brand[]
  brand: Brand
  sku: Brand[]
  style: Brand
  price: { [key: string]: HighlightResultPrice }
  product_year: Brand
  created_at: Brand
  tag_subclass: Brand
  tag_division: Brand
  tag_dept: Brand
  shoe_color?: Brand[] | Brand
  upc?: Brand[]
}

export interface Brand {
  value: string
  matchLevel: Record<string, any>
  fullyHighlighted?: boolean
  matchedWords: string[]
}

export interface HighlightResultCategories {
  level0: Brand[]
  level1: Brand[]
}

export interface HighlightResultPrice {
  default: Brand
  default_formated: Brand
}

export interface HitCategories {
  level0: string[]
  level1: string[]
}

export interface HitPrice {
  default: number
  default_formated: string
  special_from_date: boolean
  special_to_date: boolean
}
