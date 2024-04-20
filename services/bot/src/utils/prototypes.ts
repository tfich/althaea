/* Declare the types in ./types/declarations/global.d.ts */

String.prototype.toCodeBlock = function (this: string) {
  return '```' + this + '```'
}

String.prototype.toHyperlink = function (this: string, title: string) {
  return `[${title}](${this})`
}

String.prototype.question = function (this: string) {
  return this.endsWith('?') ? this : `${this}?`
}

String.prototype.reply = function (this: string) {
  if (this.toLowerCase().startsWith('i')) {
    return this
  }
  return this.charAt(0).toLowerCase() + this.slice(1)
}

String.prototype.cleanTuncate = function (this: string, maxCharacters = 120) {
  const wordSplit = this.split(' ').filter(Boolean)
  let charCount = 0
  for (let i = 0; i < wordSplit.length; i++) {
    charCount += wordSplit[i].length
    if (charCount >= maxCharacters) {
      return wordSplit.slice(0, i).join(' ') + '...'
    }
  }
  return this
}
