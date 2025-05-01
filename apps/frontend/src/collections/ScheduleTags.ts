import type { CollectionConfig } from "payload";
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ScheduleTags: CollectionConfig = {
  slug: 'schedule-tags',
  admin: {
    useAsTitle: 'tag'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true
    },
    {
      name: 'schedules',
      type: 'join',
      collection: 'schedules',
      on: 'scheduleTag'
    }
  ]
}
