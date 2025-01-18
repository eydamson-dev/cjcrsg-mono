import type { CollectionConfig } from "payload";
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { admin } from "@/access/isAdmin";

export const WeeklyServices: CollectionConfig = {
  slug: 'weekly-services',
  access: {
    create: admin,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'date',
      name: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        }
      }
    },
    {
      type: 'relationship',
      name: 'preacher',
      relationTo: 'users',
      required: true
    },
    {
      type: 'upload',
      name: 'media',
      relationTo: 'weekly-service-media',
      hasMany: true
    },
    {
      name: 'attendees',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    }
  ]
}
