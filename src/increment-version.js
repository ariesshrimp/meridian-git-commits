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
import packageJson from '../package.json';
const {error, log} = console;

const stripDashes = map(replace('--', ''));

const zipFromPartition = converge(zipObj);

const defaults = {
  infile: resolve(__dirname, '../CHANGELOG.md'),
  message: 'chore(release): %s [skip ci]',
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

const increment = () =>
  standardVersion(optionsFromArgs(process.argv), err =>
    cond([[isNil, postVersion], [T, error]])(err));

export default increment;
