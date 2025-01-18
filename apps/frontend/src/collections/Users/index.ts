import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { admin } from '@/access/isAdmin'

import redirectUserIfNotAdmin from './hooks/redirectUserIfNotAdmin'

const isCreatingAdminUser = (data: any) => {
  return data?.role === 'admin'
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: (args) => {
      const { user } = args.req;

      return authenticated(args) && user?.role === 'admin'
    },
    create: (args) => {
      const { data } = args;
      if (isCreatingAdminUser(data) && !admin(args)) return false

      return true
    },
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  hooks: {
    beforeLogin: [redirectUserIfNotAdmin]
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Member',
          value: 'member'
        },
      ],
      required: true
    },
    {
      name: 'attendedEvents',
      type: 'join',
      collection: 'church-events',
      on: 'attendees',
      admin: {
        defaultColumns: ['eventType', 'eventName', 'date'],
      }
    }
  ],
  timestamps: true,
}
