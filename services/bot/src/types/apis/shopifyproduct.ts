export interface ShopifyProductInfoResponse {
  id: number
  title: string
  handle: string
  description: string
  published_at: Date
  created_at: Date
  vendor: string
  type: string
  tags: string[]
  price: number
  price_min: number
  price_max: number
  available: boolean
  price_varies: boolean
  compare_at_price: null
  compare_at_price_min: number
  compare_at_price_max: number
  compare_at_price_varies: boolean
  variants: Variant[]
  images: string[]
  featured_image: string
  options: Option[]
  url: string
  media: Media[]
}

export interface Media {
  alt: null
  id: number
  position: number
  preview_image: PreviewImage
  aspect_ratio: number
  height: number
  media_type: string
  src: string
  width: number
}

export interface PreviewImage {
  aspect_ratio: number
  height: number
  width: number
  src: string
}

export interface Option {
  name: string
  position: number
  values: string[]
}

export interface Variant {
  id: number
  title: string
  option1: string
  option2: null
  option3: null
  sku: string
  requires_shipping: boolean
  taxable: boolean
  featured_image: null
  available: boolean
  name: string
  public_title: string
  options: string[]
  price: number
  weight: number
  compare_at_price: null
  inventory_management: string
  barcode: null
}
