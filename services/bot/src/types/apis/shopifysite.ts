export interface ShopifySiteInfoResponse {
  id: number
  name: string
  city: string
  province: string
  country: string
  currency: string
  domain: string
  url: string
  myshopify_domain: string
  description: string
  ships_to_countries: string[]
  money_format: string
  published_collections_count: number
  published_products_count: number
}
