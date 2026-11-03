export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'whatsapp'

export interface SocialLink {
  platform: SocialPlatform
  url: string
  label: string
  handle?: string
}