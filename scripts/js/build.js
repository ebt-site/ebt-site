#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Axios = require('axios');
const { logger } = require('log-instance');
const { Memoizer } = require('memo-again');
const {
    BilaraData,
    Seeker,
    ExecGit,
} = require('scv-bilara');
const APP_DIR = path.join(__dirname, '..', '..');
const API_DIR = path.join(APP_DIR, 'api');
const SRC_DIR = path.join(APP_DIR, 'src');
const SRC_EXAMPLES = path.join(SRC_DIR, 'examples.js');
const API_EXAMPLES = path.join(API_DIR, 'examples.json');
const EBT_DATA_DIR = path.join(APP_DIR, 'local', 'ebt-data');
const EXAMPLES_DIR = path.join(EBT_DATA_DIR, 'examples');

logger.logLevel = 'info';

async function writeJsonModule(name, filePath, json) {
    await fs.promises.writeFile(filePath, 
` 
// DO NOT EDIT THIS GENERATED FILE
(function(exports) { class ${name} { static get ${name.toLowerCase()}() { return (
//JSONSTART
${json} 
//JSONEND
)}} module.exports = exports.${name} = ${name};
})(typeof exports === "object" ? exports : (exports={}));
// DO NOT EDIT THIS GENERATED FILE
`
    );
}

(async function(){ try {
    let execGit = new ExecGit({
        repo: 'https://github.com/ebt-site/ebt-data.git',
        logger,
    });
    let bilaraData = new BilaraData({
        name: 'ebt-data',
        branch: 'published',
        execGit,
    });
    await bilaraData.initialize();

    let exampleFiles = (await fs.promises.readdir(EXAMPLES_DIR))
        .filter(f=>/examples-/.test(f));
    logger.info(`exampleFiles`, exampleFiles);

    let examples = {};
    let languages = [];
    for (exampleFile of exampleFiles) {
        let examplePath = path.join(EXAMPLES_DIR, exampleFile);
        let langExamples = (await fs.promises.readFile(examplePath))
            .toString()
            .split('\n')
            .filter(ex=>!!ex);
        if (langExamples.length) {
            let lang = exampleFile.split('-')[1].split('.')[0];
            languages.push(lang);
            examples[lang] = langExamples;
            logger.log(`${exampleFile}: ${langExamples.length}`);
        }
    }
    let examplesJson = JSON.stringify(examples,null,2);
    await fs.promises.writeFile(API_EXAMPLES, examplesJson);
    await writeJsonModule('Examples', SRC_EXAMPLES, examplesJson);

    let storeName = 'api';
    let storePath = path.join(APP_DIR, storeName);
    let writeFile = true;
    let readFile = false; // force re-write
    let memoizer = new Memoizer({
        writeMem: false, // avoid monotonic increasing memory usage
        writeFile,
        readFile,
        serialize: Seeker.serialize,
        deserialize: Seeker.deserialize,
        storeName,
        storePath,
    });
    let matchHighlight = '<span class="scv-matched">$&</span>';
    let skr = await new Seeker({
        bilaraData,
        root: EBT_DATA_DIR,
        memoizer,
    }).initialize();
    logger.logLevel = 'warn';
    skr.logLevel = 'info';
    for (let lang in examples) {
        for (let eg of examples[lang]) {
            try {
                var res = eg && await skr.find({
                    pattern: eg,
                    lang,
                    matchHighlight,
                });
            } catch(e){
                logger.warn(e.message);
            }
        }
    }
} catch(e) {
    logger.warn(e);
}})();
