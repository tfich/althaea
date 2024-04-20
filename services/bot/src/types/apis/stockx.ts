export interface StockXResponse {
  hits: StockXHit[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  processingTimeMS: number
  facets: StockXFacets
  facets_stats: StockXFacetsStats
  exhaustiveFacetsCount: boolean
  exhaustiveNbHits: boolean
  query: string
  params: string
}

export interface StockXFacets {
  brand: StockXBrand
  gender: StockXGender
  categories: { [key: string]: number }
  lowest_ask: { [key: string]: number }
  quality_bid: { [key: string]: number }
  lock_selling: StockXLockSelling
  'media.imageUrl': { [key: string]: number }
  buying_countries: { [key: string]: number }
  product_category: StockXProductCategory
  selling_countries: { [key: string]: number }
}

export interface StockXBrand {
  adidas: number
  Yeezy: number
  'Kanye West': number
  Nike: number
  'Louis Vuitton': number
  Supreme: number
  BAPE: number
  Jordan: number
}

export interface StockXGender {
  men: number
  women: number
  unisex: number
  infant: number
  child: number
  preschool: number
  toddler: number
}

export interface StockXLockSelling {
  false: number
}

export interface StockXProductCategory {
  sneakers: number
  streetwear: number
}

export interface StockXFacetsStats {
  categories: StockXCategories
  lowest_ask: StockXCategories
  quality_bid: StockXCategories
}

export interface StockXCategories {
  min: number
  max: number
  avg: number
  sum: number
}

export interface StockXHit {
  name: string
  brand: string
  thumbnail_url: string
  media: StockXMedia
  url: string
  release_date: Date
  categories: string[]
  product_category: string
  ticker_symbol: string
  style_id: string
  make: string
  model: string
  short_description: string
  gender: string
  colorway: string
  price: number
  description: string
  highest_bid: number
  total_dollars: number
  lowest_ask: number
  last_sale: number
  sales_last_72: number
  deadstock_sold: number
  quality_bid: number
  active: number
  new_release: number
  lock_selling: boolean
  selling_countries: string[]
  buying_countries: string[]
  traits: StockXTrait[]
  searchable_traits: StockXHitSearchableTraits
  objectID: string
  _highlightResult: StockXHighlightResult
}

export interface StockXHighlightResult {
  name: StockXColorway
  url: StockXColorway
  categories: StockXColorway[]
  product_category: StockXColorway
  ticker_symbol: StockXColorway
  style_id: StockXColorway
  short_description: StockXColorway
  gender: StockXColorway
  colorway: StockXColorway
  description: StockXColorway
  searchable_traits: StockXHighlightResultSearchableTraits
}

export interface StockXColorway {
  value: string
  matchLevel: StockXMatchLevel
  matchedWords: string[]
  fullyHighlighted?: boolean
}

export enum StockXMatchLevel {
  Full = 'full',
  None = 'none'
}

export interface StockXHighlightResultSearchableTraits {
  Style: StockXColorway
  Colorway: StockXColorway
  'Retail Price': StockXColorway
  'Release Date': StockXColorway
}

export interface StockXMedia {
  imageUrl: string
  smallImageUrl: string
  thumbUrl: string
  gallery: any[]
  hidden: boolean
}

export interface StockXHitSearchableTraits {
  Style: string
  Colorway: string
  'Retail Price': number
  'Release Date': Date
  Retail?: number
}

export interface StockXTrait {
  filterable: boolean
  highlight: boolean
  name: string
  value: number | string
  visible: boolean
  format?: string
}

export interface StockXLinkResponse {
  Product: StockXLinkProduct
}

export interface StockXLinkProduct {
  id: string
  uuid: string
  brand: any
  colorway: string
  condition: string
  countryOfManufacture: string
  gender: string
  contentGroup: any
  minimumBid: number
  name: string
  primaryCategory: any
  secondaryCategory: any
  usHtsCode: string
  usHtsDescription: string
  productCategory: any
  releaseDate: Date
  retailPrice: number
  shoe: string
  shortDescription: string
  styleId: string
  tickerSymbol: string
  title: any
  dataType: string
  urlKey: string
  sizeLocale: string
  sizeTitle: string
  sizeDescriptor: string
  sizeAllDescriptor: string
  description: string
  lithiumIonBattery: boolean
  type: boolean
  aLim: number
  year: number
  shippingGroup: any
  traits: any[]
  meta: StockXLinkMeta
  PortfolioItems: any[]
  shipping: any
  enhancedImage: StockXLinkEnhancedImage
  media: StockXLinkMedia
  charityCondition: number
  breadcrumbs: StockXLinkBreadcrumb[]
  market: any
  children?: { [key: string]: StockXLinkProduct }
  parentId?: string
  parentUuid?: string
  shoeSize?: string
  sizeSortOrder?: number
}

export interface StockXLinkBreadcrumb {
  level: number
  name: any
  url: any
  isBrand: boolean
}

export interface StockXLinkEnhancedImage {
  productUuid: string
  imageKey: any
  imageCount: number
}

export interface StockXLinkMedia {
  '360': string[]
  imageUrl: string
  smallImageUrl: string
  thumbUrl: string
  has360: boolean
  gallery: any[]
}

export interface StockXLinkMeta {
  charity: boolean
  raffle: boolean
  mobile_only: boolean
  restock: boolean
  deleted: boolean
  hidden: boolean
  lock_buying: boolean
  lock_selling: boolean
  redirected: boolean
}
