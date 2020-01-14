import React, { Children, cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';

function flattenChildren(children, maxDepth, depth = 0) {
  let childOf;

  return Children.toArray(children).reduce((acc, node) => {
    if (node.props._id && depth >= maxDepth) { childOf = node.props._id; }

    if (isFragment(node) && depth < maxDepth) {
      acc.push(...flattenChildren(node.props.children, maxDepth, depth + 1));
    } else if (isValidElement(node)) {
      acc.push(cloneElement(node, {
        childOf,
        key: `${depth}.${node.key}`,
      }));
    }
    return acc;
  }, []);
}

export function toFlatArray(children, maxDepth = Infinity) {
  return flattenChildren(children, maxDepth);
}

function useElements(children, history, location, autoFocus) {
  const flatChildren = useMemo(() => toFlatArray(children), [children]);

  const locations = useMemo(
    () => flatChildren.map(({ _id, label }, index) => ({ _id, index, label })),
    [flatChildren],
  );

  const clone = useCallback(({ route }, index, array) => {
    const tabIndex = 1 + index;
    const node = flatChildren[route.to];

    return isValidElement(node) ? cloneElement(node, {
      autoFocus,
      enabled: tabIndex >= array.length,
      index: route.to,
      key: `story-element-${index}`,
      locations,
      tabIndex,
    }) : null;
  }, [autoFocus, flatChildren, locations]);

  const elements = useMemo(
    () => history.map(clone),
    [clone, history],
  );

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
    children,
    component: Component,
    componentProps,
    history,
    location,
    autoScroll,
  } = props;

  const ref = useRef(null);
  const [elements] = useElements(children, history, location, autoFocus);

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
     * The context/state when the action is dispatched.
     */
    dataContext: PropTypes.objectOf(PropTypes.any),
    /**
     * A location to another
     */
    route: PropTypes.shape({
      /**
       * The current location.
       */
      from: PropTypes.number,
      /**
       * The location to be next.
       */
      to: PropTypes.number,
    }),
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
  component: 'main',
  componentProps: {},
};

export default Story;
