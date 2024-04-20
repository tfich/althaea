export const pluralize = (str: string, i: number, suffix = 's') => (i === 1 ? str : str + suffix)

export const capitalizeFirstLetter = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export const capitalizeFirstLetters = (s: string) =>
  s
    .split(' ')
    .map((w) => capitalizeFirstLetter(w))
    .join(' ')
