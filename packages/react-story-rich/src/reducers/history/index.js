import createReducer from '../createReducer';
import { GO_TO, REWIND_TO } from '../../classes/Navigation';

// ACTIONS
export const SET_HISTORY = '@react-story-rich.SET_HISTORY';
export const setHistory = (history) => ({ type: SET_HISTORY, history });

export const RESET_HISTORY = '@react-story-rich.RESET_HISTORY';
export const resetHistory = () => ({ type: RESET_HISTORY });

// REDUCER
export const initialHistoryState = [{ dataContext: {}, route: { from: null, to: 0 } }];

export default createReducer(initialHistoryState, {
  [GO_TO]: (state, action) => [...state, action],
  [REWIND_TO]: (state, { index }) => state.slice(0, index),
  [SET_HISTORY]: (state, { history }) => [...history],
  [RESET_HISTORY]: () => [...initialHistoryState],
});
