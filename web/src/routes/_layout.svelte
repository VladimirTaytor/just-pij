<script context="module">
  import {isLoading, waitLocale} from 'svelte-i18n';

  export async function preload(page) {
    return waitLocale();
  }
</script>
<script>
  import Nav from '../components/Nav.svelte';
  import GoogleAnalytics from "sapper-google-analytics/GoogleAnalytics.svelte"
  import { stores } from "@sapper/app"

  let ga_measurment_id = "G-C7K44ZGB8H"
  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment}/>


<main>
  {#if $isLoading}
    <div class="loading">Loading...</div>
  {:else}
    <slot></slot>
  {/if}
</main>

{#if process.env.NODE_ENV !== 'development'}
  <GoogleAnalytics {stores} id={ga_measurment_id}/>
{/if}
