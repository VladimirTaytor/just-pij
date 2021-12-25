<style>
  h1, figure, p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  svg {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }

  .motto__container {
    margin-top: 15px;
  }

  .motto__image {
    width: 100%;
  }

  .motto__text-container {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
  }

  .motto__text {
    margin-bottom: 25px;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 700px) {
    .motto__container {
      flex-direction: column-reverse;
    }

    .motto__text-container {
      padding: 0;
      text-align: center;
    }
  }

  /* lineup class and keyframes */
  .lineUp {
    animation: 1s anim-lineUp ease-out;
  }

  @keyframes anim-lineUp {
    0% {
      opacity: 0;
      transform: translateY(80%);
    }
    20% {
      opacity: 0;
    }
    50% {
      opacity: 1;
      transform: translateY(0%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
</style>

<svelte:head>
  <title>Just Pij</title>
</svelte:head>

<script>
  import {_} from 'svelte-i18n'
  import fetchNowPlaying from '../services/fetchNowPlaying'
  import Playing from '../components/Playing.svelte'
  import Link from '../components/Link.svelte'

  let nowPlaying = fetchNowPlaying()
</script>

<div class="header-block">
  <h1>Just Pij</h1>
  <div class="container-flex motto__container">
    <div>
      <img class="motto__image" alt="some image" src="/images/room_pic.jpeg"/>
    </div>
    <div class="motto__text-container">
      <h2
        class="motto__text">{@html $_('home.title.phrase', {
        values: {
          blogUrl: '/blog',
          podcastUrl: '/episodes',
          portfolioUrl: '/about'
        }
      })}</h2>

      <h3>{$_('home.title.nowPlaying')}</h3>

      <h3>
        <Playing/>
        {#await nowPlaying}
          <b>...</b>
        {:then track}
          <Link plain type="external"
                href={`https://www.youtube.com/results?search_query=${track}`}>
            <b class="lineUp">{ track }</b>
          </Link>
        {/await}
      </h3>


      <h3 style="margin-bottom: 25px">{$_('home.title.welcome')}</h3>
    </div>
  </div>
</div>
