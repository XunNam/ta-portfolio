import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { HomePage } from './globals/HomePage'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
const hasS3Config = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_REGION &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

const formatPublicMediaURL = ({ filename, prefix }: { filename: string; prefix?: string }) => {
  const baseURL = process.env.R2_PUBLIC_URL?.replace(/\/$/, '')

  if (!baseURL) {
    return undefined
  }

  const relativePath = prefix ? `${prefix}/${filename}` : filename

  return `${baseURL}/${relativePath}`
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  editor: lexicalEditor(),
  globals: [SiteSettings, HomePage],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: databaseURL,
  }),
  sharp,
  plugins: [
    s3Storage({
      acl: 'public-read',
      bucket: process.env.S3_BUCKET || 'missing-r2-bucket',
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: process.env.R2_PUBLIC_URL
            ? ({ filename, prefix }) => formatPublicMediaURL({ filename, prefix }) || ''
            : undefined,
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
      },
      enabled: hasS3Config,
    }),
  ],
})
