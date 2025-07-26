import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';

export const Schedules: CollectionConfig = {
  slug: 'schedules',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'scheduleTag',
      type: 'relationship',
      relationTo: 'schedule-tags',
      hasMany: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'church',
      type: 'relationship',
      relationTo: 'churches',
      required: true
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'media',
      type: 'upload',
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'attendees',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'QRAttendance',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/fields/QRAttendance/QRAttendance#QRAttendance',
        },
      },
    },
    {
      name: 'description',
      label: 'Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
