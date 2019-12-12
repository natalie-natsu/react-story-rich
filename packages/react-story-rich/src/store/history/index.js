import createReducer from '../createReducer';
import { setData } from '../data';

// ACTIONS
export const SET_HISTORY = Symbol('SET_HISTORY');
export const setHistory = (history) => ({ type: SET_HISTORY, history });

export const SET_LOCATION = Symbol('SET_LOCATION');
export const setLocation = (location) => ({ type: SET_LOCATION, location });

export const RESET_STORY = Symbol('RESET_STORY');
export const resetStory = (storage, storageItem) => ({ type: RESET_STORY, storage, storageItem });

export const GO_TO = Symbol('GO_TO');
export const goTo = (from, to, data) => (dispatch, getState) => {
  dispatch({ type: GO_TO, from, to, data: data || getState().data });
};

export const GO_BACKWARD_TO = Symbol('GO_BACKWARD_TO');
export const goBackwardTo = (to, historyIndex, data) => (dispatch, getState) => {
  const { history } = getState();

  const index = historyIndex !== undefined
    ? historyIndex
    : history.find((action) => action.from === to);

  const actionToGo = history[index];

  if (actionToGo) {
    dispatch({ type: GO_BACKWARD_TO, index, location: actionToGo.from });
    // we can pass data here if we want to go backward but modify some data
    // like if in the future, we modified something from the past,
    // or if the user is aware of his future in the rewinded past.
    dispatch(setData(data || actionToGo.data));
  }
};

export const goForward = (skip = 0, data) => (dispatch, getState) => {
  const { data: stateData, location } = getState();
  dispatch(goTo(location, location + skip + 1, data || stateData));
};

export const goBackward = (skip = 0, data) => (dispatch, getState) => {
  const { data: stateData, history } = getState();
  dispatch(goBackwardTo(history.length - skip - 1, undefined, data || stateData));
};

// REDUCER
export default createReducer([], {
  [GO_TO]: (state, action) => [...state, action],
  [GO_BACKWARD_TO]: (state, { index }) => state.slice(0, index),
  [SET_HISTORY]: (state, { history }) => [...history],
});
