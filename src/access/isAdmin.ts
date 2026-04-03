import type { User } from '@/payload-types'

export const isAdmin = (user: null | undefined | User): boolean =>
  Boolean(user?.roles?.includes('admin'))
