import { combineReducers } from 'redux';

import location from './location';
import history from './history';

const reducers = combineReducers({
  location,
  history,
});

export default reducers;
