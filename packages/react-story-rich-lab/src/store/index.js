import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import data from '@react-story-rich/core/store/data';
import location from '@react-story-rich/core/store/location';
import history from '@react-story-rich/core/store/history';

import character from './character';
import inventory from './inventory';
import skills from './skills';

const middleWares = [thunk];
if (process.env.NODE_ENV === 'development') { middleWares.push(logger); }

const store = createStore(combineReducers({
  character,
  data,
  history,
  inventory,
  location,
  skills,
}), compose(applyMiddleware(...middleWares)));

export default store;
