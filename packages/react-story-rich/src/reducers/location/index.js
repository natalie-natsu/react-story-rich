import createReducer from '../createReducer';
import { GO_TO, REWIND_TO } from '../../classes/Navigation';

export const SET_LOCATION = '@react-story-rich.SET_LOCATION';
export const setLocation = (location) => ({ type: SET_LOCATION, location });

const set = (state, { location }) => location;
const navigate = (state, { from, to }) => {
  if (from !== state) {
    throw Error(`
      You try to navigate from a different point than the current location.
      Got from:${from} instead of ${state}.
    `);
  }

  return to;
};

export default createReducer(0, {
  [GO_TO]: navigate,
  [REWIND_TO]: navigate,
  [SET_LOCATION]: set,
});
