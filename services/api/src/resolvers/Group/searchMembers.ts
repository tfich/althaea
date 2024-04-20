import { Arg, Ctx, Field, ObjectType, Query, Resolver } from 'type-graphql'
import GroupDiscordClient from '../../controllers/GroupDiscordClient'
import { Group } from '../../entities/Group'
import { GroupMember } from '../../entities/GroupMember'
import ServerContext from '../../types/ServerContext'
import { getHighestRole } from '../../utils/discord'

@ObjectType()
class SearchMember {
  @Field()
  memberID: string

  @Field()
  username: string

  @Field()
  discriminator: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  nick?: string

  @Field(() => [String])
  roleIDs: string[]

  @Field({ nullable: true })
  highestRoleName?: string

  @Field()
  joinedAt: string

  @Field({ nullable: true })
  groupMember?: GroupMember
}

@ObjectType()
class MemberSearch {
  @Field({ nullable: true })
  query: string

  @Field()
  page: number

  @Field()
  itemsPerPage: number

  @Field()
  totalMembers: number

  @Field(() => [SearchMember])
  members: SearchMember[]
}

@Resolver(() => Group)
export default class {
  @Query(() => MemberSearch, { nullable: true })
  async searchMembers(
    @Arg('query', { nullable: true }) query: string,
    @Arg('page', { defaultValue: 0 }) page: number,
    @Arg('limit', { defaultValue: 10 }) limit: number,
    @Ctx() { group }: ServerContext
  ): Promise<MemberSearch | null> {
    if (!group!.botAdded) {
      return null
    }
    const client = new GroupDiscordClient(group!)
    const allGuildMembers = await client.getAllGuildMembers()
    const allRoles = await client.getGuildRoles()

    if (!allGuildMembers || !allGuildMembers.length) {
      return {
        query,
        page,
        itemsPerPage: limit,
        totalMembers: 0,
        members: []
      }
    }

    const filteredMembers: SearchMember[] = []
    for (const { user, nick, roles: roleIDs, joined_at: joinedAt } of allGuildMembers) {
      const { id: memberID, username, discriminator, avatar, bot } = user

      const highestRole = getHighestRole(allRoles, roleIDs)
      const highestRoleName = highestRole ? highestRole.name : undefined

      const searchStr = `${memberID}:${username}#${discriminator}`.toLowerCase()

      if (!bot && (!query || searchStr.includes(query.toLowerCase()))) {
        const groupMember = await GroupMember.findOne({ memberID, groupID: group!.id })
        filteredMembers.push({
          memberID,
          username,
          discriminator,
          avatar,
          nick,
          roleIDs,
          highestRoleName,
          joinedAt,
          groupMember
        })
      }
    }

    // UNCOMMENT TO TEST PAGINATION
    // const testMembers: SearchMember[] = []
    // for (let i = 0; i < 54; i++) {
    //   testMembers.push(...filteredMembers)
    // }
    // return {
    //   query,
    //   page,
    //   itemsPerPage: limit,
    //   totalMembers: testMembers.length,
    //   members: testMembers.slice(page * limit, (page + 1) * limit)
    // }

    return {
      query,
      page,
      itemsPerPage: limit,
      totalMembers: filteredMembers.length,
      members: filteredMembers.slice(page * limit, (page + 1) * limit)
    }
  }
}
