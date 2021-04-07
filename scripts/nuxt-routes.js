#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { logger } = require('log-instance');
const { Files } = require('memo-again');
const { APP_DIR } = Files;
const contentPath = path.join(APP_DIR, 'content');
const SCRIPT=path.basename(__filename);

logger.logLevel = 'info';

var files = [...Files.filesSync(contentPath)];
var routes = files.reduce((a,f)=> {
    if (/\.md/.test(f)) {
        let fparts = f.split('/');
        let fname = fparts.pop().replace('.md', '');
        a.push(`_content/${fname}`);
        if (fparts.length === 0) {
            a.push(`wiki/${fname}`);
        } else if (fparts.length === 1) {
            a.push(`${fparts[0]}/${fname}`);
        } else {
            logger.debug(`skipping ${f}`, fparts);
        }
    }
    return a;
}, []);

let routesPath = path.join(APP_DIR, 'nuxt-routes.json');
logger.log(`${SCRIPT}: writing ${routesPath}`);
fs.writeFileSync(routesPath, JSON.stringify(routes, null, '\t'));
