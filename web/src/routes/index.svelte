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

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}

  .motto__container {
    margin-top: 15px;
  }

  .motto__image {
    max-height: 512px;
  }
</style>

<svelte:head>
	<title>PJ Podcast</title>
</svelte:head>

<div class="header-block">
  <h1>PJ Podcast</h1>
  <div class="container-flex motto__container">
    <img class="motto__image" alt="some image" src="/room_pic.jpeg"/>
    <div class="container-flex">
      <h2 class="motto__text">Interesting music - interesting life.</h2>
      <button class="motto__button">Listen Now</button>
    </div>
  </div>
</div>
