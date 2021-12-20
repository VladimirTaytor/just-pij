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
    max-width: 100%;

    max-height: 512px;
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
</style>

<svelte:head>
  <title>Just Pij</title>
</svelte:head>

<script>
  import Button from '../components/Button.svelte';
  import {_} from 'svelte-i18n'

  function onListenClick() {
    console.log('onListenClick')
  }
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

      <h2>{$_('home.title.nowPlaying')} <b>renie cares - якби</b></h2>

      <h2 style="white-space: nowrap;">{$_('home.title.welcome')}</h2>
    </div>
  </div>
</div>
