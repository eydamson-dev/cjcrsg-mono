
import type { AccessArgs } from 'payload'

import type { User } from '@/payload-types'

type isUserAdmin = (args: AccessArgs<User>) => boolean

export const admin: isUserAdmin = ({ req: { user } }) => {
  return user?.role === 'admin'
}
