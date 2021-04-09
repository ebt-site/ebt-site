<template>
  <article class="nuxt-content ebt-article">
    <div class="ebt-wiki-heading">
      <a :href="imgSrc" target="_blank">
        <img :src="article.img" />
      </a>
      <div>
        <div class="text-caption" >
          <NuxtLink to="/wiki">Wiki</NuxtLink>
          &gt;
          <span v-if="dir && dir !== 'wiki'">
            <NuxtLink :to="`/wiki/${dir}`">{{ dir }}</NuxtLink>
            &gt;
          </span>
          {{pagePath}}
        </div>
        <h1 class="nuxt-content">
          {{ title }} 
          <v-btn 
            :href="sourceUrl" target="_blank" 
            title="View/Edit wiki page on Github" 
            icon class="ml-5"
            >
            <v-icon>{{ mdiFileEditOutline }}</v-icon>
          </v-btn>
        </h1>
        <details class="ml-1">
          <summary class="text-caption">
            {{ article.description }} 
          </summary>
          <div class="ml-5">
            <nav v-if="article.toc">
              <ul>
                <li v-for="link of article.toc" :key="link.id">
                  <NuxtLink :to="`#${link.id}`" >{{ link.text }}</NuxtLink>
                </li>
              </ul>
            </nav>
            <div class="text-caption text-right" >
              {{date(article.updatedAt)}} 
            </div>
          </div>
        </details>
      </div>
    </div>
    <div v-if="article.link" class="ebt-article-link">
      <a :href="article.link">{{article.link}}</a>
    </div>

    <slot>
      <!--
        <nuxt-content :document="article" />
      -->
    </slot>

    <ebt-article-items :article="article" :items="items" />
  </article>
</template>
<script>
  import EbtArticleItems from './ebt-article-items';
  import {
    mdiFileEditOutline,
  } from '@mdi/js';
  export default {
    components: {
      EbtArticleItems,
    },
    props: {
      article: {
        type: Object,
        default: ()=>({
          title: 'article.title?',
          description: 'article.description?',
          path: 'article.path?',
          updatedAt: 'article.updatedAt?',
          slugDir: null,
        }),
      }
    },
    data: ()=>({
      items: [],
      mdiFileEditOutline,
    }),
    async fetch() {
      const { article, $content } = this;
      const { slugDir } = article;
      if (slugDir) {
        let items = await $content(slugDir)
          .only(['title', 'description', 'img', 'slug', 'order', 'author'])
          .fetch();

        this.items = items.sort((a,b) => {
          let cmp = Number(a.order ?? 9999) - Number(b.order ?? 9999);
          if (cmp) {
            return cmp;
          }
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase);
        });
      }
    },
    methods: {
      date(d) {
        return (new Date(d)).toLocaleDateString(navigator.language);
      },
      itemLink(item) {
        let { article } = this;
        return { 
          name: `${article.slugDir}-slug`, 
          params: { slug: item.slug } 
        }
      },
    },
    computed: {
      dir() {
        return this.article.dir.replace('/','');
      },
      language() {
        return navigator.language;
      },
      imgSrc() {
        let { article={} } = this;
        let { img, imgSrc } = article;

        if (!imgSrc) {
          if (/-unsplash/.test(img)) {
            imgSrc = img.replace(/-unsplash.*/,'');
            imgSrc = imgSrc.substring(imgSrc.length - 11);
            imgSrc = `https://unsplash.com/photos/${imgSrc}`;
          }
        }

        return imgSrc;
      },
      pagePath() {
        return this.article.path
            .replace(/.*\//, '')
            .replace(/\.md/, '')
      },
      sourceUrl() {
        let { path } = this.article;
        let { 
            ebt_repository:repo, 
            ebt_account:acct,
        } = this.$nuxt.context.env;
        return `https://github.com/${acct}/${repo}/tree/main/content${path}.md`;
      },
      title() {
        return this.article.title || "(no title)";
      }
    }
  }
</script>
