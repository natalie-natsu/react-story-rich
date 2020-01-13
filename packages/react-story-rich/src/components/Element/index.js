/* eslint-disable no-underscore-dangle, react/jsx-handler-names */
// react/jsx-handler-names doesn't work with dangles for private methods

import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import findIndex from 'lodash/findIndex';
import findLastIndex from 'lodash/findLastIndex';
import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import Navigation, { GO_TO, REWIND_TO } from '../Navigation';
import Route from '../Route';

/* Predicates for navigation actions */
export const findByById = (_id) => ['_id', _id];
export const findByByIndex = (index) => ['index', index];
export const findByLabel = (label, childOf) => ({ label, childOf });

/**
 * `import Element from '@react-story-rich/core/components/Element';`
 * `class MyCustomElement extends Element { ...`
 */
class Element extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.index = props.index; // index is passed via props but will never change
    this.locations = props.locations; // same here

    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
      timeoutID: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { enabled } = this.props;

    if (enabled !== prevProps.enabled) { this._handleEnable(); }
  }

  componentDidCatch(error, errorInfo) {
    this.setState(error, errorInfo);
  }

  componentWillUnmount() {
    const { timeoutID } = this.state;

    clearTimeout(timeoutID);
  }

  /**
   * If prop `timeout` is set (func or number)
   * prop `onTimeout` will be called at the end of the delay.
   * However the timeout can be cleared by the _handleEnable callback.
   *
   * @private
   */
  _handleTimeout = () => {
    const { onTimeout, timeout } = this.props;
    const { timeoutID } = this.state;

    const delay = (isFunction(timeout) ? timeout(this.props) : timeout) + 500;

    if (delay && !timeoutID) {
      const nextTimeoutID = setTimeout(() => onTimeout(this.props), delay);

      this.setState({ timeoutID: nextTimeoutID });
    }
  };

  /**
   *
   * @private
   */
  _handleEnable = () => {
    const { autoFocus, enabled, onEnable } = this.props;
    const { timeoutID } = this.state;

    if (this.ref && this.ref.current && autoFocus) { this.ref.current.focus(); }

    if (!timeoutID && enabled) { this._handleTimeout(); }
    if (timeoutID && !enabled) { clearTimeout(timeoutID); }

    onEnable(this.props);
  };

  /**
   *
   * @private
   * @param event
   */
  _handleTap = (event) => {
    const { enabled, onTap, readOnly } = this.props;
    if (enabled && onTap && !readOnly) { onTap(this.props, event); }
  };

  /**
   *
   * @private
   * @param event
   */
  _handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') { this._handleTap(event); }
  };


  /* NAVIGATION METHODS
    - _identity(): number
    - _navigate(): Navigation
    + goBackward(): Navigation
    + goForward(): Navigation
    + goTo([predicate=_.identity], [chunk=Array], [fromIndex=0]): Navigation
    + rewindTo([predicate=_.identity], [chunk=Array], [fromIndex=0]): Navigation
   */

  _identity = () => this.index;

  /**
   * Default navigation method
   * creating and dispatching a Navigation action.
   * @param type
   * @param route
   * @private
   */
  _navigate = (type = GO_TO, route) => {
    const { dataContext, dispatch } = this.props;
    const action = new Navigation(type, route, dataContext);

    dispatch(action);
  };

  /**
   * Create an instance of Route with a certain predicate
   * and call a GO_TO Navigation action.
   * @see https://lodash.com/docs/4.17.15#findIndex
   * @param predicate
   * @param chunk
   * @param fromIndex
   */
  goTo = (predicate = this._identity, chunk = this.locations, fromIndex) => {
    const route = new Route(this.index, findIndex(chunk, predicate, fromIndex));

    this._navigate(GO_TO, route);
  };

  /**
   * Create an instance of Route with a certain predicate
   * and call a REWIND_TO Navigation action.
   * @see https://lodash.com/docs/4.17.15#findLastIndex
   * @param predicate
   * @param chunk
   * @param fromIndex
   */
  rewindTo = (predicate = this._identity, chunk = this.locations, fromIndex) => {
    const route = new Route(this.index, findLastIndex(chunk, predicate, fromIndex));

    this._navigate(REWIND_TO, route);
  };

  /**
   * Same as rewindTo, but use this element identity as base location.
   * Can skip a number of elements.
   * @param skip
   */
  goBackward = (skip = 0) => {
    this.rewindTo(() => this.index - skip - 1);
  };

  /**
   * Same as goTo, but use this element identity as base location.
   * Can skip a number of elements.
   * @param skip
   */
  goForward = (skip = 0) => {
    this.goTo(() => this.index + skip + 1);
  };


  render() {
    const { hasError } = this.state;

    if (hasError) {
      const { ErrorComponent } = this.props;
      const { error, errorInfo } = this.state;

      return <ErrorComponent error={error} errorInfo={errorInfo} />;
    }

    const { _id, autoFocus, children, enabled, label, RootComponent, tabIndex } = this.props;

    return (
      // This rule is obsolete since the feature is game specific, not web specific
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <RootComponent
        autoFocus={autoFocus}
        data-id={_id}
        data-index={this.index}
        data-label={label}
        data-disabled={!enabled}
        onClick={this._handleTap}
        onKeyPress={this._handleKeyPress}
        ref={this.ref}
        tabIndex={tabIndex}
      >
        {children}
      </RootComponent>
    );
  }
}

Element.propTypes = {
  /**
   * A unique id given to the Element that can be used for navigation.
   * @see `label` prop to navigate through a Knot.
   */
  _id: PropTypes.string,
  /**
   * If set to false, component will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
  /**
   * A node of several Element components.
   */
  children: PropTypes.node.isRequired,
  /**
   * A literal Object of things you need for the element.
   * If an Action is dispatched, the dataContext will be saved to the history.
   */
  dataContext: PropTypes.object,
  /**
   * Navigation is handled with a Redux Store.
   * You probably don't need to passed you're own dispatch
   * except if you use Element as parent class for YourCustomElement.
   */
  dispatch: PropTypes.func,
  /**
   * @ignore
   */
  enabled: PropTypes.bool,
  /**
   * The component used for the Error node.
   * Either a string to use a DOM element or a component.
   */
  ErrorComponent: PropTypes.elementType,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * An id that can be used to navigate through a Knot.
   * Contrary to `id`, the `label` prop is Knot scoped.
   */
  label: PropTypes.string,
  /**
   * @ignore
   */
  locations: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    childOf: PropTypes.string, // a Knot _id
    index: PropTypes.number,
    label: PropTypes.string,
  })),
  /**
   * Callback triggered when Element is enabled by the Story.
   */
  onEnable: PropTypes.func,
  /**
   * Callback triggered when Element is enabled and is clicked or key pressed.
   */
  onTap: PropTypes.func,
  /**
   * Callback triggered when Element is enabled and the timeout delay is reached.
   */
  onTimeout: PropTypes.func,
  /**
   * If set to true, the enabled Element cannot be "tapped" but *onTimeout* can still be called.
   * Useful if you want to wait for an audio to finish before making tapping possible.
   */
  readOnly: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  RootComponent: PropTypes.elementType,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number.isRequired,
  /**
   * The delay *onTimeout* will be waiting before being triggered.
   */
  timeout: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
};

Element.defaultProps = {
  _id: undefined,
  autoFocus: false,
  dataContext: {},
  dispatch: identity,
  enabled: false,
  ErrorComponent: () => <p>Something went wrong.</p>,
  index: undefined,
  label: undefined,
  locations: [],
  onEnable: noop,
  onTap: undefined,
  onTimeout: noop,
  readOnly: false,
  RootComponent: 'div',
  timeout: 0,
};

export default Element;
