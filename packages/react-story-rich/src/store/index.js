import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import location from './location';
import history from './history';

const store = createStore(combineReducers({
  location,
  history,
}), compose(applyMiddleware(thunk)));

export default store;
