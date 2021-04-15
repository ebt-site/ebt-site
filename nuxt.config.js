import yaml from 'js-yaml';
import fs from 'fs';
const EBT_SITE_YAML = yaml.safeLoadAll(fs.readFileSync('./ebt-site.yaml'))[0] || {};
const { logger } = require('log-instance');

import NuxtConfig from 'ebt-vue/nuxt.config';
let CONFIG = JSON.parse(JSON.stringify(NuxtConfig));
let {
    account: ebt_account,
    repository: ebt_repository,
} = require('./ebt-repo.json');

let {
    ebt_lang=null,
    ebt_site_image='amanda-flavell-9XSLoMlVhYU-unsplash.png',
    ebt_site_title='EBT-Site',
} = EBT_SITE_YAML;

let routerBase = CONFIG.router.base = `/${ebt_repository}`;
let htmlAttrs = {
  lang: ebt_lang === "all" ? null : ebt_lang,
};
let head = Object.assign(CONFIG.head, {
    titleTemplate: ebt_repository,
    title: ebt_repository,
    htmlAttrs,
});
let env = CONFIG.env = Object.assign({}, CONFIG.env, {
    ebt_lang,
    ebt_account,
    ebt_repository,
    ebt_site_image,
    ebt_site_title,
});
CONFIG.watch = Object.assign([], CONFIG.watch, [
    './ebt-site.yaml',
]);

logger.info(`nuxt.config.js env`, env);

export default CONFIG;
