import ActivityEvent from '../../types/ActivityEvent'

const activityDescriptions: {
  [E in ActivityEvent]: (info?: string) => string
} = {
  [ActivityEvent.CREATED_GROUP]: () => 'Created this group',
  [ActivityEvent.UPDATED_BOT]: () => 'Updated bot settings',
  [ActivityEvent.ADDED_TOOL]: (info) => `Added "${info}" to tools`,
  [ActivityEvent.REMOVED_TOOL]: (info) => `Removed "${info}" from tools`,
  [ActivityEvent.UPDATED_TOOL]: (info) => `Updated settings for tool "${info}"`,
  [ActivityEvent.APPLIED_COUPON]: (info) => `Applied coupon ${info}`,
  [ActivityEvent.UPDATED_PAYMENT]: () => 'Updated default payment method',
  [ActivityEvent.ADDED_ADMIN]: (info) => `Added ${info} as a group admin`,
  [ActivityEvent.REMOVED_ADMIN]: (info) => `Removed ${info} as a group admin`,
  [ActivityEvent.UPDATED_NOTIFICATIONS_SETTINGS]: () => 'Updated in-server notification settings',
  [ActivityEvent.UPDATED_DEFAULT_COMMAND_SETTINGS]: () => 'Updated default command settings',
  [ActivityEvent.UPDATED_BOT_PLAN]: (info) => `Updated bot plan to ${info}`
}

export default activityDescriptions
