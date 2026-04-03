import type { Access } from 'payload'

import { isAdmin } from './isAdmin'

export const publishedProjectsRead: Access = ({ req: { user } }) => {
  if (isAdmin(user)) {
    return true
  }

  return {
    status: {
      equals: 'published',
    },
  }
}
