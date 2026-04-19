export interface Package {
  id: string
  name: string
  description: string
  version: string
  downloads: string
  license: string
  tags: string[]
  npm: string
  github: string
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
  }
}
