import { User } from '@/payload-types'

export default (args: { user: User }) => {
  const user = args.user
  if (user.role !== 'admin') {
    throw new Error('Hey no login non admin!')
  }

  return user
}
