import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import identity from 'lodash/identity';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

import Route, { REWIND_TO } from './Route';

/**
 * Default permissive navigation method
 * @param route
 * @param dispatch
 * @private
 */
export function navigate(route, dispatch) {
  dispatch({ ...(route instanceof Route ? route.toPlainObject() : route) });
}

class Navigation {
  constructor(from, dispatch = identity, chunk = []) {
    this.from = Navigation.isFromValid(from);
    this.dispatch = Navigation.isDispatchValid(dispatch);
    this.chunk = Navigation.isChunkValid(chunk);
  }


  /* STATICS & VALIDATIONS
    + isFromValid(from: integer): integer
    + isRouteValid(route: Route): Route
    + isTypeValid(type: string): string
    + isChunkValid(chunk: Array): Array
  */

  /* Predicates */

  static findById = (_id) => ['_id', _id];

  static findByIndex = (index) => ['index', index];

  static findByLabel = (label, childOf) => ({ label, childOf });

  /* Validators */

  static isFromValid = (from) => {
    if (typeof from !== 'number') {
      throw Error(`dispatch should be type number. Got ${typeof from}`);
    }

    return from;
  };

  static isRouteValid = (route) => {
    if (!(route instanceof Route)) {
      throw Error('route should be an instance of Route');
    }

    return route;
  };

  static isDispatchValid = (dispatch) => {
    if (!isFunction(dispatch)) {
      throw Error(`dispatch should be type function. Got ${typeof dispatch}`);
    }

    return dispatch;
  };

  static isChunkValid = (chunk) => {
    if (!isArray(chunk)) {
      throw Error(`chunk should be type Array. Got ${typeof chunk}`);
    }

    return chunk;
  };


  /* GETTERS & SETTERS
    + getRoute(): Route
    + setRoute(route: Route): Route

    + getDispatch(): function
    + setDispatch(dispatch: string): function

    + getChunk(): Array
    + setChunk(chunk: Array): Array
  */

  getFrom = () => this.route;

  setFrom = (from) => Navigation.isFromValid(from);

  getDispatch = () => this.dispatch;

  setDispatch = (dispatch) => Navigation.isDispatchValid(dispatch);

  getChunk = () => this.chunk;

  setChunk = (chunk) => Navigation.isDispatchValid(chunk);


  /* NAVIGATION METHODS
    + apply(): @see navigate()
    + goBackward()
    + goForward()
    + goTo([predicate=_.identity], [chunk=Array], [fromIndex=0])
    + rewindTo([predicate=_.identity], [chunk=Array], [fromIndex=0])
   */

  _apply = (route, dispatch = this.dispatch) => {
    navigate(Navigation.isRouteValid(route), Navigation.isDispatchValid(dispatch));
  };

  /**
   * @see https://lodash.com/docs/4.17.15#findIndex
   * @param from
   * @param predicate
   * @param fromIndex
   * @param chunk
   */
  goTo = (from, predicate = Navigation.findByIndex, fromIndex, chunk = this.getChunk()) => {
    this._apply(new Route(from, findIndex(chunk, predicate, fromIndex)));
  };

  /**
   * @see https://lodash.com/docs/4.17.15#findLastIndex
   * @param from
   * @param predicate
   * @param fromIndex
   * @param chunk
   */
  rewindTo = (from, predicate = Navigation.findByIndex, fromIndex, chunk = this.getChunk()) => {
    this._apply(new Route(from, findLastIndex(chunk, predicate, fromIndex), REWIND_TO));
  };

  /**
   * @param from
   * @param skip
   */
  goBackward = (from = this.getFrom().from, skip = 0) => {
    this._apply(new Route(from, from - skip - 1, REWIND_TO));
  };

  /**
   * @param from
   * @param skip
   */
  goForward = (from = this.getFrom(), skip = 0) => {
    this._apply(new Route(from, from + skip + 1));
  };
}

export default Navigation;
