const fetchNowPlaying = () => {
  if (!process.browser) return 'Loading...'

  return fetch('https://justpij.com/.netlify/functions/lastFm', {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.nowPlaying.name)
}

export default fetchNowPlaying
