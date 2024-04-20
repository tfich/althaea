export interface CrtEntry {
  issuer_ca_id: number
  issuer_name: string
  name_value: string
  id: number
  entry_timestamp: Date
  not_before: Date
  not_after: Date
}
