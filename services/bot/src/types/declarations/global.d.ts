export {}

declare global {
  interface String {
    toCodeBlock(): string
    toHyperlink(title: string): string
    question(): string
    reply(): string
    cleanTuncate(maxCharacters?: number): string
  }
}
