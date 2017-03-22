#!/usr/bin/env node

import program from 'commander';
import R from 'ramda';
import {resolve} from 'path';

import postVersion from './post-version';
import incrementVersion from './increment-version';

const {log, error, info} = console;

program
  .command('release')
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
  .action(options => {
    incrementVersion(options);
  });

program.parse(process.argv);
