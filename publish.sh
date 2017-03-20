# npm publish with goodies
# prerequisites:
# `npm install -g trash conventional-recommended-bump conventional-changelog conventional-github-releaser conventional-commits-detector json`
# `np` with optional argument `patch`/`minor`/`major`/`<version>`
# defaults to conventional-recommended-bump
# and optional argument preset `angular`/ `jquery` ...
# defaults to conventional-commits-detector
np() {
    travis status --no-interactive &&
    trash node_modules &>/dev/null;
    git pull --rebase &&
    npm install &&
    npm test &&
    cp package.json _package.json &&
    preset=`conventional-commits-detector` &&
    echo $preset &&
    bump=`conventional-recommended-bump -p angular` &&
    echo ${1:-$bump} &&
    npm --no-git-tag-version version ${1:-$bump} &>/dev/null &&
    conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset} &&
    git add CHANGELOG.md &&
    version=`cat package.json | json version` &&
    git commit -m"docs(CHANGELOG): $version" &&
    mv -f _package.json package.json &&
    npm version ${1:-$bump} -m "chore(release): %s" &&
    git push --follow-tags &&
    conventional-github-releaser -p ${2:-$preset} &&
    npm publish
}