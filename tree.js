import { createNode } from "./node.js";
import { sortArray, removeDuplicates, minValue } from "./utils.js";

const createTree = (array) => {
  const buildTree = (array) => {
    let sortedArray = sortArray(array);
    let uniqueValuesArray = removeDuplicates(sortedArray);

    if (uniqueValuesArray.length === 0) {
      return null;
    }
    const midpoint = Math.floor(uniqueValuesArray.length / 2);

    const node = createNode(
      uniqueValuesArray[midpoint],
      buildTree(uniqueValuesArray.slice(0, midpoint)),
      buildTree(uniqueValuesArray.slice(midpoint + 1))
    );

    return node;
  };

  let root = buildTree(array);

  const insertNode = (value, currentNode = root) => {
    if (currentNode === null) {
      return createNode(value);
    }
    if (currentNode.data === value) {
      return;
    }
    currentNode.data < value
      ? (currentNode.right = insertNode(value, currentNode.right))
      : (currentNode.left = insertNode(value, currentNode.left));

    return currentNode;
  };

  const deleteNode = (value, currentNode = root) => {
    if (currentNode === null) {
      return;
    }

    if (value < currentNode.data) {
      currentNode.left = deleteNode(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = deleteNode(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }
      currentNode.data = minValue(currentNode.right);
      currentNode.right = deleteNode(currentNode.data, currentNode.right);
    }

    return currentNode;
  };

  const find = (value, currentNode = root) => {
    if (currentNode === null) return null;
    if (currentNode.data === value) return currentNode;
    if (value < currentNode.data) return find(value, currentNode.left);
    if (value > currentNode.data) return find(value, currentNode.right);
  };

  const levelOrder = (callback) => {
    if (root === null) return;

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      result.push(callback(currentNode.data));

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    return result;
  };

  const inOrder = (callback, currentNode = root) => {
    if (currentNode === null) return;

    const leftResult = inOrder(callback, currentNode.left) || [];
    const currentResult = callback(currentNode.data);
    const rightResult = inOrder(callback, currentNode.right) || [];

    return [...leftResult, currentResult, ...rightResult];
  };

  const preOrder = (callback, currentNode = root) => {
    if (currentNode === null) return;

    const currentResult = callback(currentNode.data);
    const leftResult = preOrder(callback, currentNode.left) || [];
    const rightResult = preOrder(callback, currentNode.right) || [];

    return [currentResult, ...leftResult, ...rightResult];
  };

  const postOrder = (callback, currentNode = root) => {
    if (currentNode === null) return;

    const leftResult = postOrder(callback, currentNode.left) || [];
    const rightResult = postOrder(callback, currentNode.right) || [];
    const currentResult = callback(currentNode.data);

    return [...leftResult, ...rightResult, currentResult];
  };

  const nodeHeight = (value, currentNode = root) => {
    let height = -1;

    const calculateHeight = (node) => {
      if (node === null) return -1;

      const leftHeight = calculateHeight(node.left);
      const rightHeight = calculateHeight(node.right);

      const maxHeight = Math.max(leftHeight, rightHeight) + 1;

      if (node.data === value) {
        height = maxHeight;
      }

      return maxHeight;
    };

    calculateHeight(currentNode);
    return height;
  };

  const nodeDepth = (value, currentNode = root) => {
    let depth = -1;

    if (currentNode === null) return -1;

    if (
      currentNode.data == value ||
      (depth = nodeDepth(value, currentNode.left)) >= 0 ||
      (depth = nodeDepth(value, currentNode.right)) >= 0
    )
      return depth + 1;
  };

  const isBalanced = (currentNode = root) => {
    if (currentNode === null) return { balanced: true, height: -1 };

    const leftResult = isBalanced(currentNode.left);
    const rightResult = isBalanced(currentNode.right);

    const isLeftBalanced = leftResult.balanced;
    const isRightBalanced = rightResult.balanced;

    const heightDifference =
      Math.abs(leftResult.height - rightResult.height) <= 1;

    const result = {
      balanced: isLeftBalanced && isRightBalanced && heightDifference,
      height: Math.max(leftResult.height, rightResult.height) + 1,
    };

    return result;
  };

  const rebalance = () => {
    let currentTreeArray = inOrder((data) => data);
    root = buildTree(currentTreeArray);
    return root;
  };

  const getRoot = () => root;

  return {
    getRoot,
    buildTree,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    nodeHeight,
    nodeDepth,
    isBalanced,
    rebalance,
  };
};

export { createTree };
