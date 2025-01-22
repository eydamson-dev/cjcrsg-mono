import type { CollectionConfig } from "payload";
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ChurchEvents: CollectionConfig = {
  slug: 'church-events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'eventName'
  },
  fields: [
    {
      name: 'eventName',
      type: 'text',
      required: true,
    },
    {
      name: 'eventType',
      type: 'relationship',
      relationTo: 'church-event-types',
      hasMany: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      name: 'location',
      type: 'text',
      required: true
    },
    {
      name: 'media',
      type: 'upload',
      hasMany: true,
      relationTo: 'media'
    },
    {
      name: 'attendees',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true
    },
    {
      name: 'QRAttendance',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/fields/QRAttendance/QRAttendance#QRAttendance'
        }
      }
    },
    {
      name: 'description',
      label: 'Notes',
      type: 'textarea',
      admin: {
        position: 'sidebar'
      }
    },
  ]
}
