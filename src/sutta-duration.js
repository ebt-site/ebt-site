(function(exports) {
    const { logger } = require('log-instance');
    const { MerkleJson } = require('merkle-json');
    const { examples } = require('./examples.js');
    const SUID_DURATION_URL = [
        `https://raw.githubusercontent.com/sc-voice/sc-voice`,
        `master/src/assets/suid-duration.json`,
    ].join('/');

    class SuttaDuration {
        constructor(opts={}) {
            (opts.logger || logger).logInstance(this, opts);
            this.language = opts.language || 'en';
            this.voice = opts.voice || 'amy';
            if (typeof opts.fetch !== 'function') {
                throw new Error('SuttaDuration() fetch callback is required');
            }
            this.fetch = opts.fetch;
        }

        async initialize() { try {
            if (this.initialized) { return this; }

            let url = SUID_DURATION_URL;
            let fetch = this.fetch;
            let res = await fetch(url, {headers:{Accept:'text/plain'}});
            this.suidDuration = await res.json();
            this.initialized = true;
            return this;
        } catch(e) {
            this.warn(`initialize()`, e.message);
            throw e;
        }}

        duration(suid) {
            let {
                language,
                suidDuration,
                voice,
            } = this;
            let langMap = suidDuration[language] || {};
            let voiceMap = langMap[voice] || {};
            return voiceMap[suid]; // duration or undefined
        }

    }

    module.exports = exports.SuttaDuration = SuttaDuration;

})(typeof exports === "object" ? exports : (exports = {}));
