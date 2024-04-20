/* Updated activityDescriptions in ./utils/constants/activityDescriptions */

enum ActivityEvent {
  CREATED_GROUP = 'created_group',
  UPDATED_BOT = 'updated_bot',
  ADDED_TOOL = 'added_tool',
  REMOVED_TOOL = 'removed_tool',
  UPDATED_TOOL = 'updated_tool',
  APPLIED_COUPON = 'applied_coupon',
  UPDATED_PAYMENT = 'updated_payment',
  ADDED_ADMIN = 'added_admin',
  REMOVED_ADMIN = 'removed_admin',
  UPDATED_NOTIFICATIONS_SETTINGS = 'updated_notifications_settings',
  UPDATED_DEFAULT_COMMAND_SETTINGS = 'updated_default_command_settings',
  UPDATED_BOT_PLAN = 'updated_bot_plan'
}

export default ActivityEvent
