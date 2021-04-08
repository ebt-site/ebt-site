<template>
  <div class="nuxt-content ebt-toc">
    <h1>Wiki Contents</h1>
    <ebt-article-items :article="article" :items="items"/>
  </div>
</template>
<script>
  import EbtArticleItems from '@/components/ebt-article-items';
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
      EbtArticleItems,
    },
  }
</script>
<style>
</style>
