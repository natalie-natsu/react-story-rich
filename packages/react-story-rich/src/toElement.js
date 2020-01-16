import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import identity from 'lodash/identity';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import pick from 'lodash/pick';

import Navigation from './classes/Navigation';

export const INJECTED_PROP_TYPES = {
  /**
   * A unique id given to the Element that can be used for navigation.
   * @see `label` prop to navigate through a Knot.
   */
  _id: PropTypes.string,
  /**
   * If set to false, component will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool.isRequired,
  /**
   * Chunk of locations to reduce the cost of navigation in big story trees.
   * For example, if you know all possible next locations to this element
   * you can use that collection to improve the search.
   *
   * Of course prefer goForward(skip) navigation action for the best performance.
   */
  chunk: PropTypes.array,
  /**
   * Is set to true when Element is active in the Story (last element in history for now)
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * The component used for the Error node.
   * Either a string to use a DOM element or a component.
   */
  ErrorComponent: PropTypes.elementType,
  /**
   * The location of the Element in the story tree
   */
  index: PropTypes.number.isRequired,
  /**
   * The location of the Element in the DOM tree or (index of Element in history + 1)
   */
  navigation: PropTypes.instanceOf(Navigation).isRequired,
  /**
   * The location of the Element in the DOM tree or (index of Element in history + 1)
   */
  tabIndex: PropTypes.number.isRequired,
};

export const getElementInjectedProps = (props) => pick(props, Object.keys(INJECTED_PROP_TYPES));

/**
 * toElement HOC for making custom components
 * @param mapInjectedPropsToProps
 * @param ref
 * @return {function(*): WrapperComponent}
 */
const toElement = (mapInjectedPropsToProps = identity, ref = createRef()) => {
  if (!isFunction(mapInjectedPropsToProps)) {
    throw Error(`mapInjectedPropsToProps should be type function. Got ${typeof mapInjectedPropsToProps}`);
  }

  return ((WrappedComponent) => {
    class WrapperComponent extends Component {
      constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
      }

      static getDerivedStateFromError() {
        return { hasError: true };
      }

      componentDidMount() {
        this.handleEnable();
      }

      componentDidCatch(error, errorInfo) {
        this.setState(error, errorInfo);
      }

      handleEnable = () => {
        const { autoFocus } = this.props;
        if (ref && ref.current && autoFocus) {
          ref.current.focus();
        }
      };

      render() {
        const { hasError, error, errorInfo } = this.state;

        const {
          _id,
          autoFocus,
          chunk,
          enabled,
          ErrorComponent,
          index,
          navigation,
          tabIndex,
          ...passThroughProps
        } = this.props;

        const injectedProps = mapInjectedPropsToProps(getElementInjectedProps(this.props));

        if (!isObject(injectedProps)) {
          throw Error(`injectedProp should be an object. Got ${typeof injectedProps}. Check mapInjectedPropsToProps`);
        }

        if (hasError) { return <ErrorComponent error={error} errorInfo={errorInfo} />; }

        if (chunk.length > 0) { navigation.setChunk(chunk); }

        return (
          <WrappedComponent
            autoFocus={autoFocus}
            data-id={_id}
            data-index={index}
            ref={ref}
            tabIndex={tabIndex}
            {...injectedProps}
            {...passThroughProps}
          />
        );
      }
    }

    WrapperComponent.propTypes = INJECTED_PROP_TYPES;

    WrapperComponent.defaultProps = {
      _id: '',
      chunk: [],
      ErrorComponent: () => <p>Something went wrong.</p>,
    };

    return WrapperComponent;
  });
};

export default toElement;
