<template>
  <div class="ebt-nav-cursor">
    <v-btn small text
        class="ebt-text-btn ebt-nav-btn"
        @click="clickCursor(cursor)"
    >{{cursorLabel}}</v-btn>
    <v-spacer/>
    <div class="text-center"><!-- center -->
      <div><!-- audio player-->
        <v-btn icon disabled
            @click="clickPlayPrevious()"
            :aria-label="$t('ariaPlayPrevious')"
            class="ebt-icon-btn" >
            <v-icon >{{mdiSkipPrevious}}</v-icon>
        </v-btn>
        <v-btn icon
            @click="clickPlay()"
            :aria-label="$t('ariaPlay')"
            class="ebt-icon-btn" >
            <v-icon >{{mdiPlay}}</v-icon>
        </v-btn>
        <v-btn icon disabled
            @click="clickPlayNext()"
            :aria-label="$t('ariaPlayNext')"
            class="ebt-icon-btn" >
            <v-icon >{{mdiSkipNext}}</v-icon>
        </v-btn>
      </div><!-- audio player-->
    </div><!-- center -->
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
  mdiPlay,
  mdiPause,
  mdiSkipNext,
  mdiSkipPrevious,
} from '@mdi/js';
const {
  Settings,
  BilaraWeb,
} = require('../src/index');

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
      mdiChevronUp,
      mdiChevronDown,
      mdiPlay,
      mdiPause,
      mdiSkipNext,
      mdiSkipPrevious,
      audioContext: new AudioContext(),
      bilaraWeb: null,
    };
  },
  async mounted() {
    let { $el, $refs } = this;
    this.$nuxt.$on('ebt-load-sutta', payload=>{
      $el && $el.scrollIntoView({
        block: "center",
      });
    });
    this.bilaraWeb = new this.js.BilaraWeb({fetch});
  },
  methods:{
    async fetchAudioSource(...urls) {
      urls = urls.filter(url=>!!url);
      let nUrls = urls.length;
      let audioContext = new AudioContext();
      let audioSource = audioContext.createBufferSource();
      let urlResults = urls.map(url=>fetch(url));
      let urlBuffers = [];
      let urlAudio = [];
      let numberOfChannels = 2;
      let length = 0;
      let sampleRate = 48000;
      for (let i = 0; i < nUrls; i++) {
        urlBuffers.push((await urlResults[i]).arrayBuffer());
      }
      for (let i = 0; i < nUrls; i++) {
        urlAudio.push(audioContext.decodeAudioData(await urlBuffers[i]));
      }
      for (let i = 0; i < nUrls; i++) {
        let ua = urlAudio[i] = await urlAudio[i];
        numberOfChannels = Math.min(numberOfChannels, ua.numberOfChannels);
        length += ua.length;
        sampleRate = Math.max(sampleRate, ua.sampleRate);
      }

      let audioBuffer = new AudioBuffer({length, numberOfChannels, sampleRate})
      for (let channelNumber = 0; channelNumber < numberOfChannels; channelNumber++) {
        let offset = 0;
        let channelData = new Float32Array(length);
        for (let i = 0; i < nUrls; i++) {
          let ua = urlAudio[i];
          channelData.set(ua.getChannelData(channelNumber), offset);
          offset += ua.length;
        }
        audioBuffer.copyToChannel(channelData, channelNumber);
      }

      audioSource.buffer = audioBuffer;
      audioSource.connect(audioContext.destination);
      return audioSource;
    },
    async clickPlay() {
      let {
        bell,
        bilaraWeb,
        cursor,
        settings,
      } = this;
      let { scid, lang, translator } = cursor;
      console.log(`dbg clickPlay`, {cursor});
      let vtrans = settings.vnameTrans;
      let vroot = settings.vnameRoot;
      let audioUrls = await bilaraWeb.segmentAudioUrls({
        scid,
        lang,
        translator,
        vtrans,
        vroot,
      });

      let audioSource = await this.fetchAudioSource(
        settings.showPali && audioUrls.pli,
        settings.showTrans && audioUrls[lang],
      );
      console.log(`ebt-cursor.clickPlay()`, {scid, lang, vroot, vtrans});
      audioSource.start();
    },
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
    bell() {
      let { ips } = this;
      return ips && Settings.IPS_CHOICES[ips];
    },
    ips() {
      return this.settings?.ips; 
    },
    settings() {
      return this.$store.state.ebt.settings; 
    },
  },
}
</script>
<style>
</style>
