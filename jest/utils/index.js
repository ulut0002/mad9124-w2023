const lookupStudentById = async (id) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id,
          name: "tim",
          grade: "A+",
        }),
      500
    );
  });

const lookupClassById = async (id) =>
  new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          id,
          name: "MAD9124",
          instructor: "tim",
          students: [1, 2, 3],
        }),
      500
    );
  });

module.exports = { lookupClassById, lookupStudentById };
