const axios = require('axios')
const config = require('../../config')

const LAST_FM_BASE_URL = process.env.LAST_FM_BASE_URL || config.LAST_FM_BASE_URL
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY || config.LAST_FM_API_KEY
const LAST_FM_USERNAME = process.env.LAST_FM_USER || config.LAST_FM_USER

const fetchLatestTracks = async () => {
  const url = `${LAST_FM_BASE_URL}?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json`
  return axios.get(url).then(({ data }) => data.recenttracks.track)
}

const findCurrentPlaying = async () => {
  const latestTracks = await fetchLatestTracks()
  const latestTrack = latestTracks[0]

  if (latestTrack['@attr'] && latestTrack['@attr'].nowplaying)
    return `${latestTrack.artist['#text']} - ${latestTrack.name}`

  return 'paused'
}

exports.handler = async function(event, context) {
  const nowPlaying = await findCurrentPlaying()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World", nowPlaying })
  };
}
