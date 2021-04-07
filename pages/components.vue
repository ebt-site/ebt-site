<template>
  <div>
    <div class="text-h5"> Vue Components </div>
    <v-expansion-panels multiple accordion flat v-model="panels">
      <v-expansion-panel >
        <v-expansion-panel-header>
          scv-search-field
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <scv-search-field
              :lang="lang"
              :js="js"
              v-on:search-text="search"
            />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvSearchField is an auto-completion text field that accepts
            Suttacentral sutta references as well as arbitrary search strings.
            Search strings are automatically completed with 
            <a :href="githubUrl('src/examples.js')"
              target="_blank">
              examples.js
            </a>. 
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-results
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <scv-results :lang="lang" 
              :js="js"
            />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvResults displays multiple search results.
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-sutta
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card light class="mt-5">
            <scv-sutta :js="js" />
          </v-card>
          <details><summary class="ex-more">...</summary>
            ScvSutta displays a single sutta
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-tipitaka
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <scv-tipitaka :lang="lang" :js="js" />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvTipitaka displays Tipitaka structure
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          scv-cursor
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <scv-cursor :lang="lang" :js="js"/>
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvCursor displays sutta cursor 
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel >
        <v-expansion-panel-header>
          scv-settings
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <scv-settings :js="js" />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            ScvSettings is menu for Voice settings
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import Vue from 'vue';
import ScvSearchField from '~/components/scv-search-field.vue';
import ScvResults from '~/components/scv-results.vue';
import ScvSutta from '~/components/scv-sutta.vue';
import ScvSettings from '~/components/scv-settings.vue';
import ScvTipitaka from '~/components/scv-tipitaka.vue';
import ScvCursor from '~/components/scv-cursor.vue';

const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}

export default {
  components: {
    ScvSearchField,
    ScvResults,
    ScvSutta,
    ScvSettings,
    ScvTipitaka,
    ScvCursor,
  },
  data: function(){
    return {
      panels: [0,1],
      lang: 'de',
    };
  },
  mounted() {
  },
  methods:{
    search(value) {
      console.log(`search:`, value);
    },
    githubUrl(path) {
      return `https://github.com/ebt-site/ebt-vue/blob/main/${path}`;
    },
  },
  computed: {
    js() { 
      return JS;
    },
    langItems() {
      return [
        { text: 'English', value: 'en', },
        { text: 'Deutsch', value: 'de', },
      ];
    },
  },
}
</script>
<style>

.v-application code {
  background-color: #000;
}

button.v-expansion-panel-header,    
.v-expansion-panel-content > div { 
  padding-left: 0.2em;
  padding-right: 0.2em;
}
.v-expansion-panel > .v-expansion-panel-header {
  background: linear-gradient(to bottom, #555, rgb(30,30,30));
  min-height: 15px;
  padding-top: 8px;
  padding-bottom: 8px;
}
.ex-more {
  width: 2em;
  margin-left: auto;
  margin-right: auto;
}

</style>
