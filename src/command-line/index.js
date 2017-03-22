#!/usr/bin/env node

import program from 'commander';
import R from 'ramda';
import {resolve} from 'path';

import reset from './reset-releases';
import intialize from './intitialize-travis.js';

const {log, error, info} = console;

program
  .command('reset')
  .description('delete all local tags and then scrub them from github')
  .alias('rs')
  .option('-u, --git-user [user]', 'username', 'joefraley')
  .option('-t, --token [token]', 'github auth token', '')
  .option('-r, --git-repo [repo]', 'git repo name', 'meridian-git-commits')
  .action(options =>
    reset({
      token: options.token,
      user: options.gitUser,
      repo: options.gitRepo,
    }));

program
  .command('initialize')
  .alias('init')
  .description('generate a new .travis.yml file in a fresh repo')
  .option('-u, --git-user [user]', 'username', 'joefraley')
  .option('-t, --token [token]', 'github auth token', '')
  .option('-r, --git-repo [repo]', 'git repo name', 'meridian-git-commits')
  .action(options =>
    initialize({
      token: options.token,
      user: options.gitUser,
      repo: options.gitRepo,
    }));

program.parse(process.argv);
