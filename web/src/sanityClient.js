import sanityClient from '@sanity/client'
import { api } from '../../studio/sanity.json'
const { projectId, dataset, token: fallbackToken } = api

// Use environment variable if available, otherwise fallback to committed token
const token = process.env.SANITY_TOKEN || fallbackToken

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  withCredentials: true
})

export default client
