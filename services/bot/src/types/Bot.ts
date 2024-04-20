export interface BaseBotOptions {
  botToken: string
}

export interface MainBotOptions extends BaseBotOptions {
  groupTokens: string[]
}

export interface CustomBotOptions extends BaseBotOptions {
  groupToken: string
}
