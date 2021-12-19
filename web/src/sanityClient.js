import sanityClient from '@sanity/client'
import { api } from '../../studio/sanity.json'
const { projectId, dataset, token } = api

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  withCredentials: true
})

export default client
