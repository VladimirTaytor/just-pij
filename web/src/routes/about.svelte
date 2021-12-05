<svelte:head>
	<title>Just Pij - About</title>
</svelte:head>
<script>
  import {_} from 'svelte-i18n'
  import Socials from '../components/Socials.svelte'

  function getMyAge() {
    const yearOfBirth = new Date('1997-12-31')
    const today = new Date()
    const offset = 1970

    return new Date(today - new Date(yearOfBirth)).getFullYear() - offset
  }
</script>
<style>
  img {
    width: 100%;
    border: 1px solid var(--primary__color_light);
  }

  .content {
    margin-left: 25px;
  }

  p:first-child {
    margin-top: 0;
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

<div class="container-flex">
  <div>
    <img alt="art" src="/images/profile pic.jpg"/>
  </div>
  <div class="content">
    <h2>{$_('about.title')}</h2>
    <p>{$_('about.hello')}</p>
    <p>{$_('about.me', { values: {age: getMyAge()}})}</p>
    <p>{$_('about.enjoy')}</p>
    <Socials/>
  </div>
</div>
