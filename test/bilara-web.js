(typeof describe === 'function') && describe("bilara-web", function() {
    const should = require("should");
    const fs = require('fs');
    const path = require('path');
    const { MerkleJson } = require('merkle-json');
    const {
        BilaraWeb,
    } = require("../src/index");
    const { logger, LogInstance } = require('log-instance');
    const axios = require('axios');
    logger.logLevel = 'warn';
    const fetch = async function(url,opts){ 
        return {
            async json() {
                let res = await axios.get(url, opts);
                return res.data;
            }
        }
    }
    this.timeout(5*1000);

    it("default ctor", ()=>{
        should.throws(()=>new BilaraWeb());
    });
    it("custom ctor", ()=>{
        let examples = {
            de:[],
            en:[],
        };
        let bw = new BilaraWeb({examples, fetch});
        should(bw.examples).equal(examples);
        should(bw.fetch).equal(fetch);
    });
    it("isExample", async()=>{
        var bw = new BilaraWeb({
            fetch,
            lang: 'en', // English default
        });
        should(bw.isExample('root of suffering')).equal(true);
        should(bw.isExample('ROOT OF SUFFERING')).equal(true);
        should(bw.isExample('\\bROOT OF SUFFERING')).equal(true);
        should(bw.isExample('\\bROOT OF SUFFERING\\b')).equal(true);
        should(bw.isExample('root suffering')).equal(false);
        should(bw.isExample('Wurzel des Leidens')).equal(false);
        should(bw.isExample('Wurzel des Leidens', 'de')).equal(true);
        should(bw.isExample('wurzel des leidens', 'de')).equal(true);
    });
    it("TESTTESTexampleGuid(...) => en guid", async()=>{
        let bw = new BilaraWeb({fetch});
        let example = 'root of suffering';
        let lang = 'en';
        let guid = 'f0453d300d1391f5bded7acb6b3ae5c0';
        should(bw.exampleGuid(example, lang)).equal(guid);
    });
    it("TESTTESTexampleGuid(...) => de guid", async()=>{
        let bw = new BilaraWeb({fetch});
        let example = 'sei.* abhängig entstanden';
        let lang = 'de';
        let guid = '6887db39e3f45d06e4e87ebf004a0334';
        should(bw.exampleGuid(example, lang)).equal(guid);
    });
    it("find(...) finds example", async()=>{
        var bw = new BilaraWeb({fetch});

        var pattern = "root of suffering"; 
        var res = await bw.find({
            pattern,
        });
        should.deepEqual(res.suttaRefs, [
            'sn42.11/en/sujato',
            'mn105/en/sujato',
            'mn1/en/sujato',
            'sn56.21/en/sujato',
            'mn66/en/sujato',
            'mn116/en/sujato',
            'dn16/en/sujato',
            //'pli-tv-kd6/en/brahmali',
        ]);
        should(res.bilaraPaths.length).equal(14);
    });
    it("highlightExamples(...) adds HTML links for examples", ()=>{
        let examples = {
            en: [
                'is.*\\bfeeling',
                'perception',
            ],
        };
        var bw = new BilaraWeb({fetch, examples});
        should(bw.isExample('perception')).equal(true);
        let segments = [
            {scid: 'sn12.23:1.5', pli: 'iti vedanā …pe…', en: 'Such is feeling …',},
            {scid: 'sn12.23:1.6', pli: 'iti saññā …', en: 'Such is perception …',},
            {scid: 'sn12.23:1.7', pli: 'iti saṅkhārā …', en: 'Such are choices …',},
        ];
        let lang = 'en';
        let text = "This is feeling, not unfeeling";
        let re = bw.reExample[lang];
        should(text.replace(re,'ASDF')).equal('This ASDF, not unfeeling');

        let segments2 = bw.highlightExamples({segments,lang});
        should.deepEqual(segments2[0], {
            scid: 'sn12.23:1.5', 
            pli: 'iti vedanā …pe…', 
            en: 'Such <span class="ebt-matched">is feeling</span> …',
        });
        
    });
    it("exampleOfMatch(...) returns en example", ()=>{
        let examples = {
            en: [
                'is.*\\bfeeling',
                'perception',
            ],
            de: [
                'königliches Gut',
            ],
        };
        var bw = new BilaraWeb({fetch, examples});
        should(bw.exampleOfMatch("Is a good Feeling")).equal(examples.en[0]);
    });
    it("exampleOfMatch(...) returns de example", ()=>{
        let examples = {
            en: [
                'is.*\\bfeeling',
                'perception',
            ],
            de: [
                'königliches Gut',
            ],
        };
        var bw = new BilaraWeb({fetch, examples});
        should(bw.exampleOfMatch('königliches Gut', 'de')).equal(examples.de[0]);
    });
    it("loadSuttaSegments(...) returns sutta", async ()=>{
        var bw = new BilaraWeb({fetch});
        //bw.logLevel = 'info';
        let pli = await bw.loadSuttaSegments({sutta_uid:'an9.2'});
        should(pli['an9.2:0.1']).match(/Aṅguttara Nikāya 9/);
        let en = await bw.loadSuttaSegments({sutta_uid:'an9.2', lang:'en'});
        should(en['an9.2:0.1']).match(/Numbered Discourses 9/);
        let nolang = await bw.loadSuttaSegments({sutta_uid:'an9.2', lang:'nolang'});
        should(nolang).equal(undefined);
        let nosuid = await bw.loadSuttaSegments({lang:'nosuid'});
        should(nosuid).equal(undefined);
    });
    it("loadSutta(...) returns sutta", async ()=>{
        let bw = new BilaraWeb({fetch});
        let sutta_uid = 'an3.128';
        let lang = 'de';
        let sutta = await bw.loadSutta({sutta_uid, lang});
        should(sutta.sutta_uid).equal(sutta_uid);
        let segments = sutta.segments;
        should.deepEqual(segments[3],{
            scid: 'an3.128:1.1',
            pli: 'Ekaṁ samayaṁ bhagavā bārāṇasiyaṁ viharati isipatane migadāye. ',
            de: 'Einmal hielt sich der Buddha bei Benares auf, im Wildpark bei Isipatana. ',
        });
        should.deepEqual(segments[segments.length-1], { 
            scid: 'an3.128:9.5', 
            pli: 'Chaṭṭhaṁ. ',
        });
        should.deepEqual(sutta.titles, [ 
            'Nummerierte Lehrreden 3 ',
            '13. Kusināra ',
            '128. Verdrießlich '
        ]);
    });
    it("loadSutta(...) returns sutta fallback", async ()=>{
        let bw = new BilaraWeb({fetch});
        //bw.logLevel = 'info';

        // Empty sutta fallback
        let sutta_uid = 'nosutta';
        let lang = 'en';
        let sutta = await bw.loadSutta({sutta_uid, lang});
        should.deepEqual(sutta, {
            sutta_uid,
            lang,
            titles:[],
            segments:[],
        });

        // Pali sutta fallback
        sutta_uid = 'an9.2';
        lang = 'nolang';
        sutta = await bw.loadSutta({sutta_uid, lang});
        should(sutta).properties({
            sutta_uid,
            lang,
        });
        should.deepEqual(sutta.titles, [
            "Aṅguttara Nikāya 9 ",
            "1. Sambodhivagga ",
            "2. Nissayasutta ",
        ]);
        should.deepEqual(sutta.segments[4],{
            scid: 'an9.2:1.2',
            pli: '“‘nissayasampanno nissayasampanno’ti, bhante, vuccati. ',
        });
    });
    it("voices() returns voices", async()=>{
        let bw = new BilaraWeb({fetch});
        let voices = await bw.voices();
        let enNames = voices.filter(v=>v.langTrans === 'en').map(v=>v.name);
        should.deepEqual(enNames, [
            'Amy', 'Raveena', 'Matthew', 'Brian', 'sujato_en']);
    });
    it("loadSutta(...) returns MN10", async ()=>{
        let bw = new BilaraWeb({fetch});
        let sutta_uid = 'mn10';
        let sutta = await bw.loadSutta({sutta_uid});
        should(sutta.sutta_uid).equal(sutta_uid);

        // segments should be sequential
        let i34_2 = sutta.segments.findIndex(seg=>seg.scid==='mn10:34.2');
        let i34_3 = sutta.segments.findIndex(seg=>seg.scid==='mn10:34.3');
        should(i34_3).equal(i34_2+1); //
    });
    it("TESTTESTloadSutta(...) returns an2.32-41", async ()=>{
        let bw = new BilaraWeb({fetch});
        let { sutta_uid, lang } = bw.parseSuttaRef('an2.41/de');
        let sutta = await bw.loadSutta({sutta_uid, lang});
        should(sutta.sutta_uid).equal(sutta_uid);
        should(sutta).properties({
            sutta_uid: 'an2.32-41',
            lang: 'de',
        });
        should.deepEqual(sutta.titles, [
            'Nummerierte Lehrreden 2',
            '4. Friedvoller Geist',
            '32–41',
        ]);
        should(sutta.segments.length).equal(169);
    });
    it("TESTTESTparseSuttaRef() returns an2.32-41", ()=>{
        let bw = new BilaraWeb({fetch});
        let pattern = 'an 2.41/de';
        let lang = 'de';
        should.deepEqual(bw.parseSuttaRef(pattern), {
            sutta_uid: 'an2.32-41',
            lang,
            author: undefined,
        });
    });
    it("TESTTESTsuidPaths(suid) => path map", ()=>{
        let bw = new BilaraWeb({fetch});

        should.deepEqual(bw.suidPaths('dn33'), {
            'root/pli/ms': 
                'root/pli/ms/sutta/dn/dn33_root-pli-ms.json',
            'translation/de/sabbamitta': 
                'translation/de/sabbamitta/sutta/dn/dn33_translation-de-sabbamitta.json',
            'translation/en/sujato': 
                'translation/en/sujato/sutta/dn/dn33_translation-en-sujato.json',
            //'translation/my/my-team': 
                //'translation/my/my-team/sutta/dn/dn33_translation-my-my-team.json',
        });
    });
})
