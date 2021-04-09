<template>
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th align="left">Location</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>URL</td>
        <td>
          <a :href="siteUrl" target="_blank"> <code>{{siteUrl}}</code> </a>
        </td>
      </tr>
      <tr>
        <td>Wiki</td>
        <td>
          <code>content/images/{{article.slug}}.md</code> 
        </td>
      </tr>
      <tr>
        <td>File</td>
        <td>
          <code>static/{{article.slug}}.png</code> 
        </td>
      </tr>
      <tr v-if="/unsplash/.test(article.slug)">
        <td>Source</td>
        <td>
          <a :href="unsplashUrl" target="_blank"> <code>{{unsplashUrl}}</code> </a>
        </td>
      </tr>
      <tr v-if="/-?pexels-?/.test(article.slug)">
        <td>Source</td>
        <td>
          <a :href="pexelsUrl" target="_blank"> <code>{{pexelsUrl}}</code> </a>
        </td>
      </tr>
      <tr v-if="/-?pixabay-?/.test(article.slug)">
        <td>Source</td>
        <td>
          <a :href="pixabayUrl" target="_blank"> <code>{{pixabayUrl}}</code> </a>
        </td>
      </tr>
      <tr v-if="article.imgSrc">
        <td>Source</td>
        <td>
          <a :href="article.imgSrc" target="_blank"> <code>{{article.imgSrc}}</code> </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    props: {
      article: {
        type: Object,
        default: {
          slug: '(article is required)',
        },
      },
    },
    computed: {
      siteUrl() {
        let { slug } = this.article;
        let { protocol, host, pathname } = window.location;
        let pathParts = pathname.split('/');
        return `${protocol}//${host}/${pathParts[1]}/${slug}.png`;
      },
      pixabayUrl() {
        let { slug } = this.article;
        let id = slug
          .replace(/-?pixabay-?/, '')
          .replace(/_[0-9]+$/, '')
        return `https://pixabay.com/photos/${id}`;
      },
      pexelsUrl() {
        let { slug } = this.article;
        let id = slug.replace(/-?pexels-?/, '')
        return `https://pexels.com/photo/${id}`;
      },
      unsplashUrl() {
        let { slug } = this.article;
        let id = slug.substring(slug.length-20)
          .replace(/-unsplash.*/, '')
        return `https://unsplash.com/photos/${id}`;
      },
    },
  }
</script>
