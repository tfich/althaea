export interface InstagramMeta {
  config: Config
  country_code: string
  language_code: string
  locale: string
  entry_data: EntryData
  hostname: string
  is_whitelisted_crawl_bot: boolean
  deployment_stage: string
  platform: string
  nonce: string
  mid_pct: number
  zero_data: ServerChecks
  cache_schema_version: number
  server_checks: ServerChecks
  knobx: { [key: string]: boolean }
  to_cache: ToCache
  device_id: string
  encryption: Encryption
  is_dev: boolean
  rollout_hash: string
  bundle_variant: string
  frontend_env: string
}

export interface Config {
  csrf_token: string
  viewer: null
  viewerId: null
}

export interface Encryption {
  key_id: string
  public_key: string
  version: string
}

export interface EntryData {
  ProfilePage: ProfilePage[]
}

export interface ProfilePage {
  logging_page_id: string
  show_suggested_profiles: boolean
  show_follow_dialog: boolean
  graphql: Graphql
  toast_content_on_load: null
}

export interface Graphql {
  user: User
}

export interface User {
  biography: string
  blocked_by_viewer: boolean
  restricted_by_viewer: null
  country_block: boolean
  external_url: string
  external_url_linkshimmed: string
  edge_followed_by: EdgeFollowClass
  followed_by_viewer: boolean
  edge_follow: EdgeFollowClass
  follows_viewer: boolean
  full_name: string
  has_ar_effects: boolean
  has_channel: boolean
  has_blocked_viewer: boolean
  highlight_reel_count: number
  has_requested_viewer: boolean
  id: string
  is_business_account: boolean
  is_joined_recently: boolean
  business_category_name: string
  overall_category_name: null
  category_enum: string
  is_private: boolean
  is_verified: boolean
  edge_mutual_followed_by: EdgeMutualFollowedBy
  profile_pic_url: string
  profile_pic_url_hd: string
  requested_by_viewer: boolean
  username: string
  connected_fb_page: null
  edge_felix_video_timeline: EdgeFelixVideoTimelineClass
  edge_owner_to_timeline_media: EdgeFelixVideoTimelineClass
  edge_saved_media: EdgeFelixVideoTimelineClass
  edge_media_collections: EdgeFelixVideoTimelineClass
  edge_related_profiles: EdgeRelatedProfilesClass
}

export interface EdgeFelixVideoTimelineClass {
  count: number
  page_info: PageInfo
  edges: EdgeFelixVideoTimelineEdge[]
}

export interface EdgeFelixVideoTimelineEdge {
  node: PurpleNode
}

export interface PurpleNode {
  __typename: Typename
  id: string
  shortcode: string
  dimensions: Dimensions
  display_url: string
  gating_info: null
  fact_check_overall_rating: null
  fact_check_information: null
  media_overlay_info: null
  media_preview: string
  owner: Owner
  is_video: boolean
  accessibility_caption: null | string
  edge_media_to_caption: EdgeRelatedProfilesClass
  edge_media_to_comment: EdgeFollowClass
  comments_disabled: boolean
  taken_at_timestamp: number
  edge_liked_by: EdgeFollowClass
  edge_media_preview_like: EdgeFollowClass
  location: null
  thumbnail_src: string
  thumbnail_resources: ThumbnailResource[]
  felix_profile_grid_crop?: FelixProfileGridCrop | null
  encoding_status?: null
  is_published?: boolean
  product_type?: ProductType
  title?: string
  video_duration?: number
  video_view_count?: number
}

export enum Typename {
  GraphImage = 'GraphImage',
  GraphVideo = 'GraphVideo'
}

export interface Dimensions {
  height: number
  width: number
}

export interface EdgeFollowClass {
  count: number
}

export interface EdgeRelatedProfilesClass {
  edges: EdgeRelatedProfilesEdge[]
}

export interface EdgeRelatedProfilesEdge {
  node: FluffyNode
}

export interface FluffyNode {
  text: string
}

export interface FelixProfileGridCrop {
  crop_left: number
  crop_right: number
  crop_top: number
  crop_bottom: number
}

export interface Owner {
  id: string
  username: string
}

export enum ProductType {
  Igtv = 'igtv'
}

export interface ThumbnailResource {
  src: string
  config_width: number
  config_height: number
}

export interface PageInfo {
  has_next_page: boolean
  end_cursor: null | string
}

export interface EdgeMutualFollowedBy {
  count: number
  edges: any[]
}

export interface ServerChecks {}

export interface ToCache {
  gatekeepers: { [key: string]: boolean }
  qe: { [key: string]: string }
  probably_has_app: boolean
  cb: boolean
}
