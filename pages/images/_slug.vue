  <template>
    <ebt-article :article="article">
      <nuxt-content :document="article" />
      <ebt-image-info :article="article" />
    </ebt-article>
  </template>
  <script>
    const { EbtArticle, EbtImageInfo } = require('@/components');
    export default {
      async asyncData({ $content, params }) {
        const article = await $content('images', params.slug).fetch()
        return { article }
      },
      components: { EbtArticle, EbtImageInfo, },
    }
  </script>
