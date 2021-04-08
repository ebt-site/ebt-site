import Vue from "vue"
import VueCookie from "vue-cookie"
import { Settings } from '../src/index'

const COOKIE_NAME = 'ebt-settings';
const COOKIE_SETTINGS = {
    expires: "100Y",
    SameSite: "Strict",
}

export default (context, inject) => {
    let {
        $vuetify,
        store,
        app,
    } = context;

    let $t = function(key) {
        if (/\./.test(key)) {
            key = key.startsWith('$vuetify') ? key : `$vuetify.${key}`;
        } else {
            key = `$vuetify.ebt.${key}`;
        }
      return $vuetify && $vuetify.lang.t(key) || `$vuetify.lang.t(${key})`;
    }
    console.log(`ebt-client: injecting $t`);
    inject('t', $t);
    console.log(`ebt-client: injecting $cookie`);
    inject('cookie', VueCookie);

    let cookieJson = VueCookie.get(COOKIE_NAME);
    if (cookieJson) {
        let settings = JSON.parse(cookieJson);
        console.log(`ebt-client: loaded settings`, settings);
        setTimeout(()=>{
            store.commit('ebt/settings', settings);
            $vuetify.lang.current = settings.locale;
        },500);
    }

    store.subscribe((mutation,state) => {
        let { type } = mutation;
        if (type==='ebt/settings' || type==='ebt/suttaRef' || type==='ebt/cursorScid') {
            let settings = state.ebt.settings;
            $vuetify.lang.current = settings.locale;
            if (settings.saveSettingsExamples) {
                let ebtCookie = new Settings(settings); // may trim history
                console.log(`ebt-client: saving settings and examples`, ebtCookie);
                VueCookie.set(COOKIE_NAME, JSON.stringify(ebtCookie), COOKIE_SETTINGS);
            } else if (settings.saveSettings) {
                let ebtCookie = new Settings(settings); // clear history
                ebtCookie.history = [];
                console.log(`ebt-client: saving settings`, ebtCookie);
                VueCookie.set(COOKIE_NAME, JSON.stringify(ebtCookie), COOKIE_SETTINGS);
            } else {
                console.log(`ebt-client: clearing cookie`, settings);
                VueCookie.delete(COOKIE_NAME);
            }
        }
    });


}
