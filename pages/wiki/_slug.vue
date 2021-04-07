<template>
  <scv-article :article="article">
    <nuxt-content :document="article" />
  </scv-article>
</template>
<script>
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('wiki', params.slug).fetch();
      return { article };
    },
  }
</script>
