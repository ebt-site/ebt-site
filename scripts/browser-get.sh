#!/bin/bash

let URL=https://raw.githubusercontent.com/sc-voice/scv-static/main/src/examples.js

curl $URL \
  -H 'Connection: keep-alive' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'User-Agent: Mozilla/5.0 (X11; CrOS x86_64 13421.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.199 Safari/537.36' \
  -H 'Origin: https://sc-voice.github.io' \
  -H 'Sec-Fetch-Site: cross-site' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Referer: https://sc-voice.github.io/' \
  -H 'Accept-Language: en-US,en;q=0.9,de;q=0.8' \
  -H 'If-None-Match: W/"1446dfb33ffdf08c79c3d355ba74a1ff4d523efc6761ef323aafd27ceff2f31b"' \
  > /tmp/chrome-result.json 
diff /tmp/chrome-result.json src/examples.js
RC=$?; if [ "$RC" == "0" ]; then
  echo -e "TEST\t: Chrome browser GET (OK}"
else
  echo -e "TEST\t: Chrome browser GET (FAILED}"
fi

curl $URL \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0' \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Connection: keep-alive' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  > /tmp/firefox-result.json 
diff -b /tmp/firefox-result.json src/examples.js
RC=$?; if [ "$RC" == "0" ]; then
  echo -e "TEST\t: FireFox browser GET (OK}"
else
  echo -e "TEST\t: FireFox browser GET (FAILED}"
fi

curl -i -X OPTIONS $URL \
  -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Accept-Encoding: gzip, deflate, br' \
  -H 'Access-Control-Request-Method: GET' \
  -H 'Referer: https://sc-voice.github.io/' \
  -H 'Origin: https://sc-voice.github.io' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H 'Cache-Control: no-cache' \
  |& grep -E "<strong>"
RC=$?; if [ "$RC" == "0" ]; then
  echo -e "TEST\t: FireFox browser OPTIONS (FAILED)"
else 
  echo -e "TEST\t: FireFox browser OPTIONS (OK}"
fi

curl -i -X OPTIONS $URL \
  -H 'Access-Control-Request-Method: GET' \
  |& grep -E "<strong>"
RC=$?; if [ "$RC" == "0" ]; then
  echo -e "TEST\t: FireFox browser OPTIONS (FAILED)"
else 
  echo -e "TEST\t: FireFox browser OPTIONS (OK}"
fi
