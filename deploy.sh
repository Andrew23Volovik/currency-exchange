#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'Deploy-currency-project'
git push -f git@github.com:Andrew23Volovik/currency-exchange.git main:gh-pages

cd -