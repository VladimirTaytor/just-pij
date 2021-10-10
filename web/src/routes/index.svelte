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
    max-height: 512px;
    padding: 0 15px;
  }

  .motto__text-container {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 700px) {
    .motto__container {
      flex-direction: column;
    }
  }
</style>

<svelte:head>
	<title>Just Pij</title>
</svelte:head>

<script>
  import Button from '../components/Button.svelte';

  function onListenClick () {
    console.log('onListenClick')
  }
</script>

<div class="header-block">
  <h1>Just Pij</h1>
  <div class="container-flex motto__container">
    <img class="motto__image" alt="some image" src="/room_pic.jpeg"/>
    <div class="motto__text-container">
      <h2 class="motto__text">Welcome to my <a href="episodes">music podcast</a>, <a href="blog">blog</a>, and <a href="about">portfolio</a> website</h2>
      <Button onclick="onListenClick" text="Listen Now"/>
    </div>
  </div>
</div>
