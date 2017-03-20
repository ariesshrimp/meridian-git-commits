#!/usr/bin/env node
const path = require('path');
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;

bootstrap({
  cliPath: path.join(__dirname, 'node_modules/commitizen'),
  config: {
    path: './node_modules/cz-conventional-changelog-lint',
  },
});
