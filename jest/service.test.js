"use strict";

const {
  addTwoNumbers,
  subtractTwoNumbers,
  combineTwoObjects,
} = require("./service.js");
const { lookupClassById, lookupStudentById } = require("./utils/index.js");

// jest.mock("./utils/index.js");

describe("Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Add two numbers", () => {
    it("should add two numbers", async () => {
      const value1 = 3;
      const value2 = 7;

      //act
      const result = await addTwoNumbers(value1, value2);

      //assert
      expect(result).toBe(value1 + value2);
    });
  });

  describe("Subtract two numbers", () => {
    it("should subtract one number from another", async () => {
      //arrange
      const value1 = 10;
      const value2 = 4;

      //act
      const result = await subtractTwoNumbers(value1, value2);

      //assert
      expect(result).toBe(value1 - value2);
    });
  });

  describe("Combine two objects", () => {
    it("should combine two objects", async () => {
      //arrange
      const obj1 = { name: "Serdar" };
      const obj2 = { grade: "A" };
      //act
      const result = await combineTwoObjects(obj1, obj2);

      //assert
      expect(result).toEqual({ ...obj1, ...obj2 });
    });
  });

  describe("Look-up student by id", () => {
    it("should return a student by id", async () => {
      //arrange
      const id = 1;

      //act
      const result = await lookupStudentById(id);

      //assert
      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("name", "tim");
      expect(result).toHaveProperty("grade", "A+");
    });
  });

  describe("Look-up class by id", () => {
    it("should return a class by id", async () => {
      //arrange
      const input = 2;

      //act
      const result = await lookupClassById(input);

      //assert
      expect(result).toHaveProperty("name", "MAD9124");
      expect(result).toHaveProperty("instructor", "tim");
      expect(result).toHaveProperty("students");
      expect(result.students).toBeInstanceOf(Array);
    });
  });
});
