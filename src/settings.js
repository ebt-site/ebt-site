(function(exports) {
    const { logger } = require('log-instance');
    class ScvSettings { 
        constructor(opts={}) {
            let {
                audio = ScvSettings.AUDIO.OGG,
                cursor = null,
                fullLine = false,
                history = [],
                ips = 6,
                lang = 'en',
                locale = 'en',
                maxHistory = 2000,
                maxResults = 5,
                saveSettingsExamples = false,
                saveSettings = false,
                scid = null,
                search = null,
                showId = false,
                showPali = true,
                showTrans = true,
                vnameRoot = 'Aditi',
                vnameTrans = 'Amy',

            } = opts;
            (opts.logger || logger).logInstance(this, opts);

            this.audio = audio;
            this.cursor = cursor;
            this.fullLine = fullLine;
            this.history = history.slice();
            this.ips = 6;
            this.lang = ScvSettings.TRANS_LANGUAGES.reduce((a,l)=>{
                return l.code===lang ? lang : a;
            }, 'en');
            this.locale = ScvSettings.WEB_LANGUAGES.reduce((a,l)=>{
                return l.code===locale ? locale : a;
            }, 'en');
            this.maxResults = maxResults;
            this.maxHistory = maxHistory,
            this.saveSettingsExamples = saveSettingsExamples;
            this.saveSettings = saveSettings;
            this.scid = scid;
            this.search = search;
            this.showId = showId;
            this.showPali = showPali;
            this.showTrans = showTrans;
            this.vnameRoot = vnameRoot;
            this.vnameTrans = vnameTrans;

        }

        toJSON() {
            let { maxHistory, history } = this;
            let json = Object.assign({}, this);
            let trimHistory = history.slice();
            while (JSON.stringify(trimHistory).length > maxHistory) {
                trimHistory.pop();
            }
            json.history = trimHistory;
            return json;
        }
        
        static get TRANS_LANGUAGES() { 
            return [{
                code: 'cs',
                label: 'Čeština / CS',
            //}, {
                //code: 'da',
                //label: 'Dansk / DA',
            }, {
                code: 'de',
                label: 'Deutsch / DE',
            }, {
                code: 'en',
                label: 'English / EN',
            //}, {
                //code: 'fr',
                //label: 'Français / FR',
            //}, {
                //code: 'hi',
                //label: 'हिंदी / HI',
            //}, {
                //code: 'is',
                //label: 'Íslenska / IS',
            }, {
                code: 'ja',
                label: '日本語 / JA',
            //}, {
                //code: 'nb',
                //label: 'Norsk / NB',
            //}, {
                //code: 'nl',
                //label: 'Nederlands / NL',
            //}, {
                //code: 'pl',
                //label: 'Polski / PL',
            }, {
                code: 'pt',
                label: 'Português / PT',
            //}, {
                //code: 'ro',
                //label: 'Română / RO',
            //}, {
                //code: 'si',
                //label: 'සිංහල / SI',
            //}, {
                //code: 'vi',
                //label: 'Tiếng Việt / VI',
            }];
        }

        static get WEB_LANGUAGES() { 
            return [{
                code: 'cs',
                label: 'Čeština / CS',
            }, {
                code: 'da',
                label: 'Dansk / DA',
            }, {
                code: 'de',
                label: 'Deutsch / DE',
            }, {
                code: 'en',
                label: 'English / EN',
            }, {
                code: 'fr',
                label: 'Français / FR',
            }, {
                code: 'hi',
                label: 'हिंदी / HI',
            }, {
                code: 'is',
                label: 'Íslenska / IS',
            }, {
                code: 'ja',
                label: '日本語 / JA',
            }, {
                code: 'nb',
                label: 'Norsk / NB',
            }, {
                code: 'nl',
                label: 'Nederlands / NL',
            }, {
                code: 'pl',
                label: 'Polski / PL',
            }, {
                code: 'pt',
                label: 'Português / PT',
            }, {
                code: 'ro',
                label: 'Română / RO',
            }, {
                code: 'si',
                label: 'සිංහල / SI',
            }, {
                code: 'vi',
                label: 'Tiếng Việt / VI',
            }];
        }
    
        static get IPS_CHOICES() { 
            return [{
                url: '',
                i18n: 'bellNone',
                value: 0,
            },{
                url: '/audio/rainforest-ambience-glory-sunz-public-domain.ogg',
                i18n: 'bellRainforest',
                volume: 0.1,
                value: 1,
                hide: true,
            },{
                url: '/audio/indian-bell-flemur-sampling-plus-1.0.ogg',
                i18n: 'bellIndian',
                volume: 0.1,
                value: 2,
            },{
                url: '/audio/tibetan-singing-bowl-horst-cc0.ogg',
                i18n: "bellTibetan",
                volume: 0.3,
                value: 3,
            },{
                url: '/audio/jetrye-bell-meditation-cleaned-CC0.ogg',
                i18n: "bellMeditation",
                volume: 0.1,
                value: 4,
                hide: true,
            },{
                url: '/audio/STE-004-Coemgenu.ogg',
                i18n: "bellMidrange",
                volume: 0.5,
                value: 5,
            },{
                url: '/audio/simple-bell.ogg',
                i18n: "bellSimple",
                volume: 0.5,
                value: 6,
            }];
        }


        static langLabel(lang) {
            let info = ScvSettings.WEB_LANGUAGES.find(l=>l.code === lang) || {
                label:`unknown language:${lang}` };
            return info.label;
        }

        static get AUDIO() { 
            return { MP3: 'mp3', OGG: 'ogg', OPUS: 'opus', };
        }

    }

    module.exports = exports.ScvSettings = ScvSettings;
})(typeof exports === "object" ? exports : (exports = {}));

