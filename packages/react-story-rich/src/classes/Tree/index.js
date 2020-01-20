import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

/**
 * isBranch(['intro', []]) // true
 * isBranch([`Hey, ho, let's go,`]) // false
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

class Tree {
  constructor(root, types, config) {
    this.root = root;
    this.types = types;
    this.config = config;
  }

  static parse = () => {

  };

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
