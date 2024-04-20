export interface BotBrokerBot {
  id: number
  name: string
  image: string
  twitter: null | string
  category: string
  highest_active_bid: number
  lowest_active_ask: number
  highest_active_bid_type: BotBrokerBotType
  lowest_active_ask_type: BotBrokerBotType
  active_bids: number
  active_asks: number
  bids_count: number
  asks_count: number
  highest_renewal_bid: number | null
  highest_lifetime_bid: number | null
  lowest_renewal_ask: number | null
  lowest_lifetime_ask: number | null
}

export enum BotBrokerBotType {
  Lifetime = 'lifetime',
  None = 'none',
  Renewal = 'renewal'
}
