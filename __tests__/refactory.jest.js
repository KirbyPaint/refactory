import Refactory from '../src/js/refactory.js';

describe('Refactory', () => {

  let refactory;

  beforeEach(() => {
    refactory = new Refactory(0);
  });

  test('test', () => {
    expect(refactory.game).toEqual(0);
  });
});