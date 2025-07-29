import { AdminViewServerProps } from 'payload';

export default async function AdminSundaySchedules(props: AdminViewServerProps) {
  const { payload } = props;

  const schedules = await payload
    .find({
      collection: 'schedules',
      where: {
        'scheduleTag.tag': {
          equals: 'Sunday Service',
        }
      }
    })
    .then(result => result.docs)

  console.log(JSON.stringify(schedules, null, 2));

  return (
    <>
      <div>Sunday Schedules - {schedules.length}</div>
      {schedules.map(schedule => (
        <div key={schedule.id}>
          {schedule.title} - {schedule.date} - {schedule.location}
        </div>
      ))}
    </>
  );
}
