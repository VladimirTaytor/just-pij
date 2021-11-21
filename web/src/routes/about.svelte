<svelte:head>
	<title>Just Pij - About</title>
</svelte:head>
<script>
  import {_} from 'svelte-i18n'

  function getMyAge() {
    const yearOfBirth = new Date('1997-12-31')
    const today = new Date()
    const offset = 1970

    return new Date(today - new Date(yearOfBirth)).getFullYear() - offset
  }
</script>
<style>
  img {
    width: 350px;
    border: 1px solid var(--primary__color_light);
  }

  .content {
    margin-left: 25px;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  @media (max-width: 700px) {
    .container-flex {
      flex-direction: column;
    }

    .content {
      margin-left: 0;
      margin-top: 25px;
    }
  }
</style>

<h1>{$_('about.title')}</h1>

<div class="container-flex">
  <img alt="art" src="/images/profile pic.jpg"/>
  <div class="content">
    <p>{$_('about.hello')}</p>
    <p>{$_('about.me', { values: {age: getMyAge()}})}</p>
    <p>{$_('about.enjoy')}</p>
    <br/>
    <p>{@html $_('about.questions')}</p>
    <hr/>
    <div class="socials">
      <a href="https://telegram.me/vovapihol">Telegram</a>
      <a href="https://github.com/VladimirTaytor">GitHub</a>
      <a href="https://https://www.instagram.com/vovapihol">Instagram</a>
    </div>
  </div>
</div>
