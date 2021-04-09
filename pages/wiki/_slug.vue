<template>
  <ebt-article :article="article">
    <nuxt-content :document="article" />
  </ebt-article>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('wiki', params.slug).fetch();
      return { article };
    },
  }
</script>
