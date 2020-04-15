// For ../components/Week.js
export const exampleBackgroundCheck = id => {
  let weeks = [1515];
  let check = weeks.includes(id);
  return check;
};

export const getClassesString = (empty, example, tooltip) => {
  const classes = ["week"];
  if (empty) {
    classes.push("empty");
  }
  if (example) {
    classes.push("example");
  }
  if (tooltip) {
    classes.push("tooltip-available");
  }
  const classesString = classes.join(" ");
  return classesString;
};
