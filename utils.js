const randomArray = (size) => {
  let array = [];

  for (let i = 0; i < size; i++) {
    let randomInt = Math.floor(Math.random() * 100);
    array.push(randomInt);
  }

  return array;
};

const sortArray = (array) => {
  return array.sort((a, b) => a - b);
};

const removeDuplicates = (array) => {
  return [...new Set(array)];
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const minValue = (node) => {
  let current = node;

  while (current.left !== null) {
    current = current.left;
  }

  return current.data;
};

const addOne = (number) => {
  return number + 1;
};

const squared = (number) => {
  return number * number;
};

const self = (node) => {
  return node;
};

export {
  randomArray,
  sortArray,
  removeDuplicates,
  prettyPrint,
  minValue,
  addOne,
  squared,
  self,
};
