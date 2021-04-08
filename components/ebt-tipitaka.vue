<template>
  <div class="ebt-nav-sutta" id="ebt-tipitaka" v-if="displayable" >
    <v-btn v-if="previous" small text
      class="ebt-text-btn ebt-nav-btn"
      @click="clickSutta(previous)"
      > 
      <div class="ebt-nav-text">
        <div>{{previous}}</div>
      </div>
    </v-btn>
    <v-icon v-else class="ebt-nav-btn-disabled">{{mdiChevronLeft}}</v-icon>

    <div class="ebt-suttacentral"
      @mouseover="suttacentral=true" @mouseleave="suttacentral=false">
      <a v-if="suttacentral"
        :href="`https://suttacentral.net/${current.sutta_uid}`"
        target="_blank"> SuttaCentral </a>
      <span v-else >
        {{current.sutta_uid}}/{{current.lang}} </span>
    </div>

    <v-btn v-if="next" small text
      class="ebt-text-btn ebt-nav-btn"
      @click="clickSutta(next)"
      > 
      <div class="ebt-nav-text">
        <div>{{next}}</div>
      </div>
    </v-btn>
    <v-icon v-else class="ebt-nav-btn-disabled">{{mdiChevronRight}}</v-icon>
  </div>
</template>

<script>
import Vue from "vue";
import {
  mdiChevronLeft,
  mdiChevronRight,
} from '@mdi/js';

export default {
  components: {
  },
  props: {
    js: Object,
  },
  data: function(){
    return {
      mdiChevronLeft,
      mdiChevronRight,
      tipitaka: null,
      suttacentral: false,
    };
  },
  async mounted() {
    let { $el={}, js } = this;
    let tipitaka = new js.Tipitaka();
    Vue.set(this, 'tipitaka', tipitaka);
    this.$nuxt.$on('ebt-load-sutta', payload=>{
      typeof $el.scrollIntoView === 'function' && $el.scrollIntoView({
        block: "center",
      });
    });
  },
  methods:{
    clickSutta(sutta_uid) {
      let { $store, settings, } = this;
      let lang = this.settings.lang;
      console.log(`clickSutta`, {sutta_uid, lang});
      $store.dispatch('ebt/loadSutta', {sutta_uid, lang, });
    },
  },
  computed: {
    displayable() {
      let { tipitaka, sutta } = this;
      return tipitaka && sutta && sutta.sutta_uid;
    },
    previous() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        return tipitaka.previousSuid(sutta_uid);
    },
    current() {
        return this.sutta;
    },
    settings() {
      return this.$store.state.ebt.settings;
    },
    next() {
        let { tipitaka, sutta } = this;
        let { sutta_uid, lang } = sutta;
        return tipitaka.nextSuid(sutta_uid);
    },
    sutta() {
        return this.$store.state.ebt.sutta;
    },
  },
}
</script>
<style>
.ebt-tipitaka {
    display: flex;
    flex-flow: row noWrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-left: 2em;
    padding-right: 2em;
}
.ebt-tipitaka > button {
    width: 8em !important;
}
.ebt-tipitaka-button {
  min-width: 5rem;
}
</style>
