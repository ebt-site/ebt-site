import Vue from "vue"
import VueCookie from "vue-cookie"
import { Settings } from '../src/index'

const COOKIE_NAME = 'scv-settings';
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
            key = `$vuetify.scv.${key}`;
        }
      return $vuetify && $vuetify.lang.t(key) || `$vuetify.lang.t(${key})`;
    }
    console.log(`scv-client: injecting $t`);
    inject('t', $t);
    console.log(`scv-client: injecting $cookie`);
    inject('cookie', VueCookie);

    let cookieJson = VueCookie.get(COOKIE_NAME);
    if (cookieJson) {
        let settings = JSON.parse(cookieJson);
        console.log(`scv-client: loaded settings`, settings);
        setTimeout(()=>{
            store.commit('scv/settings', settings);
            $vuetify.lang.current = settings.locale;
        },500);
    }

    store.subscribe((mutation,state) => {
        let { type } = mutation;
        if (type==='scv/settings' || type==='scv/suttaRef' || type==='scv/cursorScid') {
            let settings = state.scv.settings;
            $vuetify.lang.current = settings.locale;
            if (settings.saveSettingsExamples) {
                let scvCookie = new Settings(settings); // may trim history
                console.log(`scv-client: saving settings and examples`, scvCookie);
                VueCookie.set(COOKIE_NAME, JSON.stringify(scvCookie), COOKIE_SETTINGS);
            } else if (settings.saveSettings) {
                let scvCookie = new Settings(settings); // clear history
                scvCookie.history = [];
                console.log(`scv-client: saving settings`, scvCookie);
                VueCookie.set(COOKIE_NAME, JSON.stringify(scvCookie), COOKIE_SETTINGS);
            } else {
                console.log(`scv-client: clearing cookie`, settings);
                VueCookie.delete(COOKIE_NAME);
            }
        }
    });


}
