import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { isFragment } from 'react-is';

import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';

import Navigation from './classes/Navigation';

function flattenChildren(children, maxDepth, depth = 0) {
  return Children.toArray(children).reduce((acc, node) => {
    if (isFragment(node) && depth < maxDepth) {
      acc.push(...flattenChildren(node.props.children, maxDepth, depth + 1));
    } else if (isValidElement(node)) {
      acc.push(cloneElement(node, {
        index: acc.length,
        key: uniqueId('react-story-rich-Element_'),
      }));
    }
    return acc;
  }, []);
}

export function toFlatArray(children, maxDepth = Infinity) {
  return flattenChildren(children, maxDepth);
}

function useElements(children, history, dispatch, autoFocus) {
  // Building flat map tree of Elements for establishing uniq locations
  const flatChildren = useMemo(() => toFlatArray(children), [children]);

  // Creating the locations map by picking only identity props
  const locations = useMemo(() => flatChildren.map(({ _id, key, label }, index) => ({
    _id,
    index,
    key,
    label,
  })), [flatChildren]);

  const location = useMemo(() => history[history.length - 1].to, [history]);
  const elements = useMemo(() => history.map(({ to: i }) => (cloneElement(flatChildren[i], {
    autoFocus,
    enabled: location === i,
    navigation: new Navigation(i, dispatch, locations),
    tabIndex: i + 1,
  }))), [dispatch, history, location, locations]);


  return [elements, locations];
}

const scrollToBottom = (ref) => {
  if (ref) {
    window.scrollTo({
      top: ref.current.offsetTop + ref.current.offsetHeight,
      behavior: 'smooth',
    });
  }
};

function Story(props) {
  const {
    autoFocus,
    autoScroll,
    children,
    component: Component,
    componentProps,
    dispatch,
    history,
  } = props;


  console.log(history);

  const ref = useRef(null);
  const [elements] = useElements(children, history, dispatch, autoFocus);

  console.log(ref, elements);

  useEffect(() => {
    if (autoScroll) { scrollToBottom(ref); }
  }, [history, autoScroll]);

  return <Component ref={ref} {...componentProps}>{elements}</Component>;
}

Story.propTypes = {
  /**
   * If set to false, elements will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
  /**
   * If set to true, the body will scroll To Bottom
   * each time a new Element component is enabled.
   */
  autoScroll: PropTypes.bool,
  /**
   * A node of several Element components.
   */
  children: PropTypes.node.isRequired,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props passed to the component.
   */
  componentProps: PropTypes.object,
  /**
   * A collection of actions from the oldest to the most recent.
   * Is a save on its own and can easy be persisted.
   */
  history: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The current location.
     */
    from: PropTypes.number,
    /**
     * The location to be next.
     */
    to: PropTypes.number,
    /**
     * The type of the action that were dispatched.
     * GO_TO or REWIND_TO.
     */
    type: PropTypes.string,
  })).isRequired,
  /**
   * The current location in the Elements tree.
   */
  location: PropTypes.number.isRequired,
};

Story.defaultProps = {
  autoFocus: true,
  autoScroll: true,
  dispatch: noop,
  component: 'main',
  componentProps: {},
};

export default Story;
