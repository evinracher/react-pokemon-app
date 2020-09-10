export function getClassNames(styles, classList) {
  let res = "";
  classList.forEach(classname => {
    if (styles[classname]) {
      res += " " + styles[classname];
    }
  });
  console.log(res);
  return res;
}