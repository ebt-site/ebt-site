<template>
  <v-app >
    <v-app-bar dark :clipped-left="clipped" fixed app hide-on-scroll >
      <scv-app-bar title="Scv-Static" :imgUrl="siteImage">
        <v-btn icon to="/components" class="scv-icon-btn" >
          <v-icon class="scv-settings-icon">{{mdiMenu}}</v-icon>
        </v-btn>
      </scv-app-bar>
    </v-app-bar>
    <div class="site-main">
      <v-container class="site-content">
        <nuxt />
      </v-container>
    </div>
    <v-footer app dark >
      <scv-cursor />
    </v-footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
const { version } = require('~/package.json');
import { ScvVue } from '../index';
import {
  mdiMenu,
} from "@mdi/js";
let {
  ScvAppBar,
  ScvCursor,
} = ScvVue;

export default {
  components: {
    ScvCursor,
    ScvAppBar,
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
