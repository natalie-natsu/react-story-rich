import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';

/**
 * A branch is a sequence of Element in a named origin.
 * In this example "intro" is the key of the branch.
 * Element to this branch could refer to their branch in Navigation
 *
 * isBranch(['intro', []]) // true
 * isBranch([`Hey, ho, let's go!`]) // false
 *
 * @return {boolean}
 * @param node
 */
export const isBranch = (node) => (
  isArray(node)
  && node.length === 2
  && isString(node[0])
  && isArray(node[1])
);

/**
 * A pipe is a pure text Element using de default node Component given to <Story />
 * The Story renderer will automatically inject { children, text, onTap } props to the Component.
 *
 * isPipe({ children: 'Hey, ho, let's go!', text: true }) // true
 * isCustomComponent(`Hey, ho, let's go!`) // true
 * @param node
 * @return {boolean}
 */
export const isPipe = (node) => (
  isString(node)
);

/**
 * A Custom Component is a Component provided by your own or @react-story-rich/ui
 * that handles basic user interactions like the tapEvent given by useTap() hook.
 *
 * Refer to https://wasa42.github.io/react-story-rich/#section-custom-component
 *
 * isCustomComponent({ component: Component, children: 'Hey, ho, let's go!', text: true }) // true
 * isCustomComponent({ children: 'Hey, ho, let's go!', text: true }) // false
 * isCustomComponent(`Hey, ho, let's go!`) // false
 *
 * @param node
 * @return {boolean}
 */
export const isCustomComponent = (node) => (
  isPlainObject(node)
  && !isEmpty(node.Element)
);

/**
 * hasProperties({ component: Component, children: 'Hey, ho, let's go!', text: true }) // true
 * hasProperties({ children: 'Hey, ho, let's go!', text: true }) // true
 * hasProperties(`Hey, ho, let's go!`) // false
 *
 * @param node
 * @return {boolean}
 */
export const hasProperties = (node) => (
  isPlainObject(node)
  && !isEmpty(node)
);

class Tree {
  constructor(root, types, config) {
    this.root = root;
    this.types = types;
    this.config = config;
  }

  static flat(root, branchName = 'root') {
    return root.reduce((acc, node, index, branch) => {
      if (isBranch(node)) {
        acc.push(...Tree.flat(node[1], `${branchName}_${acc.length}.${node[0]}`));
      } else {
        const location = {
          branchedBy: { name: branchName, size: branch.length, location: { inTree: acc.length } },
          inBranch: index,
          key: acc.length,
          label: `${branchName}.${index}`,
        };

        acc.push([location.key, { node, location }]);
      }

      return acc;
    }, []);
  }

  static flatMap = (root) => new Map(Tree.flat(root));

  toTrunk = () => Tree.flatMap(this.root);
}

export default Tree;
