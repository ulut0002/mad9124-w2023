const { lookupClassById, lookupStudentById } = require("./utils");

const addTwoNumbers = (x, y) => x + y;
const subtractTwoNumbers = (x, y) => x - y;
const combineTwoObjects = (objA, objB) => ({ ...objA, ...objB });

const getClassWithStudents = async (id) => {
  const foundClass = await lookupClassById(id);
  if (!foundClass) throw new Error(`Class with id ${id} not found`);
  foundClass.students = await Promise.all(
    foundClass.students.map(lookupStudentById)
  );
  return foundClass;
};

const doSomethingByType = (type) => {
  if (type === "potato") {
    return "A";
  }
  if (type === "salad") {
    return "B";
  }
  if (type === "error") {
    throw new Error("error");
  }
  return "C";
};

module.exports = {
  addTwoNumbers,
  combineTwoObjects,
  doSomethingByType,
  getClassWithStudents,
  subtractTwoNumbers,
};
