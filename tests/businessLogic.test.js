const { function1, function2, function3 } = require("../src/businessLogic");

describe("businessLogic", () => {
  describe("function1", () => {
    it("should return correct output for valid input", () => {
      const input = "test";
      const expectedOutput = "expected";
      expect(function1(input)).toBe(expectedOutput);
    });

    it("should throw error for invalid input", () => {
      const input = "invalid";
      expect(() => function1(input)).toThrow();
    });
  });

  describe("function2", () => {
    it("should return correct output for valid input", () => {
      const input = "test";
      const expectedOutput = "expected";
      expect(function2(input)).toBe(expectedOutput);
    });

    it("should throw error for invalid input", () => {
      const input = "invalid";
      expect(() => function2(input)).toThrow();
    });
  });

  describe("function3", () => {
    it("should return correct output for valid input", () => {
      const input = "test";
      const expectedOutput = "expected";
      expect(function3(input)).toBe(expectedOutput);
    });

    it("should throw error for invalid input", () => {
      const input = "invalid";
      expect(() => function3(input)).toThrow();
    });
  });
});
