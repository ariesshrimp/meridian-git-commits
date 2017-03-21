import program from 'commander';
import R, {cond, isNil, merge, pipe, T} from 'ramda';
import {resolve} from 'path';
import standardVersion from 'standard-version';

import postVersion from './post-version';
import packageJson from '../package.json';
const {error} = console;

const handleError = cond([[isNil, postVersion], [T, error]]);

const options = program
  .option(
    '-i, --infile [infile]',
    'Where should the CHANGELOG.md file be written?',
    resolve(__dirname, '../CHANGELOG.md')
  )
  .option(
    '-m, --message [message]',
    'Desired commit messag format:',
    'chore(release): %s [skip ci]'
  )
  .option('-f, --first-release [firstRelease]', 'Dont adjust package version')
  .option(
    '-p, --tag-prefix [tagPrefix]',
    'How to prefix your version number (e.g. v0.0.0)',
    'v'
  )
  .parse(process.argv);

const defaults = R.merge(
  {
    infile: 'CHANGELOG.md',
    message: 'chore(release): %s',
    firstRelease: false,
    sign: false,
    noVerify: false,
    commitAll: false,
    silent: false,
    tagPrefix: 'v',
  },
  {
    infile: options.infile,
    tagPrefix: options.tagPrefix,
    firstRelease: options.firstRelease || false,
    message: options.message,
  }
);

export default () => standardVersion(defaults, handleError);
