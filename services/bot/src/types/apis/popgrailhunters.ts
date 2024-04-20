export interface PopGrailHuntersResponse {
  results: Result[]
}

export interface Result {
  hits: Hit[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  exhaustiveNbHits: boolean
  string: string
  params: string
  index: string
  processingTimeMS: number
}

export interface Hit {
  id: number
  hdbid: number
  name: string
  uri: string
  image_uri: string
  value: string
  value_in_pennies: number
  edition_size: number | null
  exclusivity: null | string
  item_number: null | string
  released: string
  created_at: Date
  updated_at: Date
  depicts: string
  objectID: string
  _highlightResult: HighlightResult
}

export interface HighlightResult {
  name?: Exclusivity
  item_number?: Exclusivity
  exclusivity?: Exclusivity
}

export interface Exclusivity {
  value: string
  matchLevel: MatchLevel
  matchedWords: string[]
  fullyHighlighted?: boolean
}

export enum MatchLevel {
  Full = 'full',
  None = 'none'
}
