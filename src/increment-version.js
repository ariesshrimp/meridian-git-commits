import standardVersion from 'standard-version';
import {resolve} from 'path';
import {
  complement,
  compose,
  cond,
  contains,
  converge,
  drop,
  F,
  head,
  is,
  isNil,
  last,
  map,
  merge,
  nth,
  partition,
  pipe,
  replace,
  T,
  tap,
  zipObj,
  ifElse,
} from 'ramda';
import postVersion from './post-version';
const {error, log} = console;
import packageJson from '../package.json';

const stripDashes = map(replace('--', ''));
const zipFromPartition = converge(zipObj);
const defaults = {
  infile: resolve(__dirname, '../CHANGELOG.md'),
  message: 'chore(release): %s',
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: 'v',
};

const optionsFromArgs = pipe(
  drop(2),
  partition(contains('--')),
  zipFromPartition([compose(stripDashes, head), last]),
  merge(defaults)
);
const beforeVersion = packageJson.repository.url;

export default () =>
  standardVersion(optionsFromArgs(process.argv), err =>
    cond([[isNil, () => postVersion(beforeVersion)], [T, error]])(err));
