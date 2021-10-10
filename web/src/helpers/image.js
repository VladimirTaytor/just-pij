import urlBuilder from '@sanity/image-url'
import client from '../sanityClient'

const urlFor = source => urlBuilder(client).image(source);

export { urlFor }
