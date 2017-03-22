#!/usr/bin/env node

import {resolve} from 'path';
import {bootstrap} from 'commitizen/dist/cli/git-cz';

/**
 * @see https://github.com/commitizen/cz-cli#1-create-your-own-entry-point-script
 */
export default bootstrap({
  cliPath: resolve(__dirname, '../../node_modules/commitizen'),
  config: {path: 'cz-conventional-changelog'},
});
