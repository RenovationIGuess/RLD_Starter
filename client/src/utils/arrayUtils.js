function moveItem(arr, index, direction) {
  if (direction === 'forward' && index < arr.length - 1) {
    const item = arr[index];
    arr.splice(index, 1);
    arr.splice(index + 1, 0, item);
  } else if (direction === 'backward' && index > 0) {
    const item = arr[index];
    arr.splice(index, 1);
    arr.splice(index - 1, 0, item);
  }
  return arr;
}

export default {
  moveItem,
};
