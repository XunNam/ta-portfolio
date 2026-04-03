import type { Media } from '@/payload-types'

export const getMediaURL = (media: Media | null | string | undefined): null | string => {
  if (typeof media === 'string' || !media) {
    return null
  }

  return media.url || null
}
