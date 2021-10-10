<script context="module">
  export async function preload({ params }) {
    try {
      const res = await this.fetch('api/blog/all');
      const { posts } = await res.json()
      return { posts };
    } catch (err) {
      this.error(500, err);
    }
  }
</script>

<script>
  export let posts;
  import _get from "lodash.get"
  import {urlFor} from '../../helpers/image'

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
</style>

<svelte:head>
  <title>PJ Podcast - Episodes</title>
</svelte:head>

<h1>Recent episodes:</h1>
<br>
<div class="container-flex posts">
	{#each posts as post}
		<div class="posts__item">
      <div class="post">
        <a class="post__title" rel='prefetch' href='episodes/{post.slug.current}'>
          <img class="post__image"
               alt="{post.mainImage.alt}"
               src="{urlFor(post.mainImage).width('247').height('145').auto('format').url()}"/>
        </a>

        <a class="post__title" rel='prefetch' href='episodes/{post.slug.current}'>{post.title}</a>

        <p class="post__preview">{_get(post, 'excerpt[0].children[0].text')}</p>

        <span class="post__separator"></span>

        <i class="post__date">{formatDate(post.publishedAt)}</i>
      </div>
    </div>
	{/each}
</div>
