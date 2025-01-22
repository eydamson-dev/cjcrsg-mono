import type { CollectionConfig } from "payload";
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ChurchEventTypes: CollectionConfig = {
  slug: 'church-event-types',
  admin: {
    useAsTitle: 'eventType'
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'eventType',
      type: 'text',
      required: true
    },
    {
      name: 'events',
      type: 'join',
      collection: 'church-events',
      on: 'eventType'
    }
  ]
}
