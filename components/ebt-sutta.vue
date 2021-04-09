<template>
  <div v-if="sutta && sutta.sutta_uid" class="ebt-sutta" >
    <header class="ebt-header-class">
      <ebt-history :js="js" />
    </header>
    <div class="ebt-text-container" @click="textClicked($event)">
      <div v-for="seg in segments" :key="seg.scid" 
        :id="seg.scid"
        @click="clickSegment(seg)"
        :class="segmentClass(seg)">
        <div v-if="settings.showId" class="ebt-scid">{{seg.scid}}</div>
        <div v-if="settings.showPali" v-html="seg.pli" class="ebt-text-root"/>
        <div v-if="settings.showTrans" v-html="seg[sutta.lang]" class="ebt-text-trans"/>
      </div>
    </div><!-- ebt-text-container -->
    <footer class="ebt-footer">
        <ebt-tipitaka :js="js" />
    </footer>
  </div>
</template>

<script>
import EbtHistory from './ebt-history'
import EbtTipitaka from './ebt-tipitaka'

export default {
  components: {
    EbtHistory,
    EbtTipitaka,
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
      $store.commit('ebt/cursorScid', seg.scid);
    },
    title(n) {
        return this.titles[n] || {};
    },
    textClicked(event) {
      let { sutta, lang, $store } = this;
      if (event.target.className === 'ebt-matched') {
        let text = event.target.innerText;
        let pattern = this.bilaraWeb.exampleOfMatch(text, lang);
        console.log(`textClicked`, event, text, 'example:', pattern, lang);
        if (pattern) {
          $store.dispatch('ebt/loadExample', {pattern, lang});
        }
      }
    },
    segmentClass(seg) {
        let { cursor, fullLine } = this.$store.state.ebt.settings;
        let { scid } = seg;
        let { titles } = this;
        let segClass = "ebt-segment";
        if (/:0.1$/.test(scid)) {
          segClass = `ebt-division`;
        } else if (/:0/.test(scid)) {
          segClass = `ebt-sutta-title`;
        }
        if (!fullLine) {
          segClass += ' ebt-side-by-side';
        }

        return cursor && seg.scid === cursor.scid
            ? `${segClass} ebt-sutta-cursor`
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
      return this.$store.state.ebt.settings;
    },
    sutta() {
      return this.$store.state.ebt.sutta;
    },
    lang() {
      return this.sutta.lang || 'en';
    }
  },
}
</script>
<style>
</style>
