const matchesKeywordSet = (text: string, keywordSet: string) => {
  const keywords: string[] = keywordSet
    .trim()
    .split(',')
    .filter((str) => str !== '')
  text = text.toLowerCase()
  let matches = true
  keywords.forEach((keyword) => {
    const sign = keyword[0]
    if (sign !== '+' && sign !== '-') {
      return false
    }
    const word = keyword.substring(1).toLowerCase()
    if (sign === '+' && !text.includes(word)) {
      matches = false
    } else if (sign === '-' && text.includes(word)) {
      matches = false
    }
  })
  return matches
}

export default matchesKeywordSet
