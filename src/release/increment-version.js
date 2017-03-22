import R, {cond, isNil, pipe, T, flip, curry} from 'ramda';
import standardVersion from 'standard-version';

import postVersion from './post-version';
const {error} = console;

export default options =>
  standardVersion(
    options,
    cond([[isNil, () => postVersion(options)], [T, error]])
  );
