<template>
  <div v-if="article && article.slugDir">
    <div v-for="item of items" :key="item.slug" 
      v-if="item.title"
      class="ebt-toc-item">
      <NuxtLink :to="itemLink(item)">
        <div class="ebt-thumbnail">
          <img :src="item.img" />
        </div>
        <div class="ebt-toc-item-text">
          <div class="ebt-toc-item-title">
            {{ item.title }}
          </div>
          <div class="ebt-toc-item-subtitle">
            {{ item.description }}
          </div>
        </div>
      </NuxtLink>
    </div><!-- ebt-toc-item -->
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
