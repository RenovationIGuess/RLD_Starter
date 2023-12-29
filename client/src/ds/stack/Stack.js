class Stack {
  constructor() {
    this.stack = [];
  }

  push(element) {
    this.stack.push(element);
  }

  pop() {
    if (this.stack.length === 0) {
      return 'Underflow';
    }
    return this.stack.pop();
  }

  // exists(element) {
  //   return this.stack.includes(element);
  // }

  bottom() {
    return this.stack[0];
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  // printStack() {
  //   let str = "";
  //   for (let i = 0; i < this.items.length; i++) {
  //     str += this.items[i] + " ";
  //   }
  //   return str;
  // }
}
