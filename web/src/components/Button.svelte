<script>
  export let text;
  export let onclick;
  export let type;

  const currentType = type || 'button'
</script>

<style>
  .button {
    width: 130px;
    height: 40px;
    padding: 10px 25px;
    border: 2px solid #000;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    display: inline-block;

    overflow: hidden;
    transition: all 0.3s ease;
  }

  .button:hover {
    background: var(--primary__color_dark);
    color: #fff;
  }

  .button:active {
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .3),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .2);
  }

  .link {
    text-decoration: underline;
  }

  .link:hover {
    cursor: pointer;
  }
</style>

{#if (currentType === 'link')}
  <a class:link={true} on:click={onclick}><slot></slot></a>
{:else }
  <button class:button={true} on:click={onclick}><slot></slot></button>
{/if}
