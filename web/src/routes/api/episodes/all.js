import client from '../../../sanityClient'

const DEFAULT_LOCALE = 'en'

/**
 * This route is called 'all' instead of index to prevent route conflicts.
 * @see https://sapper.svelte.dev/docs#Route_conflicts
 */
export async function get(req, res) {
  try {
    const query = '*[' +
      '_type == "post" && defined(slug.current) && ' +
      'publishedAt < now() && ' +
      'language match $lang && ' +
      'references(*[_type == "category" && title == "Podcast"]._id)' +
      ']|order(publishedAt desc)';

    const locale = req.query.lang

    const params = {
      lang: locale && locale !== 'undefined' ? locale : DEFAULT_LOCALE
    }

    const posts = await client.fetch(query, params);
    res.end(JSON.stringify({posts}));
  } catch (err) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: err.message
    }));
  }
}
