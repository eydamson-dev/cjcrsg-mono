'use server';

import { PaginatedDocs } from 'payload';

import getPayloadClient from '@/lib/utils/getPayloadClient';
import { ChurchEvent } from '@/payload-types';

export const getChurchEvents = async (): Promise<PaginatedDocs<ChurchEvent>> => {
  const payload = await getPayloadClient();
  const events = await payload.find({ collection: 'church-events', limit: 50 });
  return events;
};
