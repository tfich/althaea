import { findBestMatch } from 'string-similarity'

export const findMatch = <T>(query: string, items: T[]): T | undefined => {
  const strItems =
    typeof items[0] === 'object'
      ? items.map((item) => Object.values(item).flat().join(' | '))
      : (items as any[]).map((i) => i.toString())
  const { bestMatchIndex } = findBestMatch(query, strItems)
  return items[bestMatchIndex]
}
