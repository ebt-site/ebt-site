<template>
  <div class="ebt-nav-cursor">
    <v-btn small text
        class="ebt-text-btn ebt-nav-btn"
        @click="clickCursor(cursor)"
    >{{cursorLabel}}</v-btn>
    <v-spacer/>
    (TBD)
    <v-spacer/>

    <v-btn icon
        @click="clickPageTop()"
        :aria-label="$t('ariaPageTop')"
        class="ebt-icon-btn" >
        <v-icon >{{mdiChevronUp}}</v-icon>
    </v-btn>
    <v-btn icon
        @click="clickPageBottom()"
        :aria-label="$t('ariaPageBottom')"
        class="ebt-icon-btn" >
        <v-icon >{{mdiChevronDown}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiChevronUp,
  mdiChevronDown,
} from '@mdi/js';

export default {
  components: {
  },
  props: {
  },
  data: function(){
    return {
      mdiChevronLeft,
      mdiChevronRight,
      mdiChevronUp,
      mdiChevronDown,
    };
  },
  async mounted() {
    let { $el } = this;
    this.$nuxt.$on('ebt-load-sutta', payload=>{
      $el && $el.scrollIntoView({
        block: "center",
      });
    });
  },
  methods:{
    clickPageTop() {
        let elt = document.getElementById("ebt-search-field");
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
        let elt = document.getElementById("ebt-tipitaka");
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
            await $store.dispatch('ebt/loadSutta', {sutta_uid, lang, updateHistory});
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
        return this.$store.state.ebt.settings.cursor;
    },
    current() {
        let { history, sutta } = this;
        let { sutta_uid, lang } = sutta;
        let iCur = history.findIndex(h=>h.sutta_uid===sutta_uid && h.lang===lang);
        return history[iCur] || sutta;
    },
    sutta() {
        return this.$store.state.ebt.sutta;
    },
    history() {
      return this.$store.state.ebt.settings.history;
    },
  },
}
</script>
<style>
</style>
