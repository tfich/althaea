/* eslint-disable */
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
};

export type ActivityEntry = {
  __typename?: 'ActivityEntry';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  event: ActivityEvent;
  groupID: Scalars['String'];
  group: Group;
  adminID: Scalars['String'];
  admin: GroupAdmin;
  description: Scalars['String'];
};

export enum ActivityEvent {
  CreatedGroup = 'CREATED_GROUP',
  UpdatedBot = 'UPDATED_BOT',
  AddedTool = 'ADDED_TOOL',
  RemovedTool = 'REMOVED_TOOL',
  UpdatedTool = 'UPDATED_TOOL',
  AppliedCoupon = 'APPLIED_COUPON',
  UpdatedPayment = 'UPDATED_PAYMENT',
  AddedAdmin = 'ADDED_ADMIN',
  RemovedAdmin = 'REMOVED_ADMIN',
  UpdatedNotificationsSettings = 'UPDATED_NOTIFICATIONS_SETTINGS',
  UpdatedDefaultCommandSettings = 'UPDATED_DEFAULT_COMMAND_SETTINGS',
  UpdatedBotPlan = 'UPDATED_BOT_PLAN'
}

export type BotConfig = {
  botEnabled: Scalars['Boolean'];
  botStatusType?: Maybe<StatusType>;
  botStatus?: Maybe<Scalars['String']>;
  commandPrefix?: Maybe<Scalars['String']>;
  embedColor?: Maybe<Scalars['String']>;
  embedFooter?: Maybe<Scalars['String']>;
};

export type BotPlan = {
  __typename?: 'BotPlan';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  active: Scalars['Boolean'];
  stripePriceID: Scalars['String'];
  hierarchy: Scalars['Float'];
  highlights: Array<Scalars['String']>;
  customBot: Scalars['Boolean'];
  adminLimit: Scalars['Float'];
  allowPaidTools: Scalars['Boolean'];
  groups: Array<Group>;
  price: Scalars['Float'];
};

export type BotUser = {
  __typename?: 'BotUser';
  id: Scalars['String'];
  username: Scalars['String'];
  discriminator: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type Coupon = {
  __typename?: 'Coupon';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['String'];
  userID?: Maybe<Scalars['String']>;
  claimed: Scalars['Boolean'];
  trialPeriodDays?: Maybe<Scalars['Float']>;
  percentOff?: Maybe<Scalars['Float']>;
  amountOff?: Maybe<Scalars['Float']>;
  forever: Scalars['Boolean'];
};

export type CreatableGroup = {
  __typename?: 'CreatableGroup';
  id: Scalars['String'];
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type CustomBotInstance = {
  __typename?: 'CustomBotInstance';
  groupToken: Scalars['String'];
  botToken: Scalars['String'];
};


export type DefaultToolConfig = {
  defaultChannels: Array<Scalars['String']>;
  defaultChannelsAllowed: Scalars['Boolean'];
  defaultRoles: Array<Scalars['String']>;
  defaultRolesAllowed: Scalars['Boolean'];
};

export type DiscordChannel = {
  __typename?: 'DiscordChannel';
  id: Scalars['String'];
  type: DiscordChannelType;
  position: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
  parentID?: Maybe<Scalars['String']>;
};

export enum DiscordChannelType {
  GuildText = 'GUILD_TEXT',
  Dm = 'DM',
  GuildVoice = 'GUILD_VOICE',
  GroupDm = 'GROUP_DM',
  GuildCategory = 'GUILD_CATEGORY',
  GuildNews = 'GUILD_NEWS',
  GuildStore = 'GUILD_STORE'
}

export type DiscordGroupInfo = {
  __typename?: 'DiscordGroupInfo';
  id: Scalars['String'];
  name: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
};

export type DiscordRole = {
  __typename?: 'DiscordRole';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  permissions: Scalars['Float'];
  mentionable: Scalars['Boolean'];
};

export type DiscordUserInfo = {
  __typename?: 'DiscordUserInfo';
  id: Scalars['String'];
  username: Scalars['String'];
  discriminator: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['String'];
  ownerID: Scalars['String'];
  admins: Array<GroupAdmin>;
  toolConfigs: Array<GroupToolConfig>;
  activityEntries: Array<ActivityEntry>;
  resources: Array<GroupResource>;
  reactionRoles: Array<ReactionRole>;
  keywordPingerEntries: Array<KeywordPingerEntry>;
  loyaltyAutoAddConfigs: Array<LoyaltyAutoAddConfig>;
  loyaltyPrizes: Array<LoyaltyPrize>;
  loyaltyReactionConfigs: Array<LoyaltyReactionConfig>;
  customerID: Scalars['String'];
  subscriptionID: Scalars['String'];
  botPlanID?: Maybe<Scalars['String']>;
  botPlan?: Maybe<BotPlan>;
  fnf: Scalars['Boolean'];
  botAdded: Scalars['Boolean'];
  botEnabled: Scalars['Boolean'];
  customBotConfigured: Scalars['Boolean'];
  botStatus?: Maybe<Scalars['String']>;
  botStatusType?: Maybe<StatusType>;
  botClientID?: Maybe<Scalars['String']>;
  embedColor?: Maybe<Scalars['String']>;
  embedFooter?: Maybe<Scalars['String']>;
  commandPrefix: Scalars['String'];
  defaultChannels: Array<Scalars['String']>;
  defaultChannelsAllowed: Scalars['Boolean'];
  defaultRoles: Array<Scalars['String']>;
  defaultRolesAllowed: Scalars['Boolean'];
  apiKey: Scalars['String'];
  logChannelID?: Maybe<Scalars['String']>;
  announcementsChannelID?: Maybe<Scalars['String']>;
  twitterAccessToken?: Maybe<Scalars['String']>;
  twitterAccessSecret?: Maybe<Scalars['String']>;
  successChannels: Array<Scalars['String']>;
  sendFollowUpSuccessMessage: Scalars['Boolean'];
  allowSuccessDelete: Scalars['Boolean'];
  successMessageFormat: Scalars['String'];
  twilioConnectAccountSID?: Maybe<Scalars['String']>;
  twilioNotifyServiceSID?: Maybe<Scalars['String']>;
  smsSendRoles: Array<Scalars['String']>;
  loyaltyLogsChannelID?: Maybe<Scalars['String']>;
  messageLogsChannelID?: Maybe<Scalars['String']>;
  joinLeaveLogChannelID?: Maybe<Scalars['String']>;
  botUser?: Maybe<BotUser>;
  channels?: Maybe<Array<DiscordChannel>>;
  discordInfo?: Maybe<DiscordGroupInfo>;
  loyaltyLeaderboard: Array<LoyaltyLeader>;
  paymentMethod?: Maybe<PaymentMethod>;
  roles?: Maybe<Array<DiscordRole>>;
  subscription: Subscription;
  twitterScreenName?: Maybe<Scalars['String']>;
};


export type GroupLoyaltyLeaderboardArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type GroupAdmin = {
  __typename?: 'GroupAdmin';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userID: Scalars['String'];
  user: User;
  groupID: Scalars['String'];
  group: Group;
  activityEntries: Array<ActivityEntry>;
  isOwner: Scalars['Boolean'];
  discordInfo?: Maybe<DiscordUserInfo>;
};

export type GroupMember = {
  __typename?: 'GroupMember';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  memberID: Scalars['String'];
  groupID: Scalars['String'];
  group: Group;
  email?: Maybe<Scalars['String']>;
  discordAccessToken?: Maybe<Scalars['String']>;
  discordRefreshToken?: Maybe<Scalars['String']>;
  smsNumber?: Maybe<Scalars['String']>;
  currentLoyaltyPoints: Scalars['Float'];
  lifetimeLoyaltyPoints: Scalars['Float'];
  loyaltyPrizeClaims: Array<LoyaltyPrizeClaim>;
};

export type GroupResource = {
  __typename?: 'GroupResource';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  title: Scalars['String'];
  link: Scalars['String'];
};

export type GroupToolConfig = {
  __typename?: 'GroupToolConfig';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  toolID: Scalars['String'];
  tool: Tool;
  groupID: Scalars['String'];
  group: Group;
  channels: Array<Scalars['String']>;
  channelsAllowed: Scalars['Boolean'];
  roles: Array<Scalars['String']>;
  rolesAllowed: Scalars['Boolean'];
};

export type Invoice = {
  __typename?: 'Invoice';
  date: Scalars['DateTime'];
  amount: Scalars['Float'];
  status?: Maybe<Scalars['String']>;
  pdfUrl: Scalars['String'];
};


export type KeywordPingerEntry = {
  __typename?: 'KeywordPingerEntry';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  group: Group;
  keywordSet: Scalars['String'];
  channels: Array<Scalars['String']>;
  pingRoles: Array<Scalars['String']>;
};

export type LoyaltyAutoAddConfig = {
  __typename?: 'LoyaltyAutoAddConfig';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  channelID: Scalars['String'];
  amount: Scalars['Float'];
};

export type LoyaltyLeader = {
  __typename?: 'LoyaltyLeader';
  memberID: Scalars['String'];
  points: Scalars['Float'];
};

export type LoyaltyPrize = {
  __typename?: 'LoyaltyPrize';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  name: Scalars['String'];
  cost: Scalars['Float'];
};

export type LoyaltyPrizeClaim = {
  __typename?: 'LoyaltyPrizeClaim';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  memberID: Scalars['String'];
  member: GroupMember;
  prizeID: Scalars['Float'];
  prize: LoyaltyPrize;
  fulfilled: Scalars['Boolean'];
};

export type LoyaltyReactionConfig = {
  __typename?: 'LoyaltyReactionConfig';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  emoji: Scalars['String'];
  amount: Scalars['Float'];
  channels: Array<Scalars['String']>;
};

export type MemberSearch = {
  __typename?: 'MemberSearch';
  query?: Maybe<Scalars['String']>;
  page: Scalars['Float'];
  itemsPerPage: Scalars['Float'];
  totalMembers: Scalars['Float'];
  members: Array<SearchMember>;
};

export type Mutation = {
  __typename?: 'Mutation';
  applyCoupon: Coupon;
  createCoupon: Coupon;
  createScheduledTask?: Maybe<Scalars['String']>;
  createGroup: Group;
  sendSmsMessage: Scalars['String'];
  setupBot: Group;
  updateBot: Group;
  updateBotPlan: Group;
  updateDefaultToolConfig: Group;
  updateNotificationSettings: Group;
  updatePaymentMethod: Group;
  addGroupAdmin: GroupAdmin;
  removeGroupAdmin: GroupAdmin;
  updateLoyaltyPoints: GroupMember;
  updateSmsNumber: GroupMember;
  addResource: GroupResource;
  removeResource: GroupResource;
  addToolConfig: GroupToolConfig;
  removeToolConfig: GroupToolConfig;
  updateToolConfig: GroupToolConfig;
  createKeywordPingerEntry: KeywordPingerEntry;
  removeKeywordPingerEntry: ReactionRole;
  createLoyaltyPrize: LoyaltyPrize;
  createLoyaltyPrizeClaim: LoyaltyPrizeClaim;
  fulfillLoyaltyPrizeClaim: LoyaltyPrizeClaim;
  createReactionRole: ReactionRole;
  removeReactionRole: ReactionRole;
  refreshAccessToken?: Maybe<Scalars['String']>;
  deleteSuccessTweet?: Maybe<SuccessTweet>;
  updateSuccessTweet: SuccessTweet;
  uploadSuccessTweet?: Maybe<SuccessTweet>;
  createTicket: Ticket;
  seedTools: Array<Tool>;
  setSelectedGroupID: User;
};


export type MutationApplyCouponArgs = {
  id: Scalars['String'];
};


export type MutationCreateCouponArgs = {
  forever?: Maybe<Scalars['Boolean']>;
  amountOff?: Maybe<Scalars['Float']>;
  percentOff?: Maybe<Scalars['Float']>;
  trialPeriodDays?: Maybe<Scalars['Float']>;
  userID?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationCreateScheduledTaskArgs = {
  date: Scalars['DateTime'];
  data: Scalars['JSONObject'];
  event: TaskEvent;
};


export type MutationCreateGroupArgs = {
  coupon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentID?: Maybe<Scalars['String']>;
  botPlanID: Scalars['String'];
  groupID: Scalars['String'];
};


export type MutationSendSmsMessageArgs = {
  message: Scalars['String'];
};


export type MutationSetupBotArgs = {
  token: Scalars['String'];
  clientSecret: Scalars['String'];
  clientID: Scalars['String'];
};


export type MutationUpdateBotArgs = {
  botConfig: BotConfig;
};


export type MutationUpdateBotPlanArgs = {
  botPlanID: Scalars['String'];
};


export type MutationUpdateDefaultToolConfigArgs = {
  defaultToolConfig: DefaultToolConfig;
};


export type MutationUpdateNotificationSettingsArgs = {
  announcementsChannelID?: Maybe<Scalars['String']>;
  logChannelID?: Maybe<Scalars['String']>;
};


export type MutationUpdatePaymentMethodArgs = {
  paymentID: Scalars['String'];
  name: Scalars['String'];
};


export type MutationAddGroupAdminArgs = {
  userID: Scalars['String'];
};


export type MutationRemoveGroupAdminArgs = {
  userID: Scalars['String'];
};


export type MutationUpdateLoyaltyPointsArgs = {
  pointDifference: Scalars['Float'];
  memberID: Scalars['String'];
};


export type MutationUpdateSmsNumberArgs = {
  smsNumber?: Maybe<Scalars['String']>;
  memberID: Scalars['String'];
};


export type MutationAddResourceArgs = {
  link: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRemoveResourceArgs = {
  id: Scalars['Float'];
};


export type MutationAddToolConfigArgs = {
  toolID: Scalars['String'];
};


export type MutationRemoveToolConfigArgs = {
  toolID: Scalars['String'];
};


export type MutationUpdateToolConfigArgs = {
  toolConfig: ToolConfig;
  toolID: Scalars['String'];
};


export type MutationCreateKeywordPingerEntryArgs = {
  pingRoles: Array<Scalars['String']>;
  channels: Array<Scalars['String']>;
  keywordSet: Scalars['String'];
};


export type MutationRemoveKeywordPingerEntryArgs = {
  id: Scalars['Float'];
};


export type MutationCreateLoyaltyPrizeArgs = {
  cost: Scalars['Float'];
  name: Scalars['String'];
};


export type MutationCreateLoyaltyPrizeClaimArgs = {
  prizeID: Scalars['Float'];
  memberID: Scalars['String'];
};


export type MutationFulfillLoyaltyPrizeClaimArgs = {
  prizeClaimID: Scalars['Float'];
};


export type MutationCreateReactionRoleArgs = {
  roleID: Scalars['String'];
  emoji: Scalars['String'];
};


export type MutationRemoveReactionRoleArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteSuccessTweetArgs = {
  followUpMessageID?: Maybe<Scalars['String']>;
  messageID?: Maybe<Scalars['String']>;
};


export type MutationUpdateSuccessTweetArgs = {
  followUpMessageID: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationUploadSuccessTweetArgs = {
  messageID: Scalars['String'];
  channelID: Scalars['String'];
  memberID: Scalars['String'];
  imageUrl: Scalars['String'];
};


export type MutationCreateTicketArgs = {
  channelID: Scalars['String'];
  memberID: Scalars['String'];
  type: TicketType;
};


export type MutationSeedToolsArgs = {
  tools: Array<ToolOptions>;
};


export type MutationSetSelectedGroupIdArgs = {
  selectedGroupID: Scalars['String'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  brand: Scalars['String'];
  lastFour: Scalars['String'];
  month: Scalars['Float'];
  year: Scalars['Float'];
  postalCode: Scalars['String'];
};

export type Proxy = {
  __typename?: 'Proxy';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  proxy: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  recentActivity: Array<ActivityEntry>;
  instanceFromOrdinal: CustomBotInstance;
  mainBotGroupTokens: Array<Scalars['String']>;
  numCustomInstances: Scalars['Float'];
  botPlans: Array<BotPlan>;
  botUrl: Scalars['String'];
  coupon?: Maybe<Coupon>;
  group?: Maybe<Group>;
  invoices: Array<Invoice>;
  searchMembers?: Maybe<MemberSearch>;
  groupMember: GroupMember;
  oauthUrl: Scalars['String'];
  proxies: Array<Proxy>;
  supportServerInvite: Scalars['String'];
  tools: Array<Tool>;
  twilioUrl: Scalars['String'];
  twitterUrl: Scalars['String'];
  creatableGroups: Array<CreatableGroup>;
  user?: Maybe<User>;
};


export type QueryRecentActivityArgs = {
  limit?: Maybe<Scalars['Float']>;
};


export type QueryInstanceFromOrdinalArgs = {
  podOrdinal: Scalars['Float'];
};


export type QueryBotUrlArgs = {
  redirectUrl?: Maybe<Scalars['String']>;
  clientID?: Maybe<Scalars['String']>;
};


export type QueryCouponArgs = {
  id: Scalars['String'];
};


export type QuerySearchMembersArgs = {
  limit?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
  query?: Maybe<Scalars['String']>;
};


export type QueryGroupMemberArgs = {
  memberID: Scalars['String'];
};


export type QueryOauthUrlArgs = {
  redirectUrl?: Maybe<Scalars['String']>;
  client: Scalars['String'];
};

export type ReactionRole = {
  __typename?: 'ReactionRole';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  group: Group;
  emoji: Scalars['String'];
  roleID: Scalars['String'];
};

export type SearchMember = {
  __typename?: 'SearchMember';
  memberID: Scalars['String'];
  username: Scalars['String'];
  discriminator: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  nick?: Maybe<Scalars['String']>;
  roleIDs: Array<Scalars['String']>;
  highestRoleName?: Maybe<Scalars['String']>;
  joinedAt: Scalars['String'];
  groupMember?: Maybe<GroupMember>;
};

export enum StatusType {
  Playing = 'PLAYING',
  Streaming = 'STREAMING',
  Listening = 'LISTENING',
  Custom = 'CUSTOM'
}

export type SubEntity = {
  __typename?: 'SubEntity';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  status: Scalars['String'];
  nextPaymentDate?: Maybe<Scalars['DateTime']>;
  nextPaymentAmount?: Maybe<Scalars['Float']>;
  previousPaymentDate?: Maybe<Scalars['DateTime']>;
  previousPaymentAmount?: Maybe<Scalars['Float']>;
  coupon?: Maybe<Scalars['String']>;
};

export type SuccessTweet = {
  __typename?: 'SuccessTweet';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  memberID: Scalars['String'];
  member: GroupMember;
  imageUrl: Scalars['String'];
  caption: Scalars['String'];
  channelID: Scalars['String'];
  messageID: Scalars['String'];
  followUpMessageID?: Maybe<Scalars['String']>;
  queued: Scalars['Boolean'];
  tweetID?: Maybe<Scalars['String']>;
  tweetUrl?: Maybe<Scalars['String']>;
};

export enum TaskEvent {
  SendChannelMessage = 'SEND_CHANNEL_MESSAGE',
  DmUser = 'DM_USER'
}

export type Ticket = {
  __typename?: 'Ticket';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['Float'];
  groupID: Scalars['String'];
  group: Group;
  memberID: Scalars['String'];
  member: GroupMember;
  type: TicketType;
  channelID: Scalars['String'];
};

export enum TicketType {
  Support = 'SUPPORT',
  Welcome = 'WELCOME'
}

export type Tool = {
  __typename?: 'Tool';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: ToolCategory;
  type: ToolType;
  commandTrigger?: Maybe<Scalars['String']>;
  default: Scalars['Boolean'];
  free: Scalars['Boolean'];
  featured: Scalars['Boolean'];
  configs: Array<GroupToolConfig>;
  addableGroupIDs: Array<Scalars['String']>;
  new: Scalars['Boolean'];
};

export enum ToolCategory {
  Calculators = 'CALCULATORS',
  Engagement = 'ENGAGEMENT',
  Generators = 'GENERATORS',
  HomeworkHelpers = 'HOMEWORK_HELPERS',
  Logging = 'LOGGING',
  Management = 'MANAGEMENT',
  Miscalleneous = 'MISCALLENEOUS',
  Productivity = 'PRODUCTIVITY',
  SiteScrapers = 'SITE_SCRAPERS',
  Tickets = 'TICKETS'
}

export type ToolConfig = {
  channels: Array<Scalars['String']>;
  channelsAllowed: Scalars['Boolean'];
  roles: Array<Scalars['String']>;
  rolesAllowed: Scalars['Boolean'];
};

export type ToolOptions = {
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: ToolCategory;
  type: ToolType;
  commandTrigger?: Maybe<Scalars['String']>;
  default?: Maybe<Scalars['Boolean']>;
  free?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
};

export enum ToolType {
  Command = 'COMMAND',
  Module = 'MODULE'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  id: Scalars['String'];
  adminGroups: Array<GroupAdmin>;
  selectedGroupID?: Maybe<Scalars['String']>;
  discordInfo?: Maybe<DiscordUserInfo>;
  groups: Array<UserGroup>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  groupID: Scalars['String'];
  name: Scalars['String'];
  isOwner: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  groupToken: Scalars['String'];
};

export type ActivityEntryPartsFragment = (
  { __typename?: 'ActivityEntry' }
  & Pick<ActivityEntry, 'id' | 'event' | 'groupID' | 'adminID' | 'description' | 'createdAt' | 'updatedAt'>
  & { admin: (
    { __typename?: 'GroupAdmin' }
    & GroupAdminPartsFragment
  ) }
);

export type BotPlanPartsFragment = (
  { __typename?: 'BotPlan' }
  & Pick<BotPlan, 'id' | 'name' | 'price' | 'active' | 'stripePriceID' | 'hierarchy' | 'highlights' | 'adminLimit' | 'allowPaidTools' | 'customBot'>
);

export type ChannelPartsFragment = (
  { __typename?: 'DiscordChannel' }
  & Pick<DiscordChannel, 'id' | 'type' | 'position' | 'name' | 'parentID'>
);

export type CouponPartsFragment = (
  { __typename?: 'Coupon' }
  & Pick<Coupon, 'id' | 'userID' | 'claimed' | 'trialPeriodDays' | 'percentOff' | 'amountOff' | 'forever'>
);

export type GroupAdminPartsFragment = (
  { __typename?: 'GroupAdmin' }
  & Pick<GroupAdmin, 'userID' | 'groupID' | 'isOwner'>
  & { discordInfo?: Maybe<(
    { __typename?: 'DiscordUserInfo' }
    & Pick<DiscordUserInfo, 'id' | 'username' | 'discriminator' | 'avatar'>
  )> }
);

export type GroupMemberPartsFragment = (
  { __typename?: 'GroupMember' }
  & Pick<GroupMember, 'memberID' | 'groupID' | 'email' | 'smsNumber'>
  & { group: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type GroupPartsFragment = (
  { __typename?: 'Group' }
  & Pick<Group, 'id' | 'botPlanID' | 'fnf' | 'botAdded' | 'botEnabled' | 'commandPrefix' | 'customBotConfigured' | 'botStatusType' | 'botStatus' | 'botClientID' | 'embedColor' | 'embedFooter' | 'defaultChannels' | 'defaultChannelsAllowed' | 'defaultRoles' | 'defaultRolesAllowed' | 'apiKey' | 'logChannelID' | 'announcementsChannelID' | 'createdAt'>
  & { discordInfo?: Maybe<(
    { __typename?: 'DiscordGroupInfo' }
    & Pick<DiscordGroupInfo, 'id' | 'name' | 'icon'>
  )>, toolConfigs: Array<(
    { __typename?: 'GroupToolConfig' }
    & GroupToolConfigPartsFragment
  )>, paymentMethod?: Maybe<(
    { __typename?: 'PaymentMethod' }
    & PaymentMethodPartsFragment
  )>, subscription: (
    { __typename?: 'Subscription' }
    & SubscriptionPartsFragment
  ), botPlan?: Maybe<(
    { __typename?: 'BotPlan' }
    & BotPlanPartsFragment
  )>, botUser?: Maybe<(
    { __typename?: 'BotUser' }
    & Pick<BotUser, 'id' | 'username' | 'discriminator' | 'avatar'>
  )>, channels?: Maybe<Array<(
    { __typename?: 'DiscordChannel' }
    & ChannelPartsFragment
  )>>, roles?: Maybe<Array<(
    { __typename?: 'DiscordRole' }
    & RolePartsFragment
  )>>, admins: Array<(
    { __typename?: 'GroupAdmin' }
    & GroupAdminPartsFragment
  )> }
);

export type GroupToolConfigPartsFragment = (
  { __typename?: 'GroupToolConfig' }
  & Pick<GroupToolConfig, 'toolID' | 'groupID' | 'channels' | 'channelsAllowed' | 'roles' | 'rolesAllowed'>
  & { tool: (
    { __typename?: 'Tool' }
    & ToolPartsFragment
  ) }
);

export type InvoicePartsFragment = (
  { __typename?: 'Invoice' }
  & Pick<Invoice, 'date' | 'amount' | 'status' | 'pdfUrl'>
);

export type PaymentMethodPartsFragment = (
  { __typename?: 'PaymentMethod' }
  & Pick<PaymentMethod, 'brand' | 'lastFour' | 'month' | 'year' | 'postalCode'>
);

export type RolePartsFragment = (
  { __typename?: 'DiscordRole' }
  & Pick<DiscordRole, 'id' | 'name' | 'permissions' | 'mentionable'>
);

export type SearchMemberPartsFragment = (
  { __typename?: 'SearchMember' }
  & Pick<SearchMember, 'memberID' | 'username' | 'discriminator' | 'avatar' | 'nick' | 'roleIDs' | 'joinedAt' | 'highestRoleName'>
  & { groupMember?: Maybe<(
    { __typename?: 'GroupMember' }
    & GroupMemberPartsFragment
  )> }
);

export type SubscriptionPartsFragment = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'status' | 'nextPaymentDate' | 'nextPaymentAmount' | 'previousPaymentDate' | 'previousPaymentAmount' | 'coupon'>
);

export type ToolPartsFragment = (
  { __typename?: 'Tool' }
  & Pick<Tool, 'id' | 'name' | 'description' | 'category' | 'type' | 'commandTrigger' | 'default' | 'new' | 'free' | 'featured' | 'addableGroupIDs'>
);

export type UserGroupPartsFragment = (
  { __typename?: 'UserGroup' }
  & Pick<UserGroup, 'groupID' | 'name' | 'isOwner' | 'icon' | 'groupToken'>
);

export type UserPartsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'selectedGroupID'>
  & { discordInfo?: Maybe<(
    { __typename?: 'DiscordUserInfo' }
    & Pick<DiscordUserInfo, 'username' | 'discriminator' | 'avatar'>
  )>, groups: Array<(
    { __typename?: 'UserGroup' }
    & UserGroupPartsFragment
  )> }
);

export type AddGroupAdminMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type AddGroupAdminMutation = (
  { __typename?: 'Mutation' }
  & { addGroupAdmin: (
    { __typename?: 'GroupAdmin' }
    & GroupAdminPartsFragment
  ) }
);

export type AddToolConfigMutationVariables = Exact<{
  toolID: Scalars['String'];
}>;


export type AddToolConfigMutation = (
  { __typename?: 'Mutation' }
  & { addToolConfig: (
    { __typename?: 'GroupToolConfig' }
    & GroupToolConfigPartsFragment
  ) }
);

export type ApplyCouponMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ApplyCouponMutation = (
  { __typename?: 'Mutation' }
  & { applyCoupon: (
    { __typename?: 'Coupon' }
    & CouponPartsFragment
  ) }
);

export type CreateGroupMutationVariables = Exact<{
  groupID: Scalars['String'];
  botPlanID: Scalars['String'];
  paymentID?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  coupon?: Maybe<Scalars['String']>;
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type RefreshAccessTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'refreshAccessToken'>
);

export type RemoveGroupAdminMutationVariables = Exact<{
  userID: Scalars['String'];
}>;


export type RemoveGroupAdminMutation = (
  { __typename?: 'Mutation' }
  & { removeGroupAdmin: (
    { __typename?: 'GroupAdmin' }
    & GroupAdminPartsFragment
  ) }
);

export type RemoveToolConfigMutationVariables = Exact<{
  toolID: Scalars['String'];
}>;


export type RemoveToolConfigMutation = (
  { __typename?: 'Mutation' }
  & { removeToolConfig: (
    { __typename?: 'GroupToolConfig' }
    & GroupToolConfigPartsFragment
  ) }
);

export type SetSelectedGroupIdMutationVariables = Exact<{
  selectedGroupID: Scalars['String'];
}>;


export type SetSelectedGroupIdMutation = (
  { __typename?: 'Mutation' }
  & { setSelectedGroupID: (
    { __typename?: 'User' }
    & UserPartsFragment
  ) }
);

export type SetupBotMutationVariables = Exact<{
  clientID: Scalars['String'];
  clientSecret: Scalars['String'];
  token: Scalars['String'];
}>;


export type SetupBotMutation = (
  { __typename?: 'Mutation' }
  & { setupBot: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdateBotMutationVariables = Exact<{
  botConfig: BotConfig;
}>;


export type UpdateBotMutation = (
  { __typename?: 'Mutation' }
  & { updateBot: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdateBotPlanMutationVariables = Exact<{
  botPlanID: Scalars['String'];
}>;


export type UpdateBotPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateBotPlan: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdateDefaultToolConfigMutationVariables = Exact<{
  defaultToolConfig: DefaultToolConfig;
}>;


export type UpdateDefaultToolConfigMutation = (
  { __typename?: 'Mutation' }
  & { updateDefaultToolConfig: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdateNotificationSettingsMutationVariables = Exact<{
  logChannelID?: Maybe<Scalars['String']>;
  announcementsChannelID?: Maybe<Scalars['String']>;
}>;


export type UpdateNotificationSettingsMutation = (
  { __typename?: 'Mutation' }
  & { updateNotificationSettings: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdatePaymentMethodMutationVariables = Exact<{
  name: Scalars['String'];
  paymentID: Scalars['String'];
}>;


export type UpdatePaymentMethodMutation = (
  { __typename?: 'Mutation' }
  & { updatePaymentMethod: (
    { __typename?: 'Group' }
    & GroupPartsFragment
  ) }
);

export type UpdateToolConfigMutationVariables = Exact<{
  toolID: Scalars['String'];
  toolConfig: ToolConfig;
}>;


export type UpdateToolConfigMutation = (
  { __typename?: 'Mutation' }
  & { updateToolConfig: (
    { __typename?: 'GroupToolConfig' }
    & GroupToolConfigPartsFragment
  ) }
);

export type BotPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type BotPlansQuery = (
  { __typename?: 'Query' }
  & { botPlans: Array<(
    { __typename?: 'BotPlan' }
    & BotPlanPartsFragment
  )> }
);

export type BotUrlQueryVariables = Exact<{
  clientID?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
}>;


export type BotUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'botUrl'>
);

export type CouponQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type CouponQuery = (
  { __typename?: 'Query' }
  & { coupon?: Maybe<(
    { __typename?: 'Coupon' }
    & CouponPartsFragment
  )> }
);

export type CreatableGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type CreatableGroupsQuery = (
  { __typename?: 'Query' }
  & { creatableGroups: Array<(
    { __typename?: 'CreatableGroup' }
    & Pick<CreatableGroup, 'id' | 'name' | 'icon'>
  )> }
);

export type GroupQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupQuery = (
  { __typename?: 'Query' }
  & { group?: Maybe<(
    { __typename?: 'Group' }
    & GroupPartsFragment
  )> }
);

export type InvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type InvoicesQuery = (
  { __typename?: 'Query' }
  & { invoices: Array<(
    { __typename?: 'Invoice' }
    & InvoicePartsFragment
  )> }
);

export type OauthUrlQueryVariables = Exact<{
  redirectUrl?: Maybe<Scalars['String']>;
}>;


export type OauthUrlQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'oauthUrl'>
);

export type RecentActivityQueryVariables = Exact<{
  limit?: Maybe<Scalars['Float']>;
}>;


export type RecentActivityQuery = (
  { __typename?: 'Query' }
  & { recentActivity: Array<(
    { __typename?: 'ActivityEntry' }
    & ActivityEntryPartsFragment
  )> }
);

export type SearchMembersQueryVariables = Exact<{
  page?: Maybe<Scalars['Float']>;
  query?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Float']>;
}>;


export type SearchMembersQuery = (
  { __typename?: 'Query' }
  & { searchMembers?: Maybe<(
    { __typename?: 'MemberSearch' }
    & Pick<MemberSearch, 'query' | 'page' | 'itemsPerPage' | 'totalMembers'>
    & { members: Array<(
      { __typename?: 'SearchMember' }
      & SearchMemberPartsFragment
    )> }
  )> }
);

export type SupportServerInviteQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportServerInviteQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'supportServerInvite'>
);

export type ToolsQueryVariables = Exact<{ [key: string]: never; }>;


export type ToolsQuery = (
  { __typename?: 'Query' }
  & { tools: Array<(
    { __typename?: 'Tool' }
    & ToolPartsFragment
  )> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserPartsFragment
  )> }
);

export const GroupAdminPartsFragmentDoc = gql`
    fragment GroupAdminParts on GroupAdmin {
  userID
  groupID
  discordInfo {
    id
    username
    discriminator
    avatar
  }
  isOwner
}
    `;
export const ActivityEntryPartsFragmentDoc = gql`
    fragment ActivityEntryParts on ActivityEntry {
  id
  event
  groupID
  adminID
  admin {
    ...GroupAdminParts
  }
  description
  createdAt
  updatedAt
}
    ${GroupAdminPartsFragmentDoc}`;
export const CouponPartsFragmentDoc = gql`
    fragment CouponParts on Coupon {
  id
  userID
  claimed
  trialPeriodDays
  percentOff
  amountOff
  forever
}
    `;
export const InvoicePartsFragmentDoc = gql`
    fragment InvoiceParts on Invoice {
  date
  amount
  status
  pdfUrl
}
    `;
export const ToolPartsFragmentDoc = gql`
    fragment ToolParts on Tool {
  id
  name
  description
  category
  type
  commandTrigger
  default
  new
  free
  featured
  addableGroupIDs
}
    `;
export const GroupToolConfigPartsFragmentDoc = gql`
    fragment GroupToolConfigParts on GroupToolConfig {
  toolID
  groupID
  tool {
    ...ToolParts
  }
  channels
  channelsAllowed
  roles
  rolesAllowed
}
    ${ToolPartsFragmentDoc}`;
export const PaymentMethodPartsFragmentDoc = gql`
    fragment PaymentMethodParts on PaymentMethod {
  brand
  lastFour
  month
  year
  postalCode
}
    `;
export const SubscriptionPartsFragmentDoc = gql`
    fragment SubscriptionParts on Subscription {
  status
  nextPaymentDate
  nextPaymentAmount
  previousPaymentDate
  previousPaymentAmount
  coupon
}
    `;
export const BotPlanPartsFragmentDoc = gql`
    fragment BotPlanParts on BotPlan {
  id
  name
  price
  active
  stripePriceID
  hierarchy
  highlights
  adminLimit
  allowPaidTools
  customBot
}
    `;
export const ChannelPartsFragmentDoc = gql`
    fragment ChannelParts on DiscordChannel {
  id
  type
  position
  name
  parentID
}
    `;
export const RolePartsFragmentDoc = gql`
    fragment RoleParts on DiscordRole {
  id
  name
  permissions
  mentionable
}
    `;
export const GroupPartsFragmentDoc = gql`
    fragment GroupParts on Group {
  id
  discordInfo {
    id
    name
    icon
  }
  toolConfigs {
    ...GroupToolConfigParts
  }
  paymentMethod {
    ...PaymentMethodParts
  }
  subscription {
    ...SubscriptionParts
  }
  botPlanID
  botPlan {
    ...BotPlanParts
  }
  fnf
  botAdded
  botEnabled
  commandPrefix
  customBotConfigured
  botStatusType
  botStatus
  botClientID
  botUser {
    id
    username
    discriminator
    avatar
  }
  embedColor
  embedFooter
  defaultChannels
  defaultChannelsAllowed
  defaultRoles
  defaultRolesAllowed
  channels {
    ...ChannelParts
  }
  roles {
    ...RoleParts
  }
  admins {
    ...GroupAdminParts
  }
  apiKey
  logChannelID
  announcementsChannelID
  createdAt
}
    ${GroupToolConfigPartsFragmentDoc}
${PaymentMethodPartsFragmentDoc}
${SubscriptionPartsFragmentDoc}
${BotPlanPartsFragmentDoc}
${ChannelPartsFragmentDoc}
${RolePartsFragmentDoc}
${GroupAdminPartsFragmentDoc}`;
export const GroupMemberPartsFragmentDoc = gql`
    fragment GroupMemberParts on GroupMember {
  memberID
  groupID
  group {
    ...GroupParts
  }
  email
  smsNumber
}
    ${GroupPartsFragmentDoc}`;
export const SearchMemberPartsFragmentDoc = gql`
    fragment SearchMemberParts on SearchMember {
  memberID
  username
  discriminator
  avatar
  nick
  roleIDs
  joinedAt
  highestRoleName
  groupMember {
    ...GroupMemberParts
  }
}
    ${GroupMemberPartsFragmentDoc}`;
export const UserGroupPartsFragmentDoc = gql`
    fragment UserGroupParts on UserGroup {
  groupID
  name
  isOwner
  icon
  groupToken
}
    `;
export const UserPartsFragmentDoc = gql`
    fragment UserParts on User {
  id
  discordInfo {
    username
    discriminator
    avatar
  }
  groups {
    ...UserGroupParts
  }
  selectedGroupID
}
    ${UserGroupPartsFragmentDoc}`;
export const AddGroupAdminDocument = gql`
    mutation AddGroupAdmin($userID: String!) {
  addGroupAdmin(userID: $userID) {
    ...GroupAdminParts
  }
}
    ${GroupAdminPartsFragmentDoc}`;
export type AddGroupAdminMutationFn = ApolloReactCommon.MutationFunction<AddGroupAdminMutation, AddGroupAdminMutationVariables>;

/**
 * __useAddGroupAdminMutation__
 *
 * To run a mutation, you first call `useAddGroupAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGroupAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGroupAdminMutation, { data, loading, error }] = useAddGroupAdminMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useAddGroupAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddGroupAdminMutation, AddGroupAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<AddGroupAdminMutation, AddGroupAdminMutationVariables>(AddGroupAdminDocument, baseOptions);
      }
export type AddGroupAdminMutationHookResult = ReturnType<typeof useAddGroupAdminMutation>;
export type AddGroupAdminMutationResult = ApolloReactCommon.MutationResult<AddGroupAdminMutation>;
export type AddGroupAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<AddGroupAdminMutation, AddGroupAdminMutationVariables>;
export const AddToolConfigDocument = gql`
    mutation AddToolConfig($toolID: String!) {
  addToolConfig(toolID: $toolID) {
    ...GroupToolConfigParts
  }
}
    ${GroupToolConfigPartsFragmentDoc}`;
export type AddToolConfigMutationFn = ApolloReactCommon.MutationFunction<AddToolConfigMutation, AddToolConfigMutationVariables>;

/**
 * __useAddToolConfigMutation__
 *
 * To run a mutation, you first call `useAddToolConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToolConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToolConfigMutation, { data, loading, error }] = useAddToolConfigMutation({
 *   variables: {
 *      toolID: // value for 'toolID'
 *   },
 * });
 */
export function useAddToolConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddToolConfigMutation, AddToolConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<AddToolConfigMutation, AddToolConfigMutationVariables>(AddToolConfigDocument, baseOptions);
      }
export type AddToolConfigMutationHookResult = ReturnType<typeof useAddToolConfigMutation>;
export type AddToolConfigMutationResult = ApolloReactCommon.MutationResult<AddToolConfigMutation>;
export type AddToolConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<AddToolConfigMutation, AddToolConfigMutationVariables>;
export const ApplyCouponDocument = gql`
    mutation ApplyCoupon($id: String!) {
  applyCoupon(id: $id) {
    ...CouponParts
  }
}
    ${CouponPartsFragmentDoc}`;
export type ApplyCouponMutationFn = ApolloReactCommon.MutationFunction<ApplyCouponMutation, ApplyCouponMutationVariables>;

/**
 * __useApplyCouponMutation__
 *
 * To run a mutation, you first call `useApplyCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyCouponMutation, { data, loading, error }] = useApplyCouponMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplyCouponMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApplyCouponMutation, ApplyCouponMutationVariables>) {
        return ApolloReactHooks.useMutation<ApplyCouponMutation, ApplyCouponMutationVariables>(ApplyCouponDocument, baseOptions);
      }
export type ApplyCouponMutationHookResult = ReturnType<typeof useApplyCouponMutation>;
export type ApplyCouponMutationResult = ApolloReactCommon.MutationResult<ApplyCouponMutation>;
export type ApplyCouponMutationOptions = ApolloReactCommon.BaseMutationOptions<ApplyCouponMutation, ApplyCouponMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($groupID: String!, $botPlanID: String!, $paymentID: String, $name: String, $coupon: String) {
  createGroup(groupID: $groupID, botPlanID: $botPlanID, paymentID: $paymentID, name: $name, coupon: $coupon) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type CreateGroupMutationFn = ApolloReactCommon.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      groupID: // value for 'groupID'
 *      botPlanID: // value for 'botPlanID'
 *      paymentID: // value for 'paymentID'
 *      name: // value for 'name'
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, baseOptions);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = ApolloReactCommon.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken {
  refreshAccessToken
}
    `;
export type RefreshAccessTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, baseOptions);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = ApolloReactCommon.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const RemoveGroupAdminDocument = gql`
    mutation RemoveGroupAdmin($userID: String!) {
  removeGroupAdmin(userID: $userID) {
    ...GroupAdminParts
  }
}
    ${GroupAdminPartsFragmentDoc}`;
export type RemoveGroupAdminMutationFn = ApolloReactCommon.MutationFunction<RemoveGroupAdminMutation, RemoveGroupAdminMutationVariables>;

/**
 * __useRemoveGroupAdminMutation__
 *
 * To run a mutation, you first call `useRemoveGroupAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveGroupAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeGroupAdminMutation, { data, loading, error }] = useRemoveGroupAdminMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveGroupAdminMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveGroupAdminMutation, RemoveGroupAdminMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveGroupAdminMutation, RemoveGroupAdminMutationVariables>(RemoveGroupAdminDocument, baseOptions);
      }
export type RemoveGroupAdminMutationHookResult = ReturnType<typeof useRemoveGroupAdminMutation>;
export type RemoveGroupAdminMutationResult = ApolloReactCommon.MutationResult<RemoveGroupAdminMutation>;
export type RemoveGroupAdminMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveGroupAdminMutation, RemoveGroupAdminMutationVariables>;
export const RemoveToolConfigDocument = gql`
    mutation RemoveToolConfig($toolID: String!) {
  removeToolConfig(toolID: $toolID) {
    ...GroupToolConfigParts
  }
}
    ${GroupToolConfigPartsFragmentDoc}`;
export type RemoveToolConfigMutationFn = ApolloReactCommon.MutationFunction<RemoveToolConfigMutation, RemoveToolConfigMutationVariables>;

/**
 * __useRemoveToolConfigMutation__
 *
 * To run a mutation, you first call `useRemoveToolConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveToolConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeToolConfigMutation, { data, loading, error }] = useRemoveToolConfigMutation({
 *   variables: {
 *      toolID: // value for 'toolID'
 *   },
 * });
 */
export function useRemoveToolConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveToolConfigMutation, RemoveToolConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveToolConfigMutation, RemoveToolConfigMutationVariables>(RemoveToolConfigDocument, baseOptions);
      }
export type RemoveToolConfigMutationHookResult = ReturnType<typeof useRemoveToolConfigMutation>;
export type RemoveToolConfigMutationResult = ApolloReactCommon.MutationResult<RemoveToolConfigMutation>;
export type RemoveToolConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveToolConfigMutation, RemoveToolConfigMutationVariables>;
export const SetSelectedGroupIdDocument = gql`
    mutation SetSelectedGroupID($selectedGroupID: String!) {
  setSelectedGroupID(selectedGroupID: $selectedGroupID) {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;
export type SetSelectedGroupIdMutationFn = ApolloReactCommon.MutationFunction<SetSelectedGroupIdMutation, SetSelectedGroupIdMutationVariables>;

/**
 * __useSetSelectedGroupIdMutation__
 *
 * To run a mutation, you first call `useSetSelectedGroupIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSelectedGroupIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSelectedGroupIdMutation, { data, loading, error }] = useSetSelectedGroupIdMutation({
 *   variables: {
 *      selectedGroupID: // value for 'selectedGroupID'
 *   },
 * });
 */
export function useSetSelectedGroupIdMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetSelectedGroupIdMutation, SetSelectedGroupIdMutationVariables>) {
        return ApolloReactHooks.useMutation<SetSelectedGroupIdMutation, SetSelectedGroupIdMutationVariables>(SetSelectedGroupIdDocument, baseOptions);
      }
export type SetSelectedGroupIdMutationHookResult = ReturnType<typeof useSetSelectedGroupIdMutation>;
export type SetSelectedGroupIdMutationResult = ApolloReactCommon.MutationResult<SetSelectedGroupIdMutation>;
export type SetSelectedGroupIdMutationOptions = ApolloReactCommon.BaseMutationOptions<SetSelectedGroupIdMutation, SetSelectedGroupIdMutationVariables>;
export const SetupBotDocument = gql`
    mutation SetupBot($clientID: String!, $clientSecret: String!, $token: String!) {
  setupBot(clientID: $clientID, clientSecret: $clientSecret, token: $token) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type SetupBotMutationFn = ApolloReactCommon.MutationFunction<SetupBotMutation, SetupBotMutationVariables>;

/**
 * __useSetupBotMutation__
 *
 * To run a mutation, you first call `useSetupBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetupBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setupBotMutation, { data, loading, error }] = useSetupBotMutation({
 *   variables: {
 *      clientID: // value for 'clientID'
 *      clientSecret: // value for 'clientSecret'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSetupBotMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetupBotMutation, SetupBotMutationVariables>) {
        return ApolloReactHooks.useMutation<SetupBotMutation, SetupBotMutationVariables>(SetupBotDocument, baseOptions);
      }
export type SetupBotMutationHookResult = ReturnType<typeof useSetupBotMutation>;
export type SetupBotMutationResult = ApolloReactCommon.MutationResult<SetupBotMutation>;
export type SetupBotMutationOptions = ApolloReactCommon.BaseMutationOptions<SetupBotMutation, SetupBotMutationVariables>;
export const UpdateBotDocument = gql`
    mutation UpdateBot($botConfig: BotConfig!) {
  updateBot(botConfig: $botConfig) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type UpdateBotMutationFn = ApolloReactCommon.MutationFunction<UpdateBotMutation, UpdateBotMutationVariables>;

/**
 * __useUpdateBotMutation__
 *
 * To run a mutation, you first call `useUpdateBotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBotMutation, { data, loading, error }] = useUpdateBotMutation({
 *   variables: {
 *      botConfig: // value for 'botConfig'
 *   },
 * });
 */
export function useUpdateBotMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBotMutation, UpdateBotMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateBotMutation, UpdateBotMutationVariables>(UpdateBotDocument, baseOptions);
      }
export type UpdateBotMutationHookResult = ReturnType<typeof useUpdateBotMutation>;
export type UpdateBotMutationResult = ApolloReactCommon.MutationResult<UpdateBotMutation>;
export type UpdateBotMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBotMutation, UpdateBotMutationVariables>;
export const UpdateBotPlanDocument = gql`
    mutation UpdateBotPlan($botPlanID: String!) {
  updateBotPlan(botPlanID: $botPlanID) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type UpdateBotPlanMutationFn = ApolloReactCommon.MutationFunction<UpdateBotPlanMutation, UpdateBotPlanMutationVariables>;

/**
 * __useUpdateBotPlanMutation__
 *
 * To run a mutation, you first call `useUpdateBotPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBotPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBotPlanMutation, { data, loading, error }] = useUpdateBotPlanMutation({
 *   variables: {
 *      botPlanID: // value for 'botPlanID'
 *   },
 * });
 */
export function useUpdateBotPlanMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBotPlanMutation, UpdateBotPlanMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateBotPlanMutation, UpdateBotPlanMutationVariables>(UpdateBotPlanDocument, baseOptions);
      }
export type UpdateBotPlanMutationHookResult = ReturnType<typeof useUpdateBotPlanMutation>;
export type UpdateBotPlanMutationResult = ApolloReactCommon.MutationResult<UpdateBotPlanMutation>;
export type UpdateBotPlanMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateBotPlanMutation, UpdateBotPlanMutationVariables>;
export const UpdateDefaultToolConfigDocument = gql`
    mutation UpdateDefaultToolConfig($defaultToolConfig: DefaultToolConfig!) {
  updateDefaultToolConfig(defaultToolConfig: $defaultToolConfig) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type UpdateDefaultToolConfigMutationFn = ApolloReactCommon.MutationFunction<UpdateDefaultToolConfigMutation, UpdateDefaultToolConfigMutationVariables>;

/**
 * __useUpdateDefaultToolConfigMutation__
 *
 * To run a mutation, you first call `useUpdateDefaultToolConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDefaultToolConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDefaultToolConfigMutation, { data, loading, error }] = useUpdateDefaultToolConfigMutation({
 *   variables: {
 *      defaultToolConfig: // value for 'defaultToolConfig'
 *   },
 * });
 */
export function useUpdateDefaultToolConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDefaultToolConfigMutation, UpdateDefaultToolConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateDefaultToolConfigMutation, UpdateDefaultToolConfigMutationVariables>(UpdateDefaultToolConfigDocument, baseOptions);
      }
export type UpdateDefaultToolConfigMutationHookResult = ReturnType<typeof useUpdateDefaultToolConfigMutation>;
export type UpdateDefaultToolConfigMutationResult = ApolloReactCommon.MutationResult<UpdateDefaultToolConfigMutation>;
export type UpdateDefaultToolConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateDefaultToolConfigMutation, UpdateDefaultToolConfigMutationVariables>;
export const UpdateNotificationSettingsDocument = gql`
    mutation UpdateNotificationSettings($logChannelID: String, $announcementsChannelID: String) {
  updateNotificationSettings(logChannelID: $logChannelID, announcementsChannelID: $announcementsChannelID) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type UpdateNotificationSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>;

/**
 * __useUpdateNotificationSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationSettingsMutation, { data, loading, error }] = useUpdateNotificationSettingsMutation({
 *   variables: {
 *      logChannelID: // value for 'logChannelID'
 *      announcementsChannelID: // value for 'announcementsChannelID'
 *   },
 * });
 */
export function useUpdateNotificationSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>(UpdateNotificationSettingsDocument, baseOptions);
      }
export type UpdateNotificationSettingsMutationHookResult = ReturnType<typeof useUpdateNotificationSettingsMutation>;
export type UpdateNotificationSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateNotificationSettingsMutation>;
export type UpdateNotificationSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>;
export const UpdatePaymentMethodDocument = gql`
    mutation UpdatePaymentMethod($name: String!, $paymentID: String!) {
  updatePaymentMethod(name: $name, paymentID: $paymentID) {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;
export type UpdatePaymentMethodMutationFn = ApolloReactCommon.MutationFunction<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>;

/**
 * __useUpdatePaymentMethodMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMethodMutation, { data, loading, error }] = useUpdatePaymentMethodMutation({
 *   variables: {
 *      name: // value for 'name'
 *      paymentID: // value for 'paymentID'
 *   },
 * });
 */
export function useUpdatePaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>(UpdatePaymentMethodDocument, baseOptions);
      }
export type UpdatePaymentMethodMutationHookResult = ReturnType<typeof useUpdatePaymentMethodMutation>;
export type UpdatePaymentMethodMutationResult = ApolloReactCommon.MutationResult<UpdatePaymentMethodMutation>;
export type UpdatePaymentMethodMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePaymentMethodMutation, UpdatePaymentMethodMutationVariables>;
export const UpdateToolConfigDocument = gql`
    mutation UpdateToolConfig($toolID: String!, $toolConfig: ToolConfig!) {
  updateToolConfig(toolID: $toolID, toolConfig: $toolConfig) {
    ...GroupToolConfigParts
  }
}
    ${GroupToolConfigPartsFragmentDoc}`;
export type UpdateToolConfigMutationFn = ApolloReactCommon.MutationFunction<UpdateToolConfigMutation, UpdateToolConfigMutationVariables>;

/**
 * __useUpdateToolConfigMutation__
 *
 * To run a mutation, you first call `useUpdateToolConfigMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToolConfigMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToolConfigMutation, { data, loading, error }] = useUpdateToolConfigMutation({
 *   variables: {
 *      toolID: // value for 'toolID'
 *      toolConfig: // value for 'toolConfig'
 *   },
 * });
 */
export function useUpdateToolConfigMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateToolConfigMutation, UpdateToolConfigMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateToolConfigMutation, UpdateToolConfigMutationVariables>(UpdateToolConfigDocument, baseOptions);
      }
export type UpdateToolConfigMutationHookResult = ReturnType<typeof useUpdateToolConfigMutation>;
export type UpdateToolConfigMutationResult = ApolloReactCommon.MutationResult<UpdateToolConfigMutation>;
export type UpdateToolConfigMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateToolConfigMutation, UpdateToolConfigMutationVariables>;
export const BotPlansDocument = gql`
    query BotPlans {
  botPlans {
    ...BotPlanParts
  }
}
    ${BotPlanPartsFragmentDoc}`;

/**
 * __useBotPlansQuery__
 *
 * To run a query within a React component, call `useBotPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useBotPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBotPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useBotPlansQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BotPlansQuery, BotPlansQueryVariables>) {
        return ApolloReactHooks.useQuery<BotPlansQuery, BotPlansQueryVariables>(BotPlansDocument, baseOptions);
      }
export function useBotPlansLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BotPlansQuery, BotPlansQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BotPlansQuery, BotPlansQueryVariables>(BotPlansDocument, baseOptions);
        }
export type BotPlansQueryHookResult = ReturnType<typeof useBotPlansQuery>;
export type BotPlansLazyQueryHookResult = ReturnType<typeof useBotPlansLazyQuery>;
export type BotPlansQueryResult = ApolloReactCommon.QueryResult<BotPlansQuery, BotPlansQueryVariables>;
export const BotUrlDocument = gql`
    query BotUrl($clientID: String, $redirectUrl: String) {
  botUrl(clientID: $clientID, redirectUrl: $redirectUrl)
}
    `;

/**
 * __useBotUrlQuery__
 *
 * To run a query within a React component, call `useBotUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useBotUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBotUrlQuery({
 *   variables: {
 *      clientID: // value for 'clientID'
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useBotUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BotUrlQuery, BotUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<BotUrlQuery, BotUrlQueryVariables>(BotUrlDocument, baseOptions);
      }
export function useBotUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BotUrlQuery, BotUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<BotUrlQuery, BotUrlQueryVariables>(BotUrlDocument, baseOptions);
        }
export type BotUrlQueryHookResult = ReturnType<typeof useBotUrlQuery>;
export type BotUrlLazyQueryHookResult = ReturnType<typeof useBotUrlLazyQuery>;
export type BotUrlQueryResult = ApolloReactCommon.QueryResult<BotUrlQuery, BotUrlQueryVariables>;
export const CouponDocument = gql`
    query Coupon($id: String!) {
  coupon(id: $id) {
    ...CouponParts
  }
}
    ${CouponPartsFragmentDoc}`;

/**
 * __useCouponQuery__
 *
 * To run a query within a React component, call `useCouponQuery` and pass it any options that fit your needs.
 * When your component renders, `useCouponQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCouponQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCouponQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CouponQuery, CouponQueryVariables>) {
        return ApolloReactHooks.useQuery<CouponQuery, CouponQueryVariables>(CouponDocument, baseOptions);
      }
export function useCouponLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CouponQuery, CouponQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CouponQuery, CouponQueryVariables>(CouponDocument, baseOptions);
        }
export type CouponQueryHookResult = ReturnType<typeof useCouponQuery>;
export type CouponLazyQueryHookResult = ReturnType<typeof useCouponLazyQuery>;
export type CouponQueryResult = ApolloReactCommon.QueryResult<CouponQuery, CouponQueryVariables>;
export const CreatableGroupsDocument = gql`
    query CreatableGroups {
  creatableGroups {
    id
    name
    icon
  }
}
    `;

/**
 * __useCreatableGroupsQuery__
 *
 * To run a query within a React component, call `useCreatableGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatableGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatableGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreatableGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CreatableGroupsQuery, CreatableGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<CreatableGroupsQuery, CreatableGroupsQueryVariables>(CreatableGroupsDocument, baseOptions);
      }
export function useCreatableGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CreatableGroupsQuery, CreatableGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CreatableGroupsQuery, CreatableGroupsQueryVariables>(CreatableGroupsDocument, baseOptions);
        }
export type CreatableGroupsQueryHookResult = ReturnType<typeof useCreatableGroupsQuery>;
export type CreatableGroupsLazyQueryHookResult = ReturnType<typeof useCreatableGroupsLazyQuery>;
export type CreatableGroupsQueryResult = ApolloReactCommon.QueryResult<CreatableGroupsQuery, CreatableGroupsQueryVariables>;
export const GroupDocument = gql`
    query Group {
  group {
    ...GroupParts
  }
}
    ${GroupPartsFragmentDoc}`;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        return ApolloReactHooks.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
      }
export function useGroupLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, baseOptions);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = ApolloReactCommon.QueryResult<GroupQuery, GroupQueryVariables>;
export const InvoicesDocument = gql`
    query Invoices {
  invoices {
    ...InvoiceParts
  }
}
    ${InvoicePartsFragmentDoc}`;

/**
 * __useInvoicesQuery__
 *
 * To run a query within a React component, call `useInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InvoicesQuery, InvoicesQueryVariables>) {
        return ApolloReactHooks.useQuery<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, baseOptions);
      }
export function useInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InvoicesQuery, InvoicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<InvoicesQuery, InvoicesQueryVariables>(InvoicesDocument, baseOptions);
        }
export type InvoicesQueryHookResult = ReturnType<typeof useInvoicesQuery>;
export type InvoicesLazyQueryHookResult = ReturnType<typeof useInvoicesLazyQuery>;
export type InvoicesQueryResult = ApolloReactCommon.QueryResult<InvoicesQuery, InvoicesQueryVariables>;
export const OauthUrlDocument = gql`
    query OauthUrl($redirectUrl: String) {
  oauthUrl(redirectUrl: $redirectUrl, client: "WEB")
}
    `;

/**
 * __useOauthUrlQuery__
 *
 * To run a query within a React component, call `useOauthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useOauthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOauthUrlQuery({
 *   variables: {
 *      redirectUrl: // value for 'redirectUrl'
 *   },
 * });
 */
export function useOauthUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OauthUrlQuery, OauthUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<OauthUrlQuery, OauthUrlQueryVariables>(OauthUrlDocument, baseOptions);
      }
export function useOauthUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OauthUrlQuery, OauthUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OauthUrlQuery, OauthUrlQueryVariables>(OauthUrlDocument, baseOptions);
        }
export type OauthUrlQueryHookResult = ReturnType<typeof useOauthUrlQuery>;
export type OauthUrlLazyQueryHookResult = ReturnType<typeof useOauthUrlLazyQuery>;
export type OauthUrlQueryResult = ApolloReactCommon.QueryResult<OauthUrlQuery, OauthUrlQueryVariables>;
export const RecentActivityDocument = gql`
    query RecentActivity($limit: Float) {
  recentActivity(limit: $limit) {
    ...ActivityEntryParts
  }
}
    ${ActivityEntryPartsFragmentDoc}`;

/**
 * __useRecentActivityQuery__
 *
 * To run a query within a React component, call `useRecentActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentActivityQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRecentActivityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecentActivityQuery, RecentActivityQueryVariables>) {
        return ApolloReactHooks.useQuery<RecentActivityQuery, RecentActivityQueryVariables>(RecentActivityDocument, baseOptions);
      }
export function useRecentActivityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecentActivityQuery, RecentActivityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RecentActivityQuery, RecentActivityQueryVariables>(RecentActivityDocument, baseOptions);
        }
export type RecentActivityQueryHookResult = ReturnType<typeof useRecentActivityQuery>;
export type RecentActivityLazyQueryHookResult = ReturnType<typeof useRecentActivityLazyQuery>;
export type RecentActivityQueryResult = ApolloReactCommon.QueryResult<RecentActivityQuery, RecentActivityQueryVariables>;
export const SearchMembersDocument = gql`
    query SearchMembers($page: Float, $query: String, $limit: Float) {
  searchMembers(page: $page, query: $query, limit: $limit) {
    query
    page
    itemsPerPage
    totalMembers
    members {
      ...SearchMemberParts
    }
  }
}
    ${SearchMemberPartsFragmentDoc}`;

/**
 * __useSearchMembersQuery__
 *
 * To run a query within a React component, call `useSearchMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMembersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, baseOptions);
      }
export function useSearchMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, baseOptions);
        }
export type SearchMembersQueryHookResult = ReturnType<typeof useSearchMembersQuery>;
export type SearchMembersLazyQueryHookResult = ReturnType<typeof useSearchMembersLazyQuery>;
export type SearchMembersQueryResult = ApolloReactCommon.QueryResult<SearchMembersQuery, SearchMembersQueryVariables>;
export const SupportServerInviteDocument = gql`
    query SupportServerInvite {
  supportServerInvite
}
    `;

/**
 * __useSupportServerInviteQuery__
 *
 * To run a query within a React component, call `useSupportServerInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSupportServerInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSupportServerInviteQuery({
 *   variables: {
 *   },
 * });
 */
export function useSupportServerInviteQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SupportServerInviteQuery, SupportServerInviteQueryVariables>) {
        return ApolloReactHooks.useQuery<SupportServerInviteQuery, SupportServerInviteQueryVariables>(SupportServerInviteDocument, baseOptions);
      }
export function useSupportServerInviteLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SupportServerInviteQuery, SupportServerInviteQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SupportServerInviteQuery, SupportServerInviteQueryVariables>(SupportServerInviteDocument, baseOptions);
        }
export type SupportServerInviteQueryHookResult = ReturnType<typeof useSupportServerInviteQuery>;
export type SupportServerInviteLazyQueryHookResult = ReturnType<typeof useSupportServerInviteLazyQuery>;
export type SupportServerInviteQueryResult = ApolloReactCommon.QueryResult<SupportServerInviteQuery, SupportServerInviteQueryVariables>;
export const ToolsDocument = gql`
    query Tools {
  tools {
    ...ToolParts
  }
}
    ${ToolPartsFragmentDoc}`;

/**
 * __useToolsQuery__
 *
 * To run a query within a React component, call `useToolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useToolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useToolsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ToolsQuery, ToolsQueryVariables>) {
        return ApolloReactHooks.useQuery<ToolsQuery, ToolsQueryVariables>(ToolsDocument, baseOptions);
      }
export function useToolsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ToolsQuery, ToolsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ToolsQuery, ToolsQueryVariables>(ToolsDocument, baseOptions);
        }
export type ToolsQueryHookResult = ReturnType<typeof useToolsQuery>;
export type ToolsLazyQueryHookResult = ReturnType<typeof useToolsLazyQuery>;
export type ToolsQueryResult = ApolloReactCommon.QueryResult<ToolsQuery, ToolsQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    ...UserParts
  }
}
    ${UserPartsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;