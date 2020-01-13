import createReducer from '../createReducer';
import { GO_TO, REWIND_TO } from '../../components/Navigation';

// ACTIONS
export const SET_HISTORY = '@react-story-rich.SET_HISTORY';
export const setHistory = (history) => ({ type: SET_HISTORY, history });

export const SET_LOCATION = '@react-story-rich.SET_LOCATION';
export const setLocation = (location) => ({ type: SET_LOCATION, location });

export const RESET_STORY = '@react-story-rich.RESET_STORY';
export const resetStory = (storage, storageItem) => ({ type: RESET_STORY, storage, storageItem });

// REDUCER
export default createReducer([], {
  [GO_TO]: (state, action) => [...state, action],
  [REWIND_TO]: (state, { index }) => state.slice(0, index),
  [SET_HISTORY]: (state, { history }) => [...history],
});
