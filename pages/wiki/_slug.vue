<template>
  <ebt-article :article="article">
    <nuxt-content :document="article" />
  </ebt-article>
</template>
<script>
  import { EbtVue } from 'ebt-vue';
  const { EbtArticle, } = EbtVue;
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('wiki', params.slug).fetch();
      return { article };
    },
    components: { EbtArticle, },
  }
</script>
