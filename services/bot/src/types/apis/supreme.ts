export interface SupremeSiteInfoResponse {
  unique_image_url_prefixes: any[]
  products_and_categories: { [key: string]: SupremeProductsAndCategory[] }
  last_mobile_api_update: Date
  release_date: string
  release_week: string
}

export interface SupremeProductsAndCategory {
  name: string
  id: number
  image_url: string
  image_url_hi: string
  price: number
  sale_price: number
  new_item: boolean
  position: number
  category_name: string
}

export interface SupremeProductInfoResponse {
  styles: Style[]
  description: string
  can_add_styles: boolean
  can_buy_multiple: boolean
  ino: string
  cod_blocked: boolean
  canada_blocked: boolean
  purchasable_qty: number
  special_purchasable_qty: any[]
  new_item: boolean
  apparel: boolean
  handling: number
  no_free_shipping: boolean
  can_buy_multiple_with_limit: number
}

export interface Style {
  id: number
  name: string
  currency: string
  description: null
  image_url: string
  image_url_hi: string
  swatch_url: string
  swatch_url_hi: string
  mobile_zoomed_url: string
  mobile_zoomed_url_hi: string
  bigger_zoomed_url: string
  sizes: Size[]
  additional: any[]
}

export interface Size {
  name: string
  id: number
  stock_level: number
}
