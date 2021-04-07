<template>
  <div v-if="sutta && sutta.sutta_uid" class="scv-sutta" >
    <header class="scv-header-class">
      <scv-history :js="js" />
    </header>
    <div class="scv-text-container" @click="textClicked($event)">
      <div v-for="seg in segments" :key="seg.scid" 
        :id="seg.scid"
        @click="clickSegment(seg)"
        :class="segmentClass(seg)">
        <div v-if="settings.showId" class="scv-scid">{{seg.scid}}</div>
        <div v-if="settings.showPali" v-html="seg.pli" class="scv-text-root"/>
        <div v-if="settings.showTrans" v-html="seg[sutta.lang]" class="scv-text-trans"/>
      </div>
    </div><!-- scv-text-container -->
    <footer class="scv-footer">
        <scv-tipitaka :js="js" />
    </footer>
  </div>
</template>

<script>
import ScvHistory from './scv-history'
import ScvTipitaka from './scv-tipitaka'

export default {
  components: {
    ScvHistory,
    ScvTipitaka,
  },
  props: {
    js: Object,
  },
  data: function(){
    return {
      bilaraWeb: null,
    };
  },
  async mounted() {
    this.bilaraWeb = new this.js.BilaraWeb({fetch});
  },
  methods:{
    clickSegment(seg) {
      let { $store } = this;
      $store.commit('scv/cursorScid', seg.scid);
    },
    title(n) {
        return this.titles[n] || {};
    },
    textClicked(event) {
      let { sutta, lang, $store } = this;
      if (event.target.className === 'scv-matched') {
        let text = event.target.innerText;
        let pattern = this.bilaraWeb.exampleOfMatch(text, lang);
        console.log(`textClicked`, event, text, 'example:', pattern, lang);
        if (pattern) {
          $store.dispatch('scv/loadExample', {pattern, lang});
        }
      }
    },
    segmentClass(seg) {
        let { cursor, fullLine } = this.$store.state.scv.settings;
        let { scid } = seg;
        let { titles } = this;
        let segClass = "scv-segment";
        if (/:0.1$/.test(scid)) {
          segClass = `scv-division`;
        } else if (/:0/.test(scid)) {
          segClass = `scv-sutta-title`;
        }
        if (!fullLine) {
          segClass += ' scv-side-by-side';
        }

        return cursor && seg.scid === cursor.scid
            ? `${segClass} scv-sutta-cursor`
            : `${segClass}`;
    },
  },
  computed: {
    titles() {
      return this.sutta.segments.filter(seg=>/:0/.test(seg.scid));
    },
    segments() {
      //return this.sutta.segments.filter(seg=>!/:0/.test(seg.scid));
      return this.sutta.segments;
    },
    settings() {
      return this.$store.state.scv.settings;
    },
    sutta() {
      return this.$store.state.scv.sutta;
    },
    lang() {
      return this.sutta.lang || 'en';
    }
  },
}
</script>
<style>
</style>
