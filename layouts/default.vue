<template>
  <v-app >
    <v-app-bar dark :clipped-left="clipped" fixed app hide-on-scroll >
      <ebt-app-bar title="EBT-Vue" :imgUrl="siteImage">
        <v-btn icon to="/components" class="ebt-icon-btn" >
          <v-icon class="ebt-settings-icon">{{mdiMenu}}</v-icon>
        </v-btn>
      </ebt-app-bar>
    </v-app-bar>
    <div class="site-main">
      <v-container class="site-content">
        <nuxt />
      </v-container>
    </div>
    <v-footer app dark >
      <ebt-cursor :js="js"/>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
const { version } = require('~/package.json');
import { EbtVue } from '../index';
const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}
import {
  mdiMenu,
} from "@mdi/js";
let {
  EbtAppBar,
  EbtCursor,
} = EbtVue;

export default {
  components: {
    EbtCursor,
    EbtAppBar,
  },
  data () {
    return {
      clipped: false,
      mdiMenu,
    }
  },
  methods: {
  },
  computed: {
    js() { 
      return JS;
    },
    version() {
      return version;
    },
    siteImage() {
      return 'greg-rosenke-bJdK9v-VVw0-unsplash.png';
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
