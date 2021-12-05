<script>
  import {_} from 'svelte-i18n'
</script>

<style>
  h1, p {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  p {
    margin: 1em auto;
  }

  .container-flex {
    margin-top: 25px;
    flex-direction: row;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 700px) {
    .container-flex {
      margin-bottom: 25px;
      flex-direction: column-reverse;
    }
  }
</style>

<svelte:head>
  <title>Just Pij - Blog</title>
</svelte:head>
<div class="container-flex" style="">
  <img height="250px" alt="Not found" src="404.png" style="margin-right: 50px; margin-bottom: 25px;"/>
  <div>
    <h1>{$_('notFound.title')}</h1>
    <p>{$_('notFound.message')}</p>
  </div>
</div>
