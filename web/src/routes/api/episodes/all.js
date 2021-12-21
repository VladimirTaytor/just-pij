import client from '../../../sanityClient'

const DEFAULT_LOCALE = 'uk'

const getLocale = req => {
  const isEmpty = locale => !locale || locale === 'undefined'
  const lang = req.query.lang

  return isEmpty(lang) ? req.cookies['locale'] || DEFAULT_LOCALE : lang
}

const normalizeLocale = (locale) => {
  return locale.split('-')[0].split('_')[0]
}

/**
 * This route is called 'all' instead of index to prevent route conflicts.
 * @see https://sapper.svelte.dev/docs#Route_conflicts
 */
export async function get(req, res) {
  try {
    const query = '*[' +
      '_type == "post" && defined(slug.current) && ' +
      '!(_id in path("drafts.**")) &&' +
      'publishedAt < now() && ' +
      'language match $lang && ' +
      'references(*[_type == "category" && title == "Podcast"]._id)' +
      ']|order(publishedAt desc)';

    const locale = getLocale(req)

    const params = {
      lang: normalizeLocale(locale)
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
