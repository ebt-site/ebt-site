<template>
  <ebt-article :article="article">
    <nuxt-content :document="article" />
  </ebt-article>
</template>
<script>
  import EbtArticle from '@/components/ebt-article';
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('sites', params.slug).fetch()
      return { article }
    },
    components: { EbtArticle, },
  }
</script>
