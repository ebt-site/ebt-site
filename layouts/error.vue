<template>
  <v-app dark>
    <h1>{{$t('applicationError')}}</h1>
    <details>
      <summary>
        {{$t('clickRefresh')}}
      </summary>
      <v-alert value="true" type="error" color="orange darken-4">
        <div v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </div>
        <div v-else >
          HTTP Error {{error.statusCode}}
        </div>
      </v-alert>
    </details>
    <div class="refresh">
      <v-btn class="ebt-text-btn"
        @click="clickRefresh"
        color="orange darken-4"
        dark
      >
        {{$t('refreshPage')}}
      </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'HTTP Error 404 (Not Found)',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    clickRefresh() {
      console.log('refreshing page', window.location);
      let { origin, pathname } = window.location;
      let pathParts = pathname.split('/').slice(0,2);
      let url = `${origin}${pathParts.join('/')}`;
      console.log('refreshing page', url);
      window.location.replace(url);
    },
  },
}
</script>

<style scoped>
.refresh {
  display: flex;
  justify-content: space-around;
  margin: 1em;
}
h1 {
  font-size: 20px;
}
</style>
