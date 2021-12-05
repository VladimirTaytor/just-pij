<script>
  import {_} from 'svelte-i18n'
  import {
    GITHUB_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL,
    TELEGRAM_URL
  } from '../constants'
  import Link from './Link.svelte'

  export let segment;
</script>
<style>
  a {
    margin-right: 5px;

    font-weight: 500;
  }
</style>
<div>
  <br/>
  <p>{@html $_('about.questions')}</p>
  <hr/>
  <div class="socials">
    <Link type="external" href="{TELEGRAM_URL}">Telegram</Link>
    <Link type="external" href="{GITHUB_URL}">GitHub</Link>
    <Link type="external" href="{INSTAGRAM_URL}">Instagram</Link>
    <Link type="external" href="{LINKEDIN_URL}">LinkedIn</Link>
  </div>
</div>
