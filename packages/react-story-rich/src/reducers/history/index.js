import createReducer from '../createReducer';
import { GO_TO, REWIND_TO } from '../../classes/Route';

// ACTIONS
export const SET_HISTORY = '@react-story-rich.SET_HISTORY';
export const setHistory = (history) => ({ type: SET_HISTORY, history });

export const RESET_HISTORY = '@react-story-rich.RESET_HISTORY';
export const resetHistory = () => ({ type: RESET_HISTORY });

export const SNAP_CURRENT_LOCATION = '@react-story-rich.SNAP_CURRENT_LOCATION';
export const snapCurrentLocation = (snapshot) => ({ type: SNAP_CURRENT_LOCATION, snapshot });

export const UPDATE_HISTORY_SNAPSHOT = '@react-story-rich.UPDATE_HISTORY_SNAPSHOT';
export const updateHistorySnapshot = (indexInHistory, snapshot) => ({
  type: UPDATE_HISTORY_SNAPSHOT,
  snapshot,
  indexInHistory,
});

// REDUCER
export const initialHistoryState = [{ from: null, to: 0 }];

const setSnapshot = (state, { snapshot, indexInHistory }) => {
  const newHistory = [...state];
  const index = indexInHistory || newHistory.length - 1;

  newHistory[index] = { ...state[index], snapshot };

  return newHistory;
};

export default createReducer(initialHistoryState, {
  [GO_TO]: (state, action) => [...state, action],
  [REWIND_TO]: (state, { index }) => state.slice(0, index),
  [SET_HISTORY]: (state, { history }) => [...history],
  [SNAP_CURRENT_LOCATION]: setSnapshot,
  [UPDATE_HISTORY_SNAPSHOT]: setSnapshot,
  [RESET_HISTORY]: () => [...initialHistoryState],
});
