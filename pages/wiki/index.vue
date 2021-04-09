<template>
  <div class="nuxt-content ebt-toc">
    <div v-for="category in categories" :key="category">
      <h2>{{category}}</h2>
      <ebt-article-items :article="article" :items="categoryItems(category)"/>
    </div>
  </div>
</template>
<script>
  import { EbtVue } from 'ebt-vue';
  const {
    EbtArticleItems,
  } = EbtVue;
  export default {
    async asyncData({ $content, params }) {
      const items = await $content('wiki')
        .only(['title', 'category', 'description', 'img', 'slug', 'author'])
        .sortBy('order', 'asc')
        .fetch()
      const catMap = items.reduce((a,item)=>{
        item.category && (a[item.category] = item.category);
        return a;
      }, {});
      const categories = Object.keys(catMap).sort((a,b)=>a.localeCompare(b));

      return {
        items,
        categories,
        article: {
          slugDir: 'wiki',
        },
      }
    },
    methods: {
      categoryItems(category) {
        return this.items.filter(item=> {
          return item.category===category && item.category;
        });
      }
    },
    components: {
      EbtArticleItems,
    },
  }
</script>
<style>
</style>
