<script context="module">
  import {getCookie} from '../../modules/cookies'

  export async function preload(page, session) {
    const lang = getCookie('locale');
    try {
      const res = await this.fetch(`api/episodes/all?lang=${lang}`);
      const {posts} = await res.json()
      return {posts};
    } catch (err) {
      this.error(500, err);
    }
  }
</script>

<script>
  import {_} from 'svelte-i18n'

  export let posts;
  import _get from "lodash.get"
  import {urlFor} from '../../helpers/image'
  import {PODCAST_INSTAGRAM_URL} from '../../constants'
  import Link from '../../components/Link.svelte'

  function formatDate(date) {
    return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
  }
</script>

<style>
  .posts {
    flex-wrap: wrap;
  }

  .posts__item {
    flex-basis: 33.333%;
    width: 33.333%;

    display: flex;
    flex-direction: column;
  }

  .post {
    padding: 15px;
    height: auto;

    display: flex;
    flex-direction: column;

    flex-grow: 1;
  }

  .post__title {
    font-weight: bolder;
  }

  .post__preview {
    flex-grow: 1;
  }

  .post__separator {
    border-bottom: 1px solid var(--primary__color);
    margin: 5px 0;
  }

  .post__date {
    font-size: 14px;
    font-weight: lighter;

    justify-self: flex-end;
  }

  .post__image {
    margin-bottom: 5px;
    font-size: 12px;
  }

  .cover {
    margin-right: 25px;
  }

  .content {
    margin-bottom: 25px;
  }

  .cover {
    max-width: 256px;
    border: 1px solid var(--primary__color_light);
  }

  :global(.disclaimer) {
    font-size: 12px;
  }

  .title-container {
    display: flex;

    align-items: center;

    justify-content: space-between;
  }

  @media (max-width: 850px) {
    .posts__item {
      flex-basis: 50%;
      width: 50%;
    }
  }

  @media (max-width: 580px) {
    .posts__item {
      flex-basis: 100%;
      width: 100%;
    }

    .content {
      flex-direction: column;
    }

    .cover {
      align-self: center;

      margin: 0 0 15px;
    }

    .title {
      display: none;
    }
  }

</style>

<svelte:head>
  <title>Just Pij - Podcast</title>
</svelte:head>

<div class="container-flex content">
  <div>
    <img class="cover" alt="cover" src="images/podcast cover.jpg"/>
  </div>
  <div class="caption">
    <h2>Just Pij Podcast</h2>
    <p>{@html $_('podcast.about')}</p>
    <p>{$_('podcast.description')}</p>
    <p><b>{$_('podcast.why')}</b></p>
    <p>{@html $_('podcast.answer')}</p>
  </div>
</div>
<hr/>
<div class="title-container">
  <p class="title">{$_('podcast.title')}</p>
  <p>
    <b>
      {$_('podcast.promotion')}
      <Link type="external" href="{PODCAST_INSTAGRAM_URL}">Instagram</Link>
    </b>
  </p>
</div>
<div class="container-flex posts">
  {#each posts as post}
    <div class="posts__item">
      <div class="post">
        <a class="post__title" rel='prefetch'
           href='episodes/{post.slug.current}'>
          <img class="post__image monochrome"
               alt="{post.mainImage.alt}"
               src="{urlFor(post.mainImage).width('247').height('145').auto('format').url()}"/>
        </a>

        <a class="post__title" rel='prefetch'
           href='episodes/{post.slug.current}'>{post.title}</a>

        <p class="post__preview">{_get(post, 'excerpt[0].children[0].text')}</p>

        <span class="post__separator"></span>

        <i class="post__date">{formatDate(post.publishedAt)}</i>
      </div>
    </div>
  {/each}
</div>
