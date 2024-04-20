/* eslint-disable */
import { gql } from '@apollo/client/core';
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


export const NumCustomInstancesDocument = gql`
    query NumCustomInstances {
  numCustomInstances
}
    `;