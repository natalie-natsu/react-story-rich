import createReducer from '../createReducer';
import { SET_LOCATION } from '../history';
import { GO_TO, REWIND_TO } from '../../components/Navigation';

const set = (state, { location, to }) => (location !== undefined ? location : to);

export default createReducer(0, {
  [REWIND_TO]: set,
  [GO_TO]: set,
  [SET_LOCATION]: set,
});
