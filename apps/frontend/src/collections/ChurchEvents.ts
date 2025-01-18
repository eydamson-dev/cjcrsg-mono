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
  fields: [
    {
      name: 'eventName',
      type: 'text',
      required: true
    },
    {
      name: 'description',
      type: 'richText',
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
      name: 'eventType',
      type: 'relationship',
      relationTo: 'church-event-types',
      hasMany: true,
      admin: {
        position: 'sidebar'
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
    }
  ]
}
