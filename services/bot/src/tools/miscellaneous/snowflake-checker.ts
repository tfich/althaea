import moment from 'moment-timezone'
import Tool from '../../classes/Tool'
import { ToolCategory, ToolType } from '../../graphql'
import { snowflakeToDate } from '../../utils/discord/general'

const tool = new Tool({
  id: 'snowflake-checker',
  name: 'Snowflake Checker',
  description: 'Check the timestamp of a Discord snowflake',
  category: ToolCategory.Miscalleneous,
  type: ToolType.Command,
  commandTrigger: 'snowflake'
})

interface Args {
  snowflake: string
}

tool.addCommand<Args>({
  description: 'Check the timestamp of a Discord snowflake',
  args: [
    {
      key: 'snowflake',
      example: '367793822798708736'
    }
  ],
  async exec(_, { snowflake }) {
    return `the timestamp for this snowflake is \`${moment(snowflakeToDate(snowflake))
      .tz('America/Los_Angeles')
      .format('dddd, MMMM Do YYYY [at] h:mm:ss.SSS a [PST]')}\``
  }
})

export default tool
