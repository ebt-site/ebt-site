<template>
  <v-app >
    <v-app-bar dark :clipped-left="clipped" fixed app hide-on-scroll >
      <ebt-app-bar 
        :title="ebtSiteTitle"
        :imgUrl="ebtSiteImage"
        :monolingual="ebtLang"
        >
        <v-btn icon class="ebt-icon-btn" 
          title="Github"
          :href="githubUrl" target="_blank">
          <v-icon>{{ mdiGithub }}</v-icon>
        </v-btn>
      </ebt-app-bar>
    </v-app-bar>
    <div class="site-main">
      <v-container class="site-content">
        <nuxt />
      </v-container>
    </div>
    <ebt-processing />
  </v-app>
</template>

<script>
import Vue from 'vue';
const { version } = require('~/package.json');
import { EbtVue } from 'ebt-vue';
const JS = {
  BilaraWeb: require('ebt-vue/src/bilara-web'),
}
import {
  mdiMenu,
  mdiGithub,
  mdiFileClock,
} from "@mdi/js";
let {
  EbtProcessing,
  EbtAppBar,
} = EbtVue;

export default {
  components: {
    EbtProcessing,
    EbtAppBar,
  },
  data () {
    return {
      clipped: false,
      mdiMenu,
      mdiGithub,
      mdiFileClock,
    }
  },
  methods: {
  },
  mounted() {
    console.log('layouts/default mounted', 
        this.$nuxt,
    );
  },

  computed: {
    js() { 
      return JS;
    },
    version() {
      return version;
    },
    processing() {
        let { $store } = this;
        return $store && $store.state.ebt.processing;
    },
    ebtLang() {
        return this.$nuxt.context.env.ebt_lang;
    },
    ebtSiteImage() {
        return this.$nuxt.context.env.ebt_site_image;
    },
    ebtSiteTitle() {
        return this.$nuxt.context.env.ebt_site_title;
    },
    githubUrl() {
        let {
          ebt_repository,
          ebt_account,
        } = this.$nuxt.context.env;
        return `https://github.com/${ebt_account}/${ebt_repository}`;
    },
  },
}
</script>
<style>
.site-main {
}
.site-content {
  margin-top: 90px;
  padding: 0;
  padding-bottom: 60px;
}
</style>
