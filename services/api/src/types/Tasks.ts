export enum TaskEvent {
  SEND_CHANNEL_MESSAGE = 'send_channel_message',
  DM_USER = 'dm_user'
}

export type Task =
  | { event: TaskEvent.SEND_CHANNEL_MESSAGE; data: SendChannelMessageData }
  | { event: TaskEvent.DM_USER; data: DmUserData }

interface SendChannelMessageData {
  groupID: string
  channelID: string
  embed?: object
  message?: string
}

interface DmUserData {
  groupID: string
  userID: string
  embed?: object
  message?: string
}
