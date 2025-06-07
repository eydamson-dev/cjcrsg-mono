'use server';

import { PaginatedDocs } from 'payload';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { safeAwait } from '@/lib/utils/safeAwait';
import { Schedule, User } from '@/payload-types';

export const getSchedules = async (): Promise<PaginatedDocs<Schedule>> => {
  const payload = await getPayloadClient();
  const events = await payload.find({ collection: 'schedules', limit: 50 });
  return events;
};

export const getScheduleById = async (id: string): Promise<[Error | null, Schedule | null]> => {
  const payload = await getPayloadClient();
  const data = await safeAwait<Schedule>(
    payload.findByID({
      collection: 'schedules',
      id,
    })
  );

  return data;
};

export const confirmAttendance = async (
  event: Schedule,
  user: User
): Promise<[Error | null, Schedule | null]> => {
  const payload = await getPayloadClient();
  const attendees = event.attendees?.map((attendee: User) => attendee.id);
  const hasAttendance = attendees?.includes(user.id);

  if (!hasAttendance) {
    attendees?.push(user.id);
    const [error, data] = await safeAwait(
      payload.update({
        collection: 'schedules',
        id: event.id,
        data: {
          attendees,
        },
      })
    );

    if (!error) {
      console.log(`Attendance confirmed for event: ${event.title}`);
      return [null, data];
    } else {
      console.error(`Error: ${error.stack}`);
      return [error, null];
    }
  }

  return [null, event];
};
