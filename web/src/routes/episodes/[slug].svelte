<script context="module">
  export async function preload({ params }) {
    try {
      // As with the server route, we have acces to params.slug here
      const res = await this.fetch(`api/episodes/${params.slug}`);
      const { post } = await res.json();

      return { post };
    } catch (err) {
      this.error(500, err);
    }
  }
</script>

<script>
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "../../components/serializers";
  import Link from '../../components/Link.svelte'
  import {urlFor} from '../../helpers/image'
  import Button from '../../components/Button.svelte'
  import {_} from 'svelte-i18n'

  export let post;
</script>

<style>
  h1 {
    font-weight: bold;
  }

  .content :global(h2) {
    font-size: 24px;
    font-weight: 600;
  }

  .content :global(h3) {
    font-size: 20px;
    font-weight: 600;
  }

  .content :global(img) {
    display: block;
    max-width: 100%;
  }

  .content :global(figure) {
    margin: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }

  .content {
    font-size: 18px;
  }

  .listen {
    display: flex;
    margin-bottom: 25px;
    margin-top: 25px;

    align-items: center;
  }

  .cover-image {
    background-image: var(--bg-image);
    width: 256px;
    height: 256px;
    position: absolute;
    top: 25px;
    left: 25px;

    box-shadow: var(--primary__color) 5px 5px 15px;
  }

  .cover-background {
    background: url('/images/back.png') center center no-repeat;
    background-size: contain;
    filter: blur(1px);
    width: 256px;
    height: 256px;
    padding: 25px;
  }

  .cover-container {
    position: relative;
    margin-right: 25px;
  }

  .spotify, .youtube {
    font-size: 20px;
    font-weight: 500;
  }

  .spotify {
    color: #1ED760;
  }

  .youtube {
    color: #E15246;
  }

  .title-container {
    display: flex;
    align-items: center;
  }

  .title-container h1 {
    flex-grow: 1;
  }

  @media (max-width: 580px) {
    .listen {
      flex-direction: column;
    }

    .cover-container {
      margin: 0 0 25px;
    }
  }
</style>

<svelte:head>
  <title>{`Just Pij - ${post.title}`}</title>
</svelte:head>

<div class="title-container">
  <h1>{post.title}</h1>
  <Button type="link" onclick={() => history.back()}>{$_('podcast.back')}</Button>
</div>

<div class="listen">
  <div class="container">
    <div class="cover-container">
      <div class="cover-background"></div>
      <div class="cover-image" style={`--bg-image: url(${urlFor(post.mainImage).width('256').height('256').auto('format').url()});`}></div>
    </div>
  </div>
  <div class="links-container">
    <p class="spotify"><Link type="external" href={post.spotifyLink}>{$_('podcast.listenSpotify')}</Link></p>
    <p class="youtube"><Link type="external" href={post.youtubeLink}>{$_('podcast.listenYoutube')}</Link></p>
    <div class="metadata">
      <p>Кількість треків: {post.playlistSize}</p>
      <p>Тривалість: {post.playlistDuration}</p>
    </div>
  </div>
</div>
<div class="content">
  <BlockContent blocks={post.body} {serializers} />
</div>
