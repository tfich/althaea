export interface GoatResponse {
  hits: GoatHit[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  processingTimeMS: number
  facets: GoatFacets
  facets_stats: GoatFacetsStats
  exhaustiveFacetsCount: boolean
  exhaustiveNbHits: boolean
  query: string
  params: string
}

export interface GoatFacets {
  color: { [key: string]: number }
  gender: GoatGender
  status: GoatStatus
  midsole: GoatMidsole
  brand_id: { [key: string]: number }
  category: GoatCategory
  designer: GoatDesigner
  brand_name: GoatFacetsBrandName
  silhouette: { [key: string]: number }
  upper_material: GoatUpperMaterial
  available_sizes: { [key: string]: number }
  show_on_homepage: GoatShowOnHomepage
  available_sizes_new_clean: { [key: string]: number }
  available_sizes_used_clean: { [key: string]: number }
  available_sizes_new_v2_clean: { [key: string]: number }
}

export interface GoatFacetsBrandName {
  adidas: number
  Yeezy: number
  Nike: number
  'Louis Vuitton': number
  Other: number
  'A Bathing Ape': number
}

export interface GoatCategory {
  lifestyle: number
  boot: number
  Other: number
  sandal: number
  basketball: number
  running: number
  cleat: number
}

export interface GoatDesigner {
  'Kanye West': number
  'Bruce Kilgore': number
  'Andreas Harlow': number
  'Dylan Raasch': number
  'Eric Avar': number
  'John Geiger': number
  Nigo: number
  'Tinker Hatfield': number
}

export interface GoatGender {
  men: number
  women: number
  infant: number
  youth: number
}

export interface GoatMidsole {
  Boost: number
  Air: number
  Adiprene: number
}

export interface GoatShowOnHomepage {
  true: number
  false: number
}

export interface GoatStatus {
  active: number
  pending: number
}

export interface GoatUpperMaterial {
  Primeknit: number
  Leather: number
  Suede: number
}

export interface GoatFacetsStats {
  brand_id: GoatAvailableSizes
  available_sizes: GoatAvailableSizes
  available_sizes_new_clean: GoatAvailableSizes
  available_sizes_used_clean: GoatAvailableSizes
  available_sizes_new_v2_clean: GoatAvailableSizes
}

export interface GoatAvailableSizes {
  min: number
  max: number
  avg: number
  sum: number
}

export interface GoatHit {
  id: number
  slug: string
  name: string
  sku: string
  status: string
  color: string
  details: string
  gender: string[]
  brand_id: number
  release_date: Date
  special_type: string
  category: string[]
  search_sku: string
  lowest_price_cents: number
  new_lowest_price_cents: number
  used_lowest_price_cents: number
  available_sizes: number[]
  available_sizes_new: number[][]
  available_sizes_new_v2: string[][]
  available_sizes_used: number[][]
  minimum_offer_cents: number
  maximum_offer_cents: number
  special_display_price_cents: number
  retail_price_cents: number
  silhouette: string
  designer: string
  midsole: string
  nickname: string
  upper_material: string
  internal_shot: string
  with_defect_for_sale_count: number
  available_sizes_new_with_defects: number[][]
  keyword_list: string[]
  trending_purchase_score: number
  picture_url: string
  main_picture_url: string
  grid_picture_url: string
  original_picture_url: string
  product_template_additional_pictures_original_urls: string[]
  single_gender: string
  release_date_unix: number
  trending_timestamp_unix: number
  size_range: number[]
  brand_name: string
  available_sizes_new_clean: number[]
  available_sizes_new_v2_clean: string[]
  available_sizes_used_clean: number[]
  three_day_rolling_want_count: number
  seven_day_rolling_want_count: number
  want_count: number
  own_count: number
  has_picture: boolean
  sort_timestamp_unix: number
  show_on_homepage: boolean
  selling_count: number
  used_for_sale_count: number
  promoted_level: null
  objectID: string
  _highlightResult: GoatHighlightResult
}

export interface GoatHighlightResult {
  name: GoatColorClass
  sku: GoatColorClass
  color: GoatColorClass
  details: GoatColorClass
  gender: GoatColorClass[]
  search_sku: GoatColorClass
  silhouette: GoatColorClass
  designer: GoatColorClass
  midsole: GoatColorClass
  keyword_list: GoatColorClass[]
  brand_name: GoatColorClass
}

export interface GoatColorClass {
  value: string
  matchLevel: GoatMatchLevel
  matchedWords: string[]
  fullyHighlighted?: boolean
}

export enum GoatMatchLevel {
  Full = 'full',
  None = 'none'
}
