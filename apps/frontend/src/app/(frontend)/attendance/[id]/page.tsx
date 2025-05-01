import {
  getScheduleById,
} from '@/actions/schedules';

async function Attendance({ params }) {
  const { id } = await params;
  const event = await getScheduleById(id);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Attendance</h1>
      <h2>Event Date: {new Date(event.date).toLocaleDateString()}</h2>
      <h2>Event: {event.eventName}</h2>
      <p>Description: {event.description}</p>
    </div>
  );
}

export default Attendance;
