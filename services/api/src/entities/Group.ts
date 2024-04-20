import { Field, ObjectType, registerEnumType } from 'type-graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import BotStatusType from '../types/BotStatusType'
import { ActivityEntry } from './ActivityEntry'
import { BotPlan } from './BotPlan'
import { GroupAdmin } from './GroupAdmin'
import { GroupMember } from './GroupMember'
import { GroupResource } from './GroupRescource'
import { GroupToolConfig } from './GroupToolConfig'
import { KeywordPingerEntry } from './KeywordPingerEntry'
import { LoyaltyAutoAddConfig } from './LoyaltyAutoAddConfig'
import { LoyaltyPrize } from './LoyaltyPrize'
import { LoyaltyPrizeClaim } from './LoyaltyPrizeClaims'
import { LoyaltyReactionConfig } from './LoyaltyReactionConfig'
import { ReactionRole } from './ReactionRole'
import SubEntity from './SubEntity'
import { SuccessTweet } from './SuccessTweet'
import { Ticket } from './Ticket'

registerEnumType(BotStatusType, { name: 'StatusType' })

@ObjectType()
@Entity('groups')
export class Group extends SubEntity {
  @Field()
  @PrimaryColumn()
  id: string

  @Field()
  @Column()
  ownerID: string

  @OneToMany(() => GroupMember, (member) => member.group, { onDelete: 'CASCADE' })
  members: Promise<GroupMember[]>

  @Field(() => [GroupAdmin])
  @OneToMany(() => GroupAdmin, (admin) => admin.group, { onDelete: 'CASCADE' })
  admins: Promise<GroupAdmin[]>

  @Field(() => [GroupToolConfig])
  @OneToMany(() => GroupToolConfig, (tool) => tool.group, { onDelete: 'CASCADE' })
  toolConfigs: Promise<GroupToolConfig[]>

  @Field(() => [ActivityEntry])
  @OneToMany(() => ActivityEntry, (entry) => entry.group, { onDelete: 'CASCADE' })
  activityEntries: Promise<ActivityEntry[]>

  @Field(() => [GroupResource])
  @OneToMany(() => GroupResource, (resource) => resource.group, { onDelete: 'CASCADE' })
  resources: Promise<GroupResource[]>

  @OneToMany(() => SuccessTweet, (tweet) => tweet.group, { onDelete: 'CASCADE' })
  successTweets: Promise<SuccessTweet[]>

  @Field(() => [ReactionRole])
  @OneToMany(() => ReactionRole, (reactionRole) => reactionRole.group, { onDelete: 'CASCADE' })
  reactionRoles: Promise<ReactionRole[]>

  @OneToMany(() => Ticket, (ticket) => ticket.group, { onDelete: 'CASCADE' })
  tickets: Promise<Ticket[]>

  @Field(() => [KeywordPingerEntry])
  @OneToMany(() => KeywordPingerEntry, (ticket) => ticket.group, { onDelete: 'CASCADE' })
  keywordPingerEntries: Promise<KeywordPingerEntry[]>

  @Field(() => [LoyaltyAutoAddConfig])
  @OneToMany(() => LoyaltyAutoAddConfig, (config) => config.group, { onDelete: 'CASCADE' })
  loyaltyAutoAddConfigs: Promise<LoyaltyAutoAddConfig[]>

  @Field(() => [LoyaltyPrize])
  @OneToMany(() => LoyaltyPrize, (prize) => prize.group, { onDelete: 'CASCADE' })
  loyaltyPrizes: Promise<LoyaltyPrize[]>

  @OneToMany(() => LoyaltyPrizeClaim, (prizeClaim) => prizeClaim.group, { onDelete: 'CASCADE' })
  loyaltyPrizeClaims: Promise<LoyaltyPrizeClaim[]>

  @Field(() => [LoyaltyReactionConfig])
  @OneToMany(() => LoyaltyReactionConfig, (config) => config.group, { onDelete: 'CASCADE' })
  loyaltyReactionConfigs: Promise<LoyaltyReactionConfig[]>

  @Field()
  @Column()
  customerID: string

  @Field()
  @Column()
  subscriptionID: string

  @Column({ nullable: true })
  @Field({ nullable: true })
  botPlanID?: string
  @Field(() => BotPlan, { nullable: true })
  @ManyToOne(() => BotPlan, (plan) => plan.groups, { nullable: true })
  @JoinColumn({ name: 'bot_plan_id' })
  botPlan?: Promise<BotPlan>

  @Field(() => Boolean)
  @Column({ default: false })
  fnf: boolean

  @Field(() => Boolean)
  @Column({ default: false })
  botAdded: boolean

  @Field(() => Boolean)
  @Column({ default: true })
  botEnabled: boolean

  @Field(() => Boolean)
  @Column({ default: false })
  customBotConfigured: boolean

  @Field({ nullable: true })
  @Column({ nullable: true })
  botStatus?: string

  @Field(() => BotStatusType, { nullable: true })
  @Column({ nullable: true, type: 'enum', enum: BotStatusType })
  botStatusType?: string

  @Field({ nullable: true })
  @Column({ nullable: true, unique: true })
  botClientID?: string

  @Column({ nullable: true, unique: true })
  botClientSecret?: string

  @Column({ nullable: true, unique: true })
  botToken?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  embedColor?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  embedFooter?: string

  @Field()
  @Column({ default: '!' })
  commandPrefix: string

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  defaultChannels: string[]

  @Field(() => Boolean)
  @Column({ default: true })
  defaultChannelsAllowed: boolean

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  defaultRoles: string[]

  @Field(() => Boolean)
  @Column({ default: true })
  defaultRolesAllowed: boolean

  @Field()
  @Column()
  apiKey: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  logChannelID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  announcementsChannelID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitterAccessToken?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  twitterAccessSecret?: string

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  successChannels: string[]

  @Field()
  @Column({ default: true })
  sendFollowUpSuccessMessage: boolean

  @Field()
  @Column({ default: true })
  allowSuccessDelete: boolean

  @Field()
  @Column({ default: 'Success from <user> posted in <group>' })
  successMessageFormat: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  twilioConnectAccountSID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  twilioNotifyServiceSID?: string

  @Field(() => [String])
  @Column({ type: 'simple-array', default: '' })
  smsSendRoles: string[]

  @Field({ nullable: true })
  @Column({ nullable: true })
  loyaltyLogsChannelID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  messageLogsChannelID?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  joinLeaveLogChannelID?: string
}
