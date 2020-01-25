import React, { forwardRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import isString from 'lodash/isString';
import last from 'lodash/last';

import Tree, { isCustomComponent, isPipe, hasProperties } from '../../classes/Tree';
import Navigation from '../../classes/Navigation';
import DefaultElement from '../Element';
import Break from '../Element/Break';

export const defaultRenderer = (node, nav, defaultElement) => {
  if (isPipe(node)) {
    const pipeProps = { text: true, children: node, onTap: Navigation.skip };
    return [defaultElement, pipeProps];
  }

  if (isCustomComponent(node)) {
    const { Element, ...passThroughProps } = node;
    return [Element, passThroughProps];
  }

  if (hasProperties(node)) {
    const props = { ...node, text: isString(node.children) };
    return [defaultElement, props];
  }

  // Story render a Break if nothing match isPipe, isCustomComponent, or hasProperties
  return [Break, { onTap: Navigation.skip }];
};

const Story = forwardRef((props, ref) => {
  const {
    autoFocus,
    component: StoryComponent,
    defaultElement,
    dispatch,
    history,
    renderer,
    tree: root,
    ...storyPassThroughProps
  } = props;

  const currentLocation = useMemo(() => last(history).to, [history]);

  const trunk = useMemo(() => root.toTrunk(), [root]);

  const getNode = useCallback((key) => trunk.get(key), [trunk]);

  const isEnabled = useCallback((key) => key === currentLocation, [currentLocation]);

  const getNavigation = useCallback(({ key }) => (
    new Navigation(key, dispatch)
  ), [dispatch]);

  return (
    <StoryComponent ref={ref} {...storyPassThroughProps}>
      {history.map(({ to: key }) => {
        const { node, location } = getNode(key);
        const nav = getNavigation(location);

        const [Element, passThroughProps] = renderer(node, nav, defaultElement);

        const injected = {
          autoFocus,
          enabled: isEnabled(key),
          key,
          location,
          nav,
        };

        return <Element key={location.label} injected={injected} {...passThroughProps} />;
      })}
    </StoryComponent>
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
   * A valid element type for default node rendering
   */
  defaultElement: PropTypes.elementType,
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
   * A function returning [component, props]
   * for Story rendering.
   */
  renderer: PropTypes.func,
  /**
   * An instance of a Tree
   * See Tree API
   */
  tree: PropTypes.instanceOf(Tree).isRequired,
};

Story.defaultProps = {
  autoFocus: true,
  component: 'main',
  defaultElement: DefaultElement,
  renderer: defaultRenderer,
};

export default Story;
