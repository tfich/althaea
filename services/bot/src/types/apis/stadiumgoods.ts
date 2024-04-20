export interface StadiumGoodsResponse {
  data: Data
}

export interface Data {
  configurableProduct: null
  configurableProducts: ConfigurableProducts
  productCategories: ProductCategory[]
  productSearchQuery: ProductSearchQuery
  popularProductSearchQueries: PopularProductSearchQuery[]
}

export interface ConfigurableProducts {
  edges: Edge[]
  totalCount: number
}

export interface Edge {
  node: Node
}

export interface Node {
  id: string
  bigImage: Image
  brand: string
  lowestPrice: LowestPrice
  manufacturerSku: string
  name: string
  nickname: string
  pdpUrl: string
  smallImage: Image
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface LowestPrice {
  __typename: string
  value: Value
}

export interface Value {
  formattedValue: string
}

export interface PopularProductSearchQuery {
  query: string
}

export interface ProductCategory {
  localId: number
  name: string
  productCount: number
  slug: string
}

export interface ProductSearchQuery {
  query: string
  redirectUrl: string
}
