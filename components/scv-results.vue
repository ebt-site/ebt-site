<template>
  <v-card v-if="mlDocs && nDisplayed" class="scv-results">
    <div v-if="mlDocs.length === 0" class="text-h6 pl-2" >
      {{foundSuttas}}
    </div>
    <vue-details v-else-if="mlDocs.length" 
      class="scv-results-details"
      v-model="showResults"
      > <!-- mlDocs -->
      <summary v-if="resultCount"
        class='scv-summary text-subtitle-2 pt-1 pb-1'
        role="main"
        ref="refResults"
        aria-level="1"
        :aria-label="ariaFoundSuttas(resultCount, playlistDuration.aria)"
      >
        <span aria-hidden=true>
          {{foundSuttas}}
          ({{playlistDuration.display}})
        </span>
      </summary>
      <v-card flat>
        <v-card-text>
          <vue-details v-for="(mld,i) in results.mlDocs" :key="mld.sutta_uid+i" 
            class="scv-result-details"
            v-model="mld.showDetails"
            role="heading" aria-level="2"
          >
            <summary >
              <div class="scv-result-summary" >
                <div v-html="resultTitle(mld)" 
                  class="scv-result-title"
                />
                <!--div class="caption" >{{mld.score}}</div-->
                <div class="caption text-right" 
                  :aria-label="mldDuration(mld).aria">
                  {{mldDuration(mld).display}}
                </div>
              </div><!-- scv-result-summary -->
            </summary>
            <div class="scv-result-text">
              <div v-for="seg in mld.segments.slice(0,displayMatches(mld))" 
                :key="seg.scid" >
                <div v-if="results.searchLang === 'pli'"
                  v-html="seg.pli" class="scv-text-root"/>
                <div v-if="results.searchLang === mld.lang"
                  v-html="seg[mld.lang]" class="scv-text-trans"/>
              </div>
              <div class="scv-result-icons">
                <v-btn icon small fab 
                  @click="clickResult(mld)"
                  class="scv-icon-btn" >
                  <v-icon>{{mdiLaunch}}</v-icon>
                </v-btn>
                <v-btn icon small fab  
                  v-if="mld.segments.length > displayMatches(mld)"
                  @click="displayMatchesIncrement(mld)"
                  class="scv-icon-btn" >
                  <v-icon>{{mdiDotsHorizontal}}</v-icon>
                </v-btn>
              </div>
            </div><!--scv-result-text-->

          <!--
            <div class="scv-playlist ml-3 pt-2 pl-3" 
              v-if="gscv.voices.length" >
              <v-btn icon small fab v-if="playable"
                @click="playSearchText()"
                :title="$t('speakSearchText')"
                :disabled="!playSearch.signature"
                class="scv-icon-btn" :style="cssVars" >
                <v-icon>chat_bubble_outline</v-icon>
              </v-btn>
              <v-btn icon v-if="playable"
                @click="playAll()"
                :title="$t('playAll')"
                class="scv-icon-btn" :style="cssVars" small>
                <v-icon>play_circle_outline</v-icon>
              </v-btn>
              <v-btn icon v-if="playable"
                @click="downloadBuild()"
                :aria-label="`${ariaDownload} ${resultId()}`"
                class="scv-icon-btn" :style="cssVars" small>
                <v-icon>arrow_downward</v-icon>
              </v-btn>
            </div>
            -->
            <!--
            <details role="heading" aria-level="2"
                v-for="(result,i) in (searchResults && searchResults.results||[])"
                :key="`${result.uid}_${i}`"
                class="scv-search-result" :style="cssVars">
                <div v-if="gscv.showId" class="scv-search-result-scid scv-scid">
                  SC&nbsp;{{result.quote.scid}}
                </div>
                <div v-if="result.quote && showPali && result.quote.pli"
                  class="scv-search-result-pli">
                  <div>
                    <div v-html="result.quote.pli"></div>
                  </div>
                </div>
                <div v-if="result.quote && showTrans && result.quote[language]"
                  class="scv-search-result-lang">
                  <div>
                    <span v-html="result.quote[gscv.lang]"></span>
                    <div v-if="gscv.showId" class='scv-scid'>
                      &mdash;
                      {{result.author}} 
                    </div>
                  </div>
                </div>
                <div class="ml-3 pt-2" 
                  style="display:flex; justify-content: space-between">
                  <div>
                    <v-btn icon v-if="result.quote && playable"
                      @click="playQuotes(i, result)"
                      :class="btnPlayQuotesClass(i)" :style="cssVars" small>
                      <v-icon>chat_bubble_outline</v-icon>
                    </v-btn>
                    <v-btn icon v-if="result.quote && playable"
                      @click="playOne(result)"
                      class="scv-icon-btn" :style="cssVars" small>
                      <v-icon>play_circle_outline</v-icon>
                    </v-btn>
                    <v-btn icon v-if="result.quote"
                      :href="resultLink(result)"
                      class="scv-icon-btn" :style="cssVars" small>
                    <v-icon>open_in_new</v-icon>
                    </v-btn>
                    <v-btn icon v-if="playable"
                      @click="downloadBuild(resultRef(result))"
                      :aria-label="`${ariaDownload} ${resultId()}`"
                      class="scv-icon-btn" :style="cssVars" small>
                      <v-icon>arrow_downward</v-icon>
                    </v-btn>
                  </div>
                  <div class="scv-score">
                    {{$t('relevance')}}
                    {{score(result)}}
                  </div>
              </div>
            </details>
            -->
          </vue-details><!-- search result i-->
        </v-card-text>
      </v-card>
    </vue-details><!-- mlDocs -->
  </v-card>
</template>

<script>
import Vue from 'vue';
import VueDetails from 'vue-details';
import { 
  mdiLaunch, 
  mdiDotsHorizontal,
} from '@mdi/js'
const GITHUB = 'https://raw.githubusercontent.com';
const {
  SuttaDuration,
} = require('../src/index');

export default {
  components: {
    VueDetails,
  },
  props: {
    width: {
      type: String,
      default: '35em',
    },
  },
  data: function(){
    return {
      search: '',
      suttaDuration: null,
      _showResults: false,
      nDisplayed: {},
      mdiLaunch,
      mdiDotsHorizontal,
    };
  },
  async mounted() {
    this.suttaDuration = await new SuttaDuration({fetch}).initialize();
  },
  methods:{
    displayMatches(mld) {
      let { nDisplayed } = this;
      return nDisplayed[mld.sutta_uid] || 1;
    },
    displayMatchesIncrement(mld) {
      let key = mld.sutta_uid;
      Vue.set(this.nDisplayed, key, 
        this.nDisplayed[key] ? this.nDisplayed[key]+1 : 2);
    },
    clickResults() {
      Vue.set(this, "nDisplayed", {});
    },
    resultOpen(mld) {
      return mld.sutta_uid === this.$store.state.scv.sutta.sutta_uid;
    },
    suttaId(mld) {
      let { sutta_uid } = mld;
      if (/th.g/.test(sutta_uid)) {
        return sutta_uid.replace(/^t/, 'T');
      } else {
        return sutta_uid.toUpperCase();
      }
    },
    resultTitle(mld) {
      let suid = this.suttaId(mld);
      let parts = mld.title.split('\n');
      switch (parts.length) {
        case 0: return suid;
        case 1: return `${suid}: ${parts[0]}`;
        default: return `${suid}: ${parts[1]}`;
      }
    },
    ariaFoundSuttas(resultCount, duration) {
        //:aria-label="`Found ${resultCount} sootas ${playlistDuration.aria}`"
        var tmplt = this.$t && this.$t('ariaFoundSuttas') || '';
        var text = tmplt
            .replace("A_SEARCH", this.$store.state.scv.search)
            .replace("A_RESULTCOUNT", this.resultCount)
            .replace("A_DURATION", this.duration);
        return text;
    },
    durationDisplay(totalSeconds) {
      totalSeconds = Math.round(totalSeconds);
      var seconds = totalSeconds;
      var hours = Math.trunc(seconds / 3600);
      seconds -= hours * 3600;
      var minutes = Math.trunc(seconds / 60);
      seconds -= minutes * 60;
      if (hours) {
          var tDisplay = this.$t('HHMM');
          var tAria = this.$t('ariaHHMM');
      } else if (minutes) {
          var tDisplay = this.$t('MMSS');
          var tAria = this.$t('ariaMMSS');
      } else {
          var tDisplay = this.$t('seconds');
          var tAria = this.$t('ariaSeconds');
      }
      var display = tDisplay
          .replace(/A_HOURS/, hours)
          .replace(/A_MINUTES/, minutes)
          .replace(/A_SECONDS/, seconds);
      var aria = tAria
          .replace(/A_HOURS/, hours)
          .replace(/A_MINUTES/, minutes)
          .replace(/A_SECONDS/, seconds);

      return {
          totalSeconds,
          hours,
          minutes,
          seconds,
          display,
          aria,
      }
    },
    mldDuration(mld) {
      let { suttaDuration:sd } = this;
      let { sutta_uid, } = mld;
      return sd
        ? this.durationDisplay(sd.duration(mld.sutta_uid))
        : 0;
    },
    clickResult(mld) {
      let { sutta_uid, lang } = mld;
      this.$store.dispatch('scv/loadSutta', {sutta_uid, lang});
    },
  },
  computed: {
    showResults: {
      get: function() {
        return this._showResults;
      },
      set: function(value) {
        this._showResults = value;
        this.nDisplayed = {};
      },
    },
    foundSuttas() {
      let { resultCount, } = this;
      return this.$t && this.$t('foundSuttas')
        .replace(/A_RESULTCOUNT/,resultCount)
        .replace("A_SEARCH", this.$store.state.scv.search);
    },
    mlDocs() {
      return this.results.mlDocs;
    },
    searchResults() { // DEPRECATED
      let { results } = this;
      return { results }
    },
    results() {
      return this.$store.state.scv.searchResults || {};
    },
    resultCount() {
      return this.mlDocs.length;
    },
    duration() {
      let { results, suttaDuration:sd } = this;
      return sd
        ? results.mlDocs.reduce((a,mld)=> a + (sd.duration(mld.sutta_uid)||0), 0)
        : 0;
    },
    playlistDuration() {
      let { mlDocs, suttaDuration:sd } = this;
      var seconds = sd
        ? mlDocs.reduce((a,mld) => {
              return a + sd.duration(mld.sutta_uid);
          }, 0)
        : 0;
      return this.durationDisplay(seconds);
    },
    cssVars() {
      return {
        //"--seg-text-width": this.segTextWidth,
        //'--success-color': this.$vuetify.theme.success,
      }
    },
  },
}
</script>
<style>
</style>
