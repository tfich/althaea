import Embed from '../../classes/Embed'
import Tool from '../../classes/Tool'
import StadiumGoodsScraper from '../../controllers/scrapers/StadiumGoodsScraper'
import { ToolCategory, ToolType } from '../../graphql'

const tool = new Tool({
  id: 'stadium-goods-search',
  name: 'Stadium Goods Search',
  description: "Search Stadium Goods for a shoe's current market value",
  category: ToolCategory.SiteScrapers,
  type: ToolType.Command,
  commandTrigger: 'stadiumgoods'
})

interface Args {
  query: string
}

tool.addCommand<Args>({
  description: "Search Stadium Goods for a shoe's current market value",
  args: [
    {
      key: 'query',
      example: 'Jordan 1 Retro High Dior'
    }
  ],
  async exec(message, { query }, { group, client }) {
    const stadiumGoods = new StadiumGoodsScraper(client)

    const search = await stadiumGoods.search(query)
    if (!search) {
      return `unable to find results for query \`${query}\`.`
    }

    const sizes = await stadiumGoods.fetchSizes()

    const embed = new Embed(group)
      .setTitle(`${search.name} "${search.nickname}"`)
      .setURL(search.pdpUrl)
      .setThumbnail(search.smallImage.url)
      .addField('SKU', search.manufacturerSku, true)
      .addField('Nickname', search.nickname, true)
      .addField('Lowest Price', search.lowestPrice.value.formattedValue, true)

    if (!sizes) {
      embed.addField('Sizes', 'n/a')
    } else {
      embed.addColumnField(
        'Sizes',
        sizes.map(({ size, price }) => `${size} - ${price}`)
      )
    }

    return embed
  }
})

export default tool
