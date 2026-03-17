import sanityClient from '@sanity/client'
import { api } from '../../studio/sanity.json'
const { projectId, dataset } = api

// Use environment variable if available, otherwise fallback to committed token
// NOTE: fallbackToken is READ-ONLY - sufficient for fetching published content during builds
// Check if process exists (server-side only)
const fallbackToken = 'skp3mta5yPWtpzRY320WRGgmYCwiuhpuH3cHNAlZbTtp3Aw4dgjCClv1JKyVAPef6WLUOpFKQ9pt8P6dB9lGyBnW47l5mgIR6MCkpVrQNsE2gBTDo0OIwag7qA5nowqDlGRn2p8q4zZDg5dXfRY7LrE0fxuFfuEkaUUrL64oSC8y1MjUngl9'
const token = (typeof process !== 'undefined' && process.env && process.env.SANITY_TOKEN) || fallbackToken

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  withCredentials: true
})

export default client
