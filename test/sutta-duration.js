(typeof describe === 'function') && describe("sutta-duration", function() {
    const should = require("should");
    const axios = require("axios");
    const {
        SuttaDuration,
    } = require('../src/index');
    const fetch = async function(url,opts){ 
        return {
            async json() {
                let res = await axios.get(url, opts);
                return res.data;
            }
        }
    }

    const suttaDuration = new SuttaDuration({fetch});
    const TOLERANCE = 33;

    function testTolerance(actual, expected, e = TOLERANCE) {
        should(actual).above(expected-e);
        should(actual).below(expected+e);
    }

    it("TESTTESTduration(...) measures seconds", async()=>{
        let sd = await suttaDuration.initialize();

        // verify with actual durations
        testTolerance(sd.duration('iti9'), 60);
        testTolerance(sd.duration('thag1.2'), 24);
        testTolerance(sd.duration('thig1.1'), 31);
        testTolerance(sd.duration('sn2.2'), 32);
        testTolerance(sd.duration('thig5.1'), 69);
        testTolerance(sd.duration('sn1.1'), 85);
        testTolerance(sd.duration('sn56.21'), 111);
        testTolerance(sd.duration('thag9.1'), 168);
        testTolerance(sd.duration('sn36.11'), 270);
        testTolerance(sd.duration('sn42.11'), 292);
        testTolerance(sd.duration('an2.1-10'), 596);
        testTolerance(sd.duration('sn12.51'), 719);
        testTolerance(sd.duration('dn33'), 7500);
        testTolerance(sd.duration('mn1'), 1250);

        // not found
        should(sd.duration('asdf')).equal(undefined);
    });
});

