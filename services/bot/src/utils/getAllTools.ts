import { join } from 'path'
import requireAll from 'require-all'
import Tool from '../classes/Tool'

const findDefaults = (obj: object): any[] =>
  Object.entries(obj).reduce<any[]>(
    (acc, [key, value]) =>
      key === 'default' ? acc.concat(value) : typeof value === 'object' ? acc.concat(findDefaults(value)) : acc,
    []
  )

const getAllTools = (): Tool[] => {
  const fileMap = requireAll({
    dirname: join(__dirname, '..', 'tools'),
    excludeDirs: /^_/,
    recursive: true
  })

  Object.keys(fileMap).forEach((key) => key.startsWith('_') && delete fileMap[key])

  const defaultExports = findDefaults(fileMap)

  defaultExports.forEach((exp) => {
    if (!(exp instanceof Tool)) {
      throw Error('./tools should only export instances of Tool!')
    }
  })

  return defaultExports
}

export default getAllTools
