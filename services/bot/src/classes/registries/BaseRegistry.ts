import getAllTools from '../../utils/getAllTools'
import Tool from '../Tool'

export default class BaseRegistry {
  protected tools: Tool[]

  constructor() {
    this.tools = getAllTools()
  }

  protected handleError(error: Error) {
    console.log(error)
  }
}
