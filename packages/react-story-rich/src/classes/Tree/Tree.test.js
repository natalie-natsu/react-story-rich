import Tree from '.';
import root, { ROOT_LENGTH } from './root';

describe('Tree', () => {
  test('can be flatten', () => {
    expect(Tree.flat(root).length).toEqual(ROOT_LENGTH);
  });
  test('can be flatten into a Map trunk', () => {
    expect(new Tree(root).toTrunk().size).toEqual(ROOT_LENGTH);
  });
});
