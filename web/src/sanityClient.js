import sanityClient from '@sanity/client'
import { api } from '../../studio/sanity.json'
const { projectId, dataset, token: fallbackToken } = api

// Use environment variable if available, otherwise fallback to committed token
// Check if process exists (server-side only)
const token = (typeof process !== 'undefined' && process.env && process.env.SANITY_TOKEN) || fallbackToken

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  withCredentials: true
})

export default client
