'use server';

import { PaginatedDocs } from 'payload';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { Schedule } from '@/payload-types';

export const getSchedules = async (): Promise<PaginatedDocs<Schedule>> => {
  const payload = await getPayloadClient();
  const events = await payload.find({ collection: 'schedules', limit: 50 });
  return events;
};

export const getScheduleById = async (id: string): Promise<Schedule | null> => {
  const payload = await getPayloadClient();
  return payload.findByID({
    id,
    collection: 'schedules',
  })
}


export const confirmAttendance = async (eventId: string) => {
  // Implement the logic to confirm attendance here
  console.log(`Attendance confirmed for event: ${eventId}`);
  // You might want to update the database or perform other actions here
  return { success: true, message: 'Attendance confirmed successfully!' };
};
