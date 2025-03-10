import { GatsbyImageFluidProps, GatsbyImageProps } from 'gatsby-image'
import React from 'react'

// Generic types
export type Subset<T extends U, U> = U

/**
 * Stuff that goes inside of the parent component
 */
export type ReactChildren = React.ReactNode | React.ReactNodeArray

// Data types used throughout the app

export interface IRole {
  name: string
}

export interface IPost {
  html?: string
  excerpt?: string
  frontmatter: {
    slug: string
    title?: string
    coverPhoto?: { childImageSharp: GatsbyImageProps }
    authors?: IMember[]
    customExcerpt?: string
    publishedAt?: string
    draft?: boolean
  }
  timeToRead?: number
}

export interface IMember {
  name: string
  major?: string
  school?: string
  photo?: string
  roles: string[]
  pennkey: string
  semester_joined?: string
  alumnus: boolean
  bio?: string
  github?: string
  graduation_year?: string
  linkedin?: string
  hometown?: string
  team?: string
  website?: string
  localImage?: { childImageSharp: GatsbyImageFluidProps }
  posts?: IPost[]
}

export interface ITeam {
  name: string
  description: string
  members: IMember[]
}

export interface IGhostTag {
  slug: string
  name: string
  description?: string
  feature_image?: string
}

export interface IGhostAuthor {
  slug: string
  name?: string
}

export interface IGhostPost {
  slug: string
  title: string
  excerpt?: string
  feature_image?: string
  localImage?: { childImageSharp: GatsbyImageProps }
  reading_time?: number
  published_at?: string
  tags?: IGhostTag[]
  authors?: IGhostAuthor[]
  html?: string
  codeinjection_head?: string
  codeinjection_foot?: string
}
