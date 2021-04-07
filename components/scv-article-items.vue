<template>
  <div v-if="article && article.slugDir">
    <div v-for="item of items" :key="item.slug" 
      v-if="item.title"
      class="scv-toc-item">
      <NuxtLink :to="itemLink(item)">
        <div class="scv-thumbnail">
          <img :src="item.img" />
        </div>
        <div class="scv-toc-item-text">
          <div class="scv-toc-item-title">
            {{ item.title }}
          </div>
          <div class="scv-toc-item-subtitle">
            {{ item.description }}
          </div>
        </div>
      </NuxtLink>
    </div><!-- scv-toc-item -->
  </div> <!-- article.slugDir -->
</template>
<script>
  export default {
    props: {
      article: {
        type: Object,
        default: ()=>({}),
      },
      items: {
        type: Array,
        default: ()=>[],
      }
    },
    methods: {
      itemLink(item) {
        let { article } = this;
        return { 
          name: `${article.slugDir}-slug`, 
          params: { slug: item.slug } 
        }
      },
    },
  }
</script>
