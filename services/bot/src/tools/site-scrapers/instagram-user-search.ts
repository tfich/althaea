import { stripIndent } from 'common-tags'
import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import InstagramScraper from '../../controllers/scrapers/InstagramScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'instagram-user-search',
  name: 'Instagram User Search',
  description: "Search for an Instagram user's account information",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'instagram'
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
    const instagram = new InstagramScraper(client)

    const search = await instagram.search(username)
    if (!search) {
      return `unable to find results for username \`${username}\`.`
    }

    const embed = new Embed(group)
      .setTitle(`${search.full_name} (@${search.username})`)
      .setThumbnail(search.profile_pic_url || '')
      .setURL(`https://instagram.com/${search.username}`)
      .setDescription(
        stripIndent`
          ${search.biography}
          ${search.external_url}
        `
      )
      .addField('Posts', search.edge_owner_to_timeline_media.count.toLocaleString(), true)
      .addField('Followers', search.edge_followed_by.count.toLocaleString(), true)
      .addField('Following', search.edge_follow.count.toLocaleString(), true)
      .addField('Verified', search.is_verified, true)
      .addField('Private', search.is_private, true)
      .addField('Private', search.is_business_account, true)

    return embed
  }
})

export default tool
