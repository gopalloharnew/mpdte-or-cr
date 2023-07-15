import { data } from "./data.js";

const options = [];

data.forEach((college) => {
  let isThere = options.some((option) => {
    return option === college.allottedCategory;
  });

  if (!isThere) {
    options.push(college.allottedCategory);
  }
});

// console.log(options);
