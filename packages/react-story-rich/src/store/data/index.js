import createReducer from '../createReducer';

// ACTIONS
export const SET_DATA = Symbol('SET_DATA');
export const setData = (data) => ({ type: SET_DATA, data });

export const UPDATE_DATA = Symbol('UPDATE_DATA');
export const updateData = (data) => ({ type: UPDATE_DATA, data });

// REDUCER
export default createReducer({}, {
  [SET_DATA]: (state, { data }) => data,
  [UPDATE_DATA]: (state, { data }) => ({ ...state, ...data }),
});
