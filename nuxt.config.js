import colors from 'vuetify/es5/util/colors'
import cs from './src/i18n/cs.ts'
import da from './src/i18n/da.ts'
import de from './src/i18n/de.ts'
import en from './src/i18n/en.ts'
import fr from './src/i18n/fr.ts'
import hi from './src/i18n/hi.ts'
import is from './src/i18n/is.ts'
import ja from './src/i18n/ja.ts'
import nb from './src/i18n/nb.ts'
import nl from './src/i18n/nl.ts'
import pl from './src/i18n/pl.ts'
import pt from './src/i18n/pt.ts'
import ro from './src/i18n/ro.ts'
import si from './src/i18n/si.ts'
import vi from './src/i18n/vi.ts'
import routes from './nuxt-routes.json'

const path = require('path');
const { logger } = require('log-instance');
let ebtRepo = require('./ebt-repo.json');
let env = {
    ebt_account: ebtRepo.account,
    ebt_repository: ebtRepo.repository,
}
var { name } = require('./package.json');
var appName = ebtRepo.repository || name.split('/').filter(n=>n.length).pop();
var routerBase;
var babelCompact;
if (!routerBase) {
    let BABEL_ENV = process.env.BABEL_ENV;
    routerBase = `/${appName}/`;
    babelCompact = BABEL_ENV === 'deploy' ? true : false;
}
logger.info(`nuxt.config.js`, {env, routerBase, babelCompact});

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  telemetry: true,

  env,

  render: {
    dist: {
        cacheControl: true,
        maxAge: 86400001,
    },
    static: {
        cacheControl: true,
        maxAge: 86400000,
    }
  },

  router: {
    base: routerBase,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: appName,
    title: appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/variables.scss',
    '@/assets/ebt.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/ebt-client.js', mode:'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    defaultAssets: {
        font: false,
        icons: 'mdiSvg',
    },
    customVariables: [
        '~/assets/ebt.css',
    ],
    //treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: 0xcc6600,
          accent: 0xffff44,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: 0xcc6600,
          accent: 0x882200,
          //secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    lang: {  // IMPORTANT: set up i18n "ebt" labels
        locales: {
            cs,
            da,
            de,
            en,
            fr,
            hi,
            is,
            ja,
            nb,
            nl,
            pl,
            pt,
            ro,
            si,
            vi,
        },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    ignoreOrder: false,
    babel: {
      generatorOpts: {
        compact: babelCompact,
      }
    },
  },

  generate: {
    routes,
    cache: false,
    crawler: true,
    dir: 'dist',
    devtools: false,
    exclude: [],
    fallback: '404.html',
    subFolders: true,
  },

}
