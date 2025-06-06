import { getCurrentUser } from '@/actions/auth';
import { getScheduleById } from '@/actions/schedules';
import { redirect } from 'next/navigation';

import { AttendanceGreetings } from './components/AttendanceGreetings';

async function Attendance({ params }) {
  const user = await getCurrentUser();
  const { id } = await params;
  const [error, event] = await getScheduleById(id);

  if (error || !event || !user) return redirect('/profile');

  return <AttendanceGreetings event={event} user={user} />;
}

export default Attendance;
