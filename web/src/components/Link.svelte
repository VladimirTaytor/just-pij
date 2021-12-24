<script>
  export let href;
  export let type;
  export let social;
  export let plain;
</script>
<style>
  .social {
    margin-right: 5px;
  }

  .plain {
    text-decoration: none;
  }

  .plain:hover {
    text-decoration: underline;
  }

</style>

{#if (type === 'external')}
  <a {href} target="_blank" class:social={social} class:plain={plain} rel="noopener noreferrer">
    <slot/>
  </a>
{:else }
  <a {href}>
    <slot/>
  </a>
{/if}
