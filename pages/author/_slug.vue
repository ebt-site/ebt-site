<template>
  <scv-article :article="article">
    <nuxt-content :document="article" />
  </scv-article>
</template>
<script>
  import ScvArticle from '@/components/scv-article';
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('author', params.slug).fetch()
      return { article }
    },
    components: { ScvArticle, },
  }
</script>
