import React, { forwardRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import isString from 'lodash/isString';
import last from 'lodash/last';

import Tree, { isCustomComponent, isPipe, hasProperties } from '../../classes/Tree';
import Navigation from '../../classes/Navigation';
import Element from '../Element';

export const nodeRenderer = (node, nav, defaultComponent = Element) => {
  if (isPipe(node)) {
    const pipeProps = { text: true, children: node, onTap: Navigation.skip };
    return [defaultComponent, pipeProps];
  }

  if (isCustomComponent(node)) {
    const { component, ...nodeProps } = node;
    return [component, nodeProps];
  }

  if (hasProperties(node)) {
    const props = { ...node, text: isString(node.children) };
    return [defaultComponent, props];
  }

  // Story render a Break if nothing match isPipe, isCustomComponent, or hasProperties
  return ['hr', { onTap: Navigation.skip }];
};

const Story = forwardRef((props, ref) => {
  const {
    autoFocus,
    component: Component,
    dispatch,
    history,
    nodeComponent,
    nodeRenderer: renderer,
    tree: root,
    ...passThroughProps
  } = props;

  const currentLocation = useMemo(() => last(history).to, [history]);

  const trunk = useMemo(() => root.toTrunk(), [root]);

  const getNode = useCallback((key) => trunk.get(key), [trunk]);

  const isEnabled = useCallback((key) => key === currentLocation, [currentLocation]);

  const getNavigation = useCallback(({ key }) => (
    new Navigation(key, dispatch)
  ), [dispatch]);

  return (
    <Component ref={ref} {...passThroughProps}>
      {history.map(({ to: key }) => {
        const { node, location } = getNode(key);
        const nav = getNavigation(location);

        const [NodeComponent, nodeProps] = renderer(node, nav, nodeComponent);

        const injected = {
          autoFocus,
          enabled: isEnabled(key),
          key,
          location,
          nav,
        };

        return <NodeComponent key={location.label} injected={injected} {...nodeProps} />;
      })}
    </Component>
  );
});

Story.propTypes = {
  /**
   * If set to false, elements will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The dispatcher of your store
   */
  dispatch: PropTypes.func.isRequired,
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
   * A valid element type for default node rendering
   */
  nodeComponent: PropTypes.elementType,
  /**
   * A function returning [component, props]
   * for Story rendering.
   */
  nodeRenderer: PropTypes.func,
  /**
   * An instance of a Tree
   * See Tree API
   */
  tree: PropTypes.instanceOf(Tree).isRequired,
};

Story.defaultProps = {
  autoFocus: true,
  component: 'main',
  nodeComponent: Element,
  nodeRenderer,
};

export default Story;
