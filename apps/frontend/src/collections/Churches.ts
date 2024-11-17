import type { CollectionConfig } from "payload";
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Churches: CollectionConfig = {
  slug: 'churches',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'churchName'
  },
  fields: [
    {
      type: 'text',
      name: 'churchName',
      required: true,
      admin: {
        width: '500px'
      }
    },
    {
      type: 'text',
      name: 'address',
      admin: {
        width: '500px'
      }
    },
    {
      type: 'textarea',
      name: 'remarks',
      admin: {
        width: '500px'
      }
    }
  ]
}
