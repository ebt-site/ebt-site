<template>
  <div class="nuxt-content scv-toc">
    <h1>Wiki Contents</h1>
    <scv-article-items :article="article" :items="items"/>
  </div>
</template>
<script>
  import ScvArticleItems from '@/components/scv-article-items';
  export default {
    async asyncData({ $content, params }) {
      const items = await $content('wiki')
        .only(['title', 'description', 'img', 'slug', 'author'])
        .sortBy('title', 'asc')
        .fetch()

      return {
        items,
        article: {
          slugDir: 'wiki',
        },
      }
    },
    components: {
      ScvArticleItems,
    },
  }
</script>
<style>
</style>
