import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: '',
  name: '',
  description: '',
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: ''
})

tool.addListener('message', async ([member], group) => {
  //
})

export default tool
