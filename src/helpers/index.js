// For ../components/Week.js
export const exampleBackground = id => {
  let weeks = [300, 301, 302, 303, 304];
  let check = weeks.includes(id);
  return check;
};

export const getClassesString = (empty, example, tooltip) => {
  const classes = ["week"];
  if (empty) {
    classes.push("empty");
  }
  if (example) {
    classes.push("example-background");
  }
  if (tooltip) {
    classes.push("tooltip-available");
  }
  const classesString = classes.join(" ");
  return classesString;
};

export const weeksBetween = date => {
  // User your birthday/start date here
  const start = new Date(2004, 1, 13);
  return Math.round((date - start) / (7 * 24 * 60 * 60 * 1000));
};
