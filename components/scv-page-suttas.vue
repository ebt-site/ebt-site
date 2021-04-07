<template>
  <v-sheet light class="desktop" >
    <div class="desktop-search">
      <scv-search-field :js="js"
        v-on:search-text="search"
      />
      <scv-results :js="js"/>
    </div>
    <scv-sutta :js="js" />
  </v-sheet>
</template>

<script>
import Vue from 'vue';
import { ScvVue } from './index';
import ScvSearchField from './scv-search-field';
import ScvResults from './scv-results';
import ScvSettings from './scv-settings';
import ScvSutta from './scv-sutta';

const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}

export default {
  components: {
    ScvSearchField,
    ScvResults,
    ScvSutta,
    ScvSettings,
  },
  data: function(){
    return {
      panels: [0,1],
      monolingual: null,
    };
  },
  mounted() {
  },
  methods:{
    search(value) {
      console.log(`search:`, value);
    },
    githubUrl(path) {
      return `https://github.com/ebt-site/ebt-vue/blob/main/${path}`;
    },
  },
  computed: {
    version() {
      return require('../package.json').version;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
.v-application code {
  background-color: #000;
}

.desktop-search {
  xmax-width: 28rem;
}

.desktop-nav {
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
  background-color: #eee;
}

.desktop {
  display: flex;
  flex-flow: column;
  align-items: center;
}

</style>
