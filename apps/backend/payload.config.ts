import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { viteBundler } from '@payloadcms/bundler-vite';

export default buildConfig({
  admin: {
    bundler: viteBundler(),
    vite: (config) => {
      return {
        ...config,
        server: {
          ...config.server,
          port: Number(process.env.VITE_PORT),
          strictPort: true,
          hmr: {
            port: Number(process.env.VITE_PORT), // Ensures WebSocket HMR uses the same port
            protocol: 'ws',
            host: 'localhost',
          }
        }
      }
    }
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
  globals: [],
})
