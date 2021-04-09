<template>
  <div>
    <div class="text-h5"> Vue Components </div>
    <v-expansion-panels multiple accordion flat v-model="panels">
      <v-expansion-panel >
        <v-expansion-panel-header>
          ebt-search-field
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <ebt-search-field
              :lang="lang"
              :js="js"
              v-on:search-text="search"
            />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            EbtSearchField is an auto-completion text field that accepts
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
          ebt-results
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <ebt-results :lang="lang" 
              :js="js"
            />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            EbtResults displays multiple search results.
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          ebt-sutta
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card light class="mt-5">
            <ebt-sutta :js="js" />
          </v-card>
          <details><summary class="ex-more">...</summary>
            EbtSutta displays a single sutta
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          ebt-tipitaka
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <ebt-tipitaka :lang="lang" :js="js" />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            EbtTipitaka displays Tipitaka structure
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          ebt-cursor
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5" style="min-width:22em; ">
            <ebt-cursor :lang="lang" :js="js"/>
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            EbtCursor displays sutta cursor 
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel >
        <v-expansion-panel-header>
          ebt-settings
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet light class="mt-5">
            <ebt-settings :js="js" />
          </v-sheet>
          <details><summary class="ex-more">...</summary>
            EbtSettings is menu for Voice settings
          </details>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-expansion-panels>
  </div>
</template>

<script>
import Vue from 'vue';
import EbtSearchField from '~/components/ebt-search-field.vue';
import EbtResults from '~/components/ebt-results.vue';
import EbtSutta from '~/components/ebt-sutta.vue';
import EbtSettings from '~/components/ebt-settings.vue';
import EbtTipitaka from '~/components/ebt-tipitaka.vue';
import EbtCursor from '~/components/ebt-cursor.vue';

const JS = {
  BilaraWeb: require('../src/bilara-web'),
  Tipitaka: require('scv-bilara/src/tipitaka'),
}

export default {
  components: {
    EbtSearchField,
    EbtResults,
    EbtSutta,
    EbtSettings,
    EbtTipitaka,
    EbtCursor,
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
