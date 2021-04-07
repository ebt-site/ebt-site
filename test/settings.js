(typeof describe === 'function') && describe("scv-settings", function() {
    const should = require("should");
    const {
        Settings,
    } = require("../src/index");

    it("TESTTESTdefault ctor", async()=>{
        var scv = new Settings();
        should(scv).properties({
            audio: Settings.AUDIO.OGG,
            fullLine: false,
            history: [],
            ips: 6,
            lang: 'en',
            maxResults: 5,
            maxHistory: 2000,  // half a cookie
            saveSettings: false,
            saveSettingsExamples: false,
            scid: null,
            search: null,
            showId: false,
            showPali: true,
            showTrans: true,
            vnameRoot: 'Aditi',
            vnameTrans: 'Amy',

        });
    });
    it("TESTTESTcustom ctor", async()=>{
        let maxHistory = 1000;
        let showId = true;
        let showPali = false;
        let history = [
            'one',
            'two',
            'three',
            'four',
        ];
        var scv = new Settings({
            history,
            maxHistory,
            showId,
            showPali,
        });

        should.deepEqual(scv.history, history);
        should(scv.history).not.equal(history);

        should(scv).properties({
            maxHistory,
            showId,
            showPali,
            history,
        });
    });
    it("TESTTESTstringify() fits a cookie", ()=>{
        let maxHistory = 24;
        let history = [
            'one',
            'two',
            'three',
            'four',
        ];
        var scv = new Settings({
            history,
            maxHistory,
        });

        // toJSON() truncates history as needed
        let cookie = JSON.stringify(scv);
        should(cookie.length).below(4000); 
        let json = JSON.parse(cookie);
        should.deepEqual(json.history, history.slice(0,3));
    });
    it("TRANS_LANGUAGES => translation languages", ()=>{
        should.deepEqual(Settings.TRANS_LANGUAGES.map(tl=>tl.code).sort(), [
            'cs',
            'de',
            'en',
            'ja',
            'pt',
        ]);
    });

});

