import { DiscordGuildRole } from '../types/discordAPI'

export const getHighestRole = (allRoles: DiscordGuildRole[], userRoleIDs: string[]) =>
  allRoles.filter(({ id }) => userRoleIDs.includes(id)).sort((a, b) => a.position - b.permissions)[0]
