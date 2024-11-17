import { CollectionConfig } from "payload";

export const Attendance: CollectionConfig = {
  slug: 'attendance',
  fields: [
    {
      type: 'date',
      name: 'date',
      required: true
    },
    {
      type: 'relationship',
      name: 'member',
      relationTo: ['members'],
      hasMany: false
    }
  ]
}
