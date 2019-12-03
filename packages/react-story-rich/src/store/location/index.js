import createReducer from '../createReducer';
import { GO_BACKWARD_TO, GO_TO, SET_LOCATION } from '../history';

const set = (state, { location, to }) => (location !== undefined ? location : to);

export default createReducer(0, {
  [GO_BACKWARD_TO]: set,
  [GO_TO]: set,
  [SET_LOCATION]: set,
});
