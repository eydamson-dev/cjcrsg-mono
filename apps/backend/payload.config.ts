import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { webpackBundler } from '@payloadcms/bundler-webpack';

export default buildConfig({
  admin: {
    bundler: webpackBundler()
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI
    }
  }),
  editor: lexicalEditor({}),
  collections: [
    {
      slug: 'pages',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'header',
      fields: [
        {
          name: 'nav',
          type: 'array',
          fields: [
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
      ],
    },
  ],
})
