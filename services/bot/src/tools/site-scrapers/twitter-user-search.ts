import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import TwitterScraper from '../../controllers/scrapers/TwitterScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'twitter-user-search',
  name: 'Twitter User Search',
  description: "Search for a Twitter user's account information",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'twitter'
})

interface Args {
  username: string
}

tool.addCommand<Args>({
  description: "Search for a user's account information",
  args: [
    {
      key: 'username',
      example: 'johndoe',
      transformer: (value) => value.replace('@', '')
    }
  ],
  async exec(message, { username }, { group, client }) {
    const twitter = new TwitterScraper(client)

    const search = await twitter.search(username)
    if (!search) {
      return `unable to find results for username \`${username}\`.`
    }

    const embed = new Embed(group)
      .setTitle(search.name)
      .setThumbnail(search.image || '')
      .setURL(`https://twitter.com/${username}`)
      .addField('Verified', search.verified, true)
      .addField('Created On', search.joined, true)
      .addField('Following', search.following || 'n/a', true)
      .addField('Followers', search.followers || 'n/a', true)
      .addField('Tweets', search.tweets || 'n/a', true)
      .addField('Likes', search.likes || 'n/a', true)

    return embed
  }
})

export default tool
