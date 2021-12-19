<svelte:head>
  <title>Just Pij - Donate</title>
</svelte:head>
<script>
  import {_} from 'svelte-i18n'
  import Socials from '../components/Socials.svelte'
</script>
<style>
</style>

<h1>{$_('donate.title')}</h1>

<div>
  <p>{$_('donate.description')}</p>
  <ul>
    <li><p>{@html $_('donate.mono', { values: { monoCard: '4441114450652274' }})}</p></li>
    <li><p>{@html $_('donate.kofi', { values: { kofiUrl: 'https://ko-fi.com/justpij' }})}</p></li>
  </ul>
  <Socials/>
</div>
