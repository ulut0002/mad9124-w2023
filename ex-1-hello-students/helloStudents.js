"use strict";
const fs = require("fs");

// 1. Read the JSON file into a variable called students\
const buffer = fs.readFileSync("./students.json");
let data = JSON.parse(buffer);

// 2. Iterate over the students array and print Hello with their full names to the console
// e.g. Hello Walter Baker
if (data && Array.isArray(data)) {
  data.forEach(({ firstName, lastName }) =>
    console.log(`Hello ${firstName} ${lastName}`)
  );
}

// 3. Print out the number of last names starting with the letter D
// e.g. Count of last names starting with D is 1
if (data && Array.isArray(data)) {
  console.log(
    `Count of first names starting with D is:`,
    data.filter(({ firstName }) => firstName.toUpperCase().startsWith("D"))
      .length
  );
}
