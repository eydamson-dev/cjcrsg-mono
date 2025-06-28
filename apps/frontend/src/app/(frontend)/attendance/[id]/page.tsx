import { getCurrentUser } from '@/actions/auth';
import { confirmAttendance, getScheduleById } from '@/actions/schedules';
import { Schedule, User } from '@/payload-types';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AttendanceGreetings } from './components/AttendanceGreetings';

async function Attendance({ params }) {
  const user = await getCurrentUser();
  const { id } = await params;
  const [error, event] = await getScheduleById(id);

  if (error || !event || !user) return redirect('/profile');

  const [errorAttendance] = await confirmUserAttendance({ user, event });

  if (errorAttendance) return <div>Erorr encountered</div>;

  return <AttendanceGreetings event={event} user={user} />;
}

async function confirmUserAttendance({
  user,
  event,
}: {
  user: User;
  event: Schedule;
}): Promise<[Error | null, Schedule | null]> {
  return await confirmAttendance(event, user);
}

export function generateMetadata(): Metadata {
  return {
    title: 'Attendance',
  };
}

export default Attendance;
