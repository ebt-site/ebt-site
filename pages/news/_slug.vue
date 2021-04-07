<template>
  <scv-article :article="article">
    <nuxt-content :document="article" class="mt-5"/>
  </scv-article>
</template>
<script>
  import ScvArticle from '@/components/scv-article';

  export default {
    async asyncData({ $content, params }) {
      const article = await $content('news', params.slug).fetch()

      return { article }
    },

    components: {
      ScvArticle,
    },
    computed: {
      newsDate() {
        let [year, month, day] = this.article.path
            .replace(/.*\//, '')
            .replace(/\.md/, '')
            .split('-')
            .map(s=>Number(s));
        return new Date(Date.UTC(year, month-1, day)).toLocaleDateString();
      },
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
