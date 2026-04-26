export interface Package {
  id: string
  name: string
  description: string
  version: string
  weeklyDownloads: number
  totalDownloads: number
  license: string
  tags: string[]
  npm: string
  github: string
  homepage?: string
  publishedAt: string
  color: string
  icon: string
}

export interface SiteData {
  author: {
    name: string
    github: string
    website: string
    npm: string
    tagline: string
  }
  meta: {
    title: string
    description: string
    verifiedAt: string
  }
}
