#!/bin/bash

cd build

echo '[1/2] Move sw.js & workbox-sw.js to /dash/';

mv sw.js* ./dash/
mv workbox-sw.js* ./dash/

echo '[2/2] Change path /static/ to /dash/static/';

find . -type f -maxdepth 1 | LC_ALL=C xargs -I{} sed -i.backup -e 's,static/,dash/static/,g' {}

