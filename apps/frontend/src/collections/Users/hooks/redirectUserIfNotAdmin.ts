import { User } from '@/payload-types';

export default function redirectUserIfNotAdmin(args: { user: User }) {
  console.log({args})
  const user = args.user;
  if (user.role !== 'admin') {
    //throw new Error('Hey no login non admin!');
  }

  return user;
}
