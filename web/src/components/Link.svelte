<script>
  export let href;
  export let type;
</script>

{#if (type === 'external')}
  <a {href} target="_blank" rel="noopener noreferrer">
    <slot/>
  </a>
{:else }
  <a {href}>
    <slot/>
  </a>
{/if}
