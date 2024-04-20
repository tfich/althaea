export const createDiffStr = (original: string, changed: string) => {
  const changes: string[] = []
  let changeSegment = ''
  changed.split('').forEach((val, i) => {
    if (val !== original.charAt(i)) {
      changeSegment += val
    } else if (!!changeSegment) {
      changes.push(changeSegment)
      changeSegment = ''
    }
  })
  if (!!changeSegment) {
    changes.push(changeSegment)
  }
  changes.forEach((c) => {
    const i = changed.indexOf(c)
    changed = changed.slice(0, i) + '**' + changed.slice(i, i + c.length) + '**' + changed.slice(i + c.length)
  })
  return changed
}
