import React, { Children, cloneElement, isValidElement, useCallback, useEffect, useMemo, useRef } from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';

import omit from '../../helpers/omit';

function flattenChildren(children, maxDepth, depth = 0) {
  return Children.toArray(children).reduce((acc, node) => {
    if (isFragment(node) && depth < maxDepth) {
      acc.push(...flattenChildren(node.props.children, maxDepth, depth + 1));
    } else if (isValidElement(node)) {
      acc.push(cloneElement(node, {
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
    () => flatChildren.map(({ props }, from) => props.name || from),
    [flatChildren],
  );

  const clone = useCallback(({ from }, index, array) => {
    const tabIndex = 1 + index;
    const node = flatChildren[from];

    return isValidElement(node) && cloneElement(node, {
      autoFocus,
      elementNumber: from,
      enabled: tabIndex === array.length,
      key: `story-element-${index}`,
      locations,
      tabIndex,
    });
  }, [autoFocus, flatChildren, locations]);

  const elements = useMemo(
    () => history.concat({ from: location }).map(clone),
    [clone, history, location],
  );

  return [elements, locations];
}

const toBottom = (ref) => {
  if (ref) {
    window.scrollTo({
      top: ref.current.offsetTop + ref.current.offsetHeight,
      behavior: 'smooth',
    });
  }
};

/**
 * Render its own children Elements according to the history prop.
 *
 * `import Story from '@react-story-rich/core/components/Story';`
 * @param props
 * @return {*}
 * @constructor
 */
function Story(props) {
  const {
    autoFocus,
    children,
    component: Component,
    history,
    location,
    scrollToBottom,
    ...other
  } = props;

  const ref = useRef(null);
  const [elements] = useElements(children, history, location, autoFocus);

  useEffect(() => {
    if (scrollToBottom) { toBottom(ref); }
  }, [history, scrollToBottom]);

  return <Component ref={ref} {...omit(['data', 'dispatch'], other)}>{elements}</Component>;
}

Story.propTypes = {
  /**
   * If set to false, elements will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
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
   * A collection of actions from the oldest to the most recent.
   * Is a save on its own and can easy be persisted:
   * (action types might be strings instead of symbols in this case)
   */
  history: PropTypes.arrayOf(PropTypes.shape({
    /**
     * The context/state when the action is dispatched.
     * Useful to navigate through history and retrieve context in some point.
     */
    context: PropTypes.objectOf(PropTypes.any),
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
     * For now there is only a GO_TO action,
     * but we can imagine way more action that can be inserted in the history.
     */
    type: PropTypes.symbol,
  })).isRequired,
  /**
   * The current location in the all Elements tree.
   */
  location: PropTypes.number.isRequired,
  /**
   * If set to true, the body will scroll To Bottom
   * each time a new Element component is enabled.
   */
  scrollToBottom: PropTypes.bool,
};

Story.defaultProps = {
  autoFocus: true,
  component: 'main',
  scrollToBottom: true,
};

export default Story;
