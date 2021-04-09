  <template>
    <ebt-article :article="article">
      <nuxt-content :document="article" />
      <ebt-image-info :article="article" />
    </ebt-article>
  </template>
  <script>
    import { EbtVue } from 'ebt-vue';
    const { EbtArticle, EbtImageInfo } = EbtVue;
    export default {
      async asyncData({ $content, params }) {
        const article = await $content('images', params.slug).fetch()
        return { article }
      },
      components: { EbtArticle, EbtImageInfo, },
    }
  </script>
