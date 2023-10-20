const { businessLogicFunction1, businessLogicFunction2 } = require('../src/businessLogic');

describe('businessLogicFunction1', () => {
  test('should handle empty array', () => {
    expect(businessLogicFunction1([])).toEqual(expectedOutputForEmptyArray);
  });

  test('should handle single-element array', () => {
    expect(businessLogicFunction1([singleElement])).toEqual(expectedOutputForSingleElementArray);
  });

  test('should handle multi-element array', () => {
    expect(businessLogicFunction1([element1, element2, element3])).toEqual(expectedOutputForMultiElementArray);
  });
});

describe('businessLogicFunction2', () => {
  test('should handle edge case 1', () => {
    expect(businessLogicFunction2(inputForEdgeCase1)).toEqual(expectedOutputForEdgeCase1);
  });

  test('should handle edge case 2', () => {
    expect(businessLogicFunction2(inputForEdgeCase2)).toEqual(expectedOutputForEdgeCase2);
  });

  test('should handle edge case 3', () => {
    expect(businessLogicFunction2(inputForEdgeCase3)).toEqual(expectedOutputForEdgeCase3);
  });
});
