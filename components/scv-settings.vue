<template>
  <v-sheet class="scv-settings" v-if="isMounted">
    <v-btn dark icon
        id="more-menu-btn"
        @click="clickSettings()"
        aria-haspopup="true"
        aria-controls="more-menu"
        :aria-label="$t('ariaMore')"
        :aria-expanded="moreVisible"
        class="scv-icon-btn" :style="cssProps" >
        <v-icon size="20px" class="scv-settings-icon">{{mdiCog}}</v-icon>
    </v-btn>
    <v-sheet light>
    <ul light class="scv-more-menu" 
      id = "more-menu"
      ref="ref-more-menu"
      aria-labelledby="more-menu-btn"
      v-if="moreVisible"
      @focusin="focusMore(true)"
      :aria-hidden="!moreVisible">
      <li class="" role="none" ><!-- General -->
        <details role="menuitem" 
          @click="clickDetails('general', $event)"
          :open="showDetail('general')"
        >
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('general')}}</div>
                <div class="body-2">
                  {{version}}
                  <span v-if="saveCookies && openDetail!=='general'">, cookies</span>
                </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings-detail">
            <scv-checkbox v-model="saveSettingsExamples"
              ref="saveSettingsExamples-focus"
              :label="$t('storeSettingsHistory')"/>
          </div>
          <div class="scv-settings-detail">
            <scv-checkbox v-model="saveSettings"
              ref="saveSettings-focus"
              :label="$t('storeSettingsInCookies')"/>
          </div>
        </details>
      </li><!-- General -->
      <li class="" role="none" v-if="!monolingual"><!-- Language -->
        <details role="menuitem" 
          @click="clickDetails('lang', $event)"
          :open="showDetail('lang')"
        >
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('languages')}}</div>
                <div v-if="openDetail!=='lang'" class="body-2">
                  {{locale.toUpperCase()}} {{lang.toUpperCase()}}
                </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings-detail">
            <div class="scv-select-container">
              <select id="locale-select" 
                ref="lang-focus"
                class="scv-select"
                v-model="locale"
                @click="stopPropagation($event)">
                <option v-for="item in languages" :key="item.code" 
                  :selected="item.code===locale"
                  :value="item.code">{{item.label}}</option>
              </select>
              <label for="locale-select">{{$t('uiLanguage')}}</label>
            </div>
            <div class="scv-select-container">
              <select id="lang-select" 
                class="scv-select"
                v-model="lang"
                @click="stopPropagation($event)">
                <option v-for="item in transLanguages" :key="item.code" 
                  :selected="item.code===lang"
                  :value="item.code">{{item.label}}</option>
              </select>
              <label for="lang-select">{{$t('transLanguage')}}</label>
            </div>
          </div>
        </details>
      </li><!-- Language -->
      <li class="" role="none" ><!-- Translation -->
        <details role="menuitem" 
          @click="clickDetails('trans', $event)"
          :open="showDetail('trans')"
        >
          <summary class="scv-summary">
            <div class="scv-settings-title">
                <div>{{$t('textLayout')}}</div>
                <div >
                  <span v-if="showId" class="body-2">#</span>
                  <span v-if="showPali" class="body-2">Pali</span>
                  <v-icon class="scv-settings-icon"
                    v-if="fullLine && showPali && showTrans">
                    {{ mdiFormatAlignJustify}}
                  </v-icon>
                  <v-icon class="scv-settings-icon"
                    v-if="!fullLine && showPali && showTrans" >
                    {{ mdiFormatColumns}}
                  </v-icon>
                  <span v-if="showTrans" class="body-2">
                    {{lang.toUpperCase()}}</span>
                </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings-detail">
            <scv-checkbox v-model="showPali" 
              ref="trans-focus"
              :aria-checked="showPali"
              :label="$t('showPaliText')"
              @click="stopPropagation($event)"
              />
            <scv-checkbox v-model="showTrans" 
              :aria-checked="showTrans"
              :label="$t('showTransText')"
              @click="stopPropagation($event)"
              />
            <scv-checkbox v-model="fullLine" 
              :aria-checked="fullLine"
              :label="$t('showLineByLine')"
              @click="stopPropagation($event)"
              />
            <scv-checkbox v-model="showId" 
              :aria-checked="showId"
              :label="$t('showTextSegmentIds')"
              @click="stopPropagation($event)"
              />
          </div>
        </details>
      </li><!-- Translation -->
      <li class="" role="none" ><!-- reader -->
        <details role="menuitem"
          @click="clickDetails('reader', $event)"
          :open="showDetail('reader')"
          >
          <summary class="scv-summary">
            <div class="scv-settings-title">
              <div>{{$t('reader')}}</div>
              <div>
                <span class="body-2" v-if="showPali && openDetail!=='reader'">
                  {{vnameRoot}}</span>
                <span class="body-2" v-if="showTrans && openDetail!=='reader'">
                  {{vnameTrans}}</span>
              </div>
            </div><!--scv-settings-title-->
          </summary>
          <div class="scv-settings-detail">
            <div class="scv-select-container">
              <select id="reader-select-trans" 
                class="scv-select"
                ref="reader-focus"
                v-model="vnameTrans"
                @click="stopPropagation($event)">
                <option v-for="item in langVoices(lang, 'vnameTrans')" :key="item.code" 
                  :selected="item.name===vnameTrans"
                  :value="item.name">{{item.label}}</option>
              </select>
              <label for="reader-select-trans">{{lang.toUpperCase()}}</label>
            </div>
            <div class="scv-select-container">
              <select id="reader-select-root" 
                class="scv-select"
                v-model="vnameRoot"
                @click="stopPropagation($event)">
                <option v-for="item in langVoices('pli', 'vnameRoot')" :key="item.code" 
                  :selected="item.name===vnameRoot"
                  :value="item.name">{{item.label}}</option>
              </select>
              <label for="reader-select-root">Pali</label>
            </div>
          </div>
        </details>
      </li><!-- reader -->
      <li class="" role="none" >
        <details role="menuitem" 
          @click="clickDetails('search', $event)"
          :open="showDetail('search')"
          >
          <summary class="scv-summary">
            <div class="scv-settings-title">
              <div>{{$t('searchResults')}}</div>
              <div class="body-2" v-if="openDetail!=='search'">{{maxResults}}</div>
            </div>
          </summary>
          <div class="scv-settings-detail" >
            <div class="scv-select-container"
              @click="stopPropagation($event)"
              >
              <select id="maxResults-select" 
                ref="search-focus"
                class="scv-select"
                v-model="maxResults"
                >
                <option v-for="n in [5,10,25,50]" :key="n" 
                  :selected="maxResults === n"
                  :value="n">{{n}} {{$t('searchResults')}}</option>
              </select>
            </div><!--scv-select-container-->
          </div>
        </details>
      </li>
      <li class="" role="none" ><!-- Audio -->
        <details role="menuitem" 
          @click="clickDetails('audio', $event)"
          :open="showDetail('audio')"
          >
          <summary class="scv-summary">  
            <div class="scv-settings-title"> 
              <div>{{$t('audio')}} </div>
              <div class="body-2" v-if="openDetail!=='audio'">{{audio}}</div>
            </div>
          </summary>
          <div class="scv-settings-detail">
            <div class="scv-select-container" @click="stopPropagation($event)" >
              <select id="audio-select" 
                ref="audio-focus"
                class="scv-select "
                v-model="audio"
                >
                <option :selected="audio==='opus'" value="opus">
                  Opus {{$t('audio')}}</option>
                <option :selected="audio==='ogg'" value="ogg">
                  Ogg {{$t('audio')}}</option>
                <option :selected="audio==='mp3'" value="mp3">
                  MP3 {{$t('audio')}}</option>
              </select>
            </div><!--scv-select-container-->
            <div class="scv-select-container" @click="stopPropagation($event)" >
              <select id="ips-select" 
                ref="sound-focus"
                class="scv-select caption"
                v-model="ips"
                >
                <option v-for="item in ipsChoices" :key="item.value" 
                  v-if="item.value !== 1"
                  :selected="item.value===ips"
                  :value="item.value">{{$t(item.i18n)}}</option>
              </select>
              <label for="ips-select" v-if="ips">
                <v-btn icon 
                  class="scv-icon-btn"
                  @click="playBell"
                  >
                  <v-icon small>{{mdiVolumeHigh}}</v-icon>
                </v-btn>
              </label>
              <audio v-for="bell in ipsChoices"
                :ref="`refIps${bell.value}`" 
                preload=auto v-if="bell.value" >
                <source type="audio/ogg" :src="bell.url.substring(1)" />
                <p>{{$t('noHTML5')}}</p>
              </audio>
            </div><!--scv-select-container-->
          </div>
        </details>
      </li><!-- Audio -->
      <li class="text-center settings-close" role="none">
        <v-btn id="btnSettings" 
          small
          class="scv-text-btn"
          :aria-label="$t('ariaClose')"
          @click="focusMore(false,$event)"
          >
          {{$t('$vuetify.close')}}
        </v-btn>
      </li>
    </ul> <!-- scv-more-menu -->
    </v-sheet>
  </v-sheet> <!-- scv-more -->
</template>

<script>
import Vue from "vue";
import ScvCheckbox from './scv-checkbox.vue';
import {
  mdiCog,
  mdiVolumeHigh,
  mdiFormatAlignJustify,
  mdiFormatColumns,
} from "@mdi/js";
const {
  Settings,
  BilaraWeb,
} = require('../src/index');
const {version } = require('../package.json');

export default {
  components: {
    ScvCheckbox,
  },
  props: {
    version: {
      type: String,
      default: version,
    },
    monolingual: {
      type: String,
      default: null,
    },
  },
  data: function(){
    return {
      isMounted: false,
      moreVisible: false,
      openDetail: null,
      languages: Settings.WEB_LANGUAGES,
      moreFocus: null,
      mdiCog,
      mdiVolumeHigh,
      mdiFormatAlignJustify,
      mdiFormatColumns,
    };
  },
  mounted() {
    let { monolingual } = this;
    this.$store.dispatch('scv/loadVoices');
    Vue.set(this, "isMounted", true);
    if (monolingual) {
      this.locale = monolingual;
      this.lang = monolingual;
      console.log(`scv-settings mounted monolingual:${monolingual}`);
    } else {
      console.log(`scv-settings mounted`, this);
    }
  },
  methods:{
    clickDetails(id, evt) {
      let opening = id !== this.openDetail;
      Vue.set(this, "openDetail", opening ? id : undefined);
      let refFocus = `${id}-focus`;
      let idFocus = opening && this.$refs[refFocus];
      if (idFocus) {
        this.$nextTick(()=>{ 
          if (idFocus.$refs && idFocus.$refs.input) {
            idFocus.$refs.input.focus();
          } else if (idFocus.$el) {
            idFocus.$el.focus();
          } else {
            idFocus.focus(); 
          }
        });
      } else {
        console.log(`clickDetails no focus:`, refFocus);
      }
      evt.preventDefault();
    },
    showDetail(id) {
      return this.openDetail === id;
    },
    langLabel(lang) {
        return Settings.langLabel(lang);
    },
    clickSettings() {
      Vue.set(this, "moreVisible", !this.moreVisible);
    },
    focusMore(focus) {
      this.moreFocus = focus;
      setTimeout(()=>{
          if (!this.moreFocus) {
              this.moreVisible = false;
          }
      }, 500);
    },
    clickBackdrop(){
      this.focusMore(false);
    },
    stopPropagation(event) {
      event.stopPropagation();
    },
    localeChanged(event, code) {
      console.log('localeChanged', event, code);
    },
    langVoices(lang, vnameKey) {
      let { voices, } = this;
      let vname = this[vnameKey];
      let langVoices = voices.filter(v=>v.langTrans===lang);
      if (!langVoices.some(v=>v.name === vname)) {
        this.$nextTick(()=> {
          this[vnameKey] = langVoices[0].name;
        });
      }
      return langVoices;
    },
    playBell() {
      let ips = Settings.IPS_CHOICES[this.ips];
      if (ips) {
        let refAudio = this.$refs[`refIps${ips.value}`];
        let audio = refAudio instanceof Array ? refAudio[0] : refAudio;
        audio && audio.play();
      }
    },
  },
  computed: {
    ready() {
      return this.hasOwnProperty('$t');
    },
    fullLine: {
      get: function() { return this.$store.state.scv.settings.fullLine; },
      set: function(value) { this.$store.commit("scv/settings", {fullLine:value}); },
    },
    showTrans: {
      get: function() { return this.$store.state.scv.settings.showTrans; },
      set: function(value) { this.$store.commit("scv/settings", {showTrans:value}); },
    },
    showPali: {
      get: function() { return this.$store.state.scv.settings.showPali; },
      set: function(value) { this.$store.commit("scv/settings", {showPali:value}); },
    },
    showId: {
      get: function() { return this.$store.state.scv.settings.showId; },
      set: function(value) { this.$store.commit("scv/settings", {showId:value}); },
    },
    lang: {
      get: function() { return this.$store.state.scv.settings.lang; },
      set: function(value) { this.$store.commit("scv/settings", {lang:value}); },
    },
    maxResults: {
      get: function() { return this.$store.state.scv.settings.maxResults; },
      set: function(value) { 
        this.$store.commit("scv/settings", {maxResults:Number(value)}); },
    },
    locale: {
      get: function() { return this.$store.state.scv.settings.locale; },
      set: function(value) { this.$store.commit("scv/settings", {locale:value}); },
    },
    audio: {
      get: function() { return this.$store.state.scv.settings.audio; },
      set: function(value) { this.$store.commit("scv/settings", {audio:value}); },
    },
    saveCookies: {
      get: function() {
        return this.saveSettings || this.saveSettingsExamples;
      }
    },
    saveSettings: {
      get: function() { return !!this.$store.state.scv.settings.saveSettings; },
      set: function(value) { 
        this.$store.commit("scv/settings", {saveSettings:value}); 
      },
    },
    saveSettingsExamples: {
      get: function() { return !!this.$store.state.scv.settings.saveSettingsExamples; },
      set: function(value) { 
        this.$store.commit("scv/settings", {saveSettingsExamples:value}); 
      },
    },
    vnameRoot: {
      get: function() { return this.$store.state.scv.settings.vnameRoot; },
      set: function(value) { 
        this.$store.commit("scv/settings", {vnameRoot:value}); 
      },
    },
    vnameTrans: {
      get: function() { return this.$store.state.scv.settings.vnameTrans; },
      set: function(value) { 
        this.$store.commit("scv/settings", {vnameTrans:value}); 
      },
    },
    settings() {
      return this.$store.state.scv.settings;
    },
    voices() {
      return this.$store.state.scv.voices;
    },
    transLanguages() {
      return Settings.TRANS_LANGUAGES;
    },
    cssProps() {
        return {
            'margin': '0',
        };
    },
    ipsChoices() {
      return Settings.IPS_CHOICES;
    },
    ipsUrl() {
      return this.ips && Settings.IPS_CHOICES[this.ips].url;
    },
    ips: {
      get: function() { return this.$store.state.scv.settings.ips; },
      set: function(value) { this.$store.commit("scv/settings", {ips:value}); },
    },
  },
}
</script>
