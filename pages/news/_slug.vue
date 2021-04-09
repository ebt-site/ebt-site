<template>
  <ebt-article :article="article">
    <nuxt-content :document="article" class="mt-5"/>
  </ebt-article>
</template>
<script>
  import { EbtVue } from 'ebt-vue';
  const { EbtArticle, } = EbtVue;
  export default {
    async asyncData({ $content, params }) {
      const article = await $content('news', params.slug).fetch()

      return { article }
    },

    components: {
      EbtArticle,
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
