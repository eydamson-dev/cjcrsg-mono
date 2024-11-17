import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Members: CollectionConfig = {
  slug: 'members',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'address', 'cjcLocation']
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Personal Information',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'firstName',
              type: 'text',
              required: true,
              admin: {
                width: '300px'
              }
            },
            {
              name: 'middleName',
              type: 'text',
              admin: {
                width: '200px'
              }
            },
            {
              name: 'lastName',
              type: 'text',
              required: true,
              admin: {
                width: '300px'
              }
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'birthday',
              type: 'date',
              required: true,
              admin: {
                width: '170px'
              }
            },
            {
              name: 'gender',
              type: 'select',
              options: [
                {
                  label: 'Male',
                  value: 'male'
                },
                {
                  label: 'Female',
                  value: 'female'
                }
              ],
              required: true,
              admin: {
                width: '170px'
              }
            },
            {
              name: 'civilStatus',
              type: 'select',
              options: [
                {
                  label: 'Single',
                  value: 'single'
                },
                {
                  label: 'Married',
                  value: 'married'
                },
                {
                  label: 'Widowed',
                  value: 'widowed'
                }
              ],
              required: true,
              admin: {
                width: '170px'
              }
            },
          ]
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subdivision',
              type: 'text',
              admin: {
                width: '400px'
              }
            },
            {
              name: 'barangay',
              type: 'text',
              required: true,
              admin: {
                width: '250px'
              }
            },
            {
              name: 'municipality',
              type: 'text',
              required: true,
              admin: {
                width: '250px'
              }
            },
            {
              name: 'province',
              type: 'text',
              required: true,
              admin: {
                width: '250px'
              }
            },
            {
              name: 'zipcode',
              type: 'number',
              admin: {
                width: '100px'
              }
            },
          ]
        },
        {
          type: 'email',
          name: 'email',
          admin: {
            width: '300px'
          }
        }
      ]
    },
    {
      type: 'collapsible',
      label: 'Church Information',
      fields: [
        {
          name: 'churchAffiliate',
          type: 'relationship',
          relationTo: ['churches'],
          hasMany: false,
          admin: {
            width: '400px'
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
    },
    // virtial fields
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['fullName']
          }
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.firstName} ${data?.lastName}`
          }
        ],
      },
    },
    {
      name: 'address',
      type: 'text',
      admin: {
        hidden: true, // hides the field from the admin panel
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['address']
          }
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.subdivision} Brgy.${data?.barangay} ${data?.municipality} ${data?.province}`
          }
        ],
      },
    }

  ],
  timestamps: true,
}

