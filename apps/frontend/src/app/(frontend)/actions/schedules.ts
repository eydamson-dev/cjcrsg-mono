'use server';

import { PaginatedDocs } from 'payload';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { Schedule } from '@/payload-types';
import { safeAwait } from '@/lib/utils/safeAwait';

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
  )

  return data
}


export const confirmAttendance = async (eventId: string) => {
  // Implement the logic to confirm attendance here
  console.log(`Attendance confirmed for event: ${eventId}`);
  // You might want to update the database or perform other actions here
  return { success: true, message: 'Attendance confirmed successfully!' };
};
