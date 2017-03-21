import standardVersion from 'standard-version';
import {resolve} from 'path';
import {
  compose,
  cond,
  contains,
  converge,
  drop,
  head,
  isNil,
  last,
  map,
  merge,
  partition,
  pipe,
  replace,
  T,
  zipObj,
} from 'ramda';
import postVersion from './post-version';
import packageJson from '../package.json';
const {error} = console;

const stripDashes = map(replace('--', ''));

const zipFromPartition = converge(zipObj);

const defaults = {
  infile: resolve(__dirname, '../CHANGELOG.md'),
  message: 'chore(release): [skip ci] %s',
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
