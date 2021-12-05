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
<div>
  <br/>
  <p>{@html $_('about.questions')}</p>
  <hr/>
  <div class="socials">
    <Link type="external" href="{TELEGRAM_URL}" social>Telegram</Link>
    <Link type="external" href="{GITHUB_URL}" social>GitHub</Link>
    <Link type="external" href="{INSTAGRAM_URL}" social>Instagram</Link>
    <Link type="external" href="{LINKEDIN_URL}" social>LinkedIn</Link>
  </div>
</div>
