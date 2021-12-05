<script>
  export let href;
  export let type;
  export let social;
</script>
<style>
  .social {
    margin-right: 5px;
  }
</style>

{#if (type === 'external')}
  <a {href} target="_blank" class:social={social} rel="noopener noreferrer">
    <slot/>
  </a>
{:else }
  <a {href}>
    <slot/>
  </a>
{/if}
