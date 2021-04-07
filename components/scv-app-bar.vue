<template>
  <div class="scv-nav-app">
    <div class="scv-nav-app-title" @click="clickHome()">
      <img :src="imgUrl" class="scv-nav-img" @click="clickHome()" ></img>
      <v-icon class="ml-2 mb-1">{{mdiHome}}</v-icon>
      <div class="scv-nav-title">{{title}}</div>
    </div>
    <div class="scv-nav-app-icons">
      <v-btn icon to="/suttas" class="scv-icon-btn" >
        <v-icon dark>{{mdiMagnify}}</v-icon>
      </v-btn>
      <scv-settings :js="js" 
        :monolingual="monolingual"
        :version="`version ${version}`"
      />
      <v-btn icon to="/wiki" class="scv-icon-btn" >
        <v-icon dark>{{mdiWikipedia}}</v-icon>
      </v-btn>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ScvSettings from './scv-settings';
import {
  mdiHome,
  mdiMagnify,
  mdiWikipedia,
} from '@mdi/js';
import { 
  name, 
  version,
} from '@/package.json';
const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}

export default {
  components: {
    ScvSettings,
  },
  props: {
    version: {
      type: String,
      default: version,
    },
    home: {
      type: String,
      default: '/wiki/welcome',
    },
    monolingual : {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "scv-static",
    },
    imgUrl: {
      type: String,
      default: "candle.png",
    },
  },
  data: function(){
    return {
      mdiMagnify,
      mdiWikipedia,
      mdiHome,
    };
  },
  async mounted() {
  },
  methods:{
    clickHome() {
      let { home } = this;
      try {
        this.$route !== home && this.$router.replace(home);
      } catch(e) {
        console.log(`clickHome`, home, e.message);
      }
    },
    clickPageTop() {
        let elt = document.getElementById("scv-search-field");
        if (elt) {
            let refSearchAuto = elt.__vue__.$refs.refSearchAuto;
            let input = refSearchAuto.$refs.input;
            this.$nextTick(()=>{
                elt.scrollIntoView({block: "center"});
                input.focus();
            });
        }
    },
    clickPageBottom() {
        let elt = document.getElementById("scv-tipitaka");
        console.log('clickPageBottom', {elt});
        elt && this.$nextTick(()=>{
            elt.scrollIntoView({block: "center"});
        });
    },
    async clickCursor(cursor) {
        let { sutta, history, $store } = this;
        let { sutta_uid, lang } = cursor;
        let updateHistory = false;
        if (sutta_uid !== sutta.sutta_uid) {
            await $store.dispatch('scv/loadSutta', {sutta_uid, lang, updateHistory});
        }
        let elt = document.getElementById(cursor.scid);
        elt && elt.scrollIntoView({block: "center"});
    },
  },
  computed: {
    cursorLabel() {
        let { cursor } = this;
        if (!cursor) {
            return "...";
        }
        let { scid, lang } = cursor;
        return `${scid}/${lang}`;
    },
    cursor() {
        return this.$store.state.scv.settings.cursor;
    },
    current() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur] || sutta;
    },
    sutta() {
        return this.$store.state.scv.sutta;
    },
    history() {
      return this.$store.state.scv.settings.history;
    },
    js() { 
      return JS;
    },
  },
}
</script>
<style>
</style>
