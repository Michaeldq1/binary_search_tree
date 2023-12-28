import { randomArray, prettyPrint, self } from "./utils.js";
import { createTree } from "./tree.js";

console.log(randomArray(100));

const myTree = createTree(randomArray(100));
console.log(prettyPrint(myTree.getRoot()));
console.log(myTree.isBalanced());
console.log(myTree.postOrder(self));
console.log(myTree.preOrder(self));
console.log(myTree.inOrder(self));
myTree.insertNode(177);
myTree.insertNode(189);
myTree.insertNode(199);
myTree.insertNode(154);
myTree.insertNode(104);
myTree.insertNode(123);
myTree.insertNode(101);
console.log(prettyPrint(myTree.getRoot()));
console.log(myTree.isBalanced());
myTree.rebalance();
console.log(myTree.isBalanced());
console.log(prettyPrint(myTree.getRoot()));
console.log(myTree.postOrder(self));
console.log(myTree.preOrder(self));
console.log(myTree.inOrder(self));
