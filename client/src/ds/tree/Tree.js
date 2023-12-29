class TreeNode {
  constructor(key, value = key, parent = null, flag = false) {
    // Key will be the id of the directory
    this.key = key;
    // Value will store the information of the directory
    // Like: id, tilte,...
    this.value = value;
    // Parent will be the parent directory
    this.parent = parent;
    // Child items of the directory
    // Default this is an array
    this.children = [];

    // flag = false => new node
    // flag = true => using copy method
    if (!flag) {
      if (value.data_type === 'directory') {
        if (value.child_items.length > 0) {
          for (const child_item of value.child_items) {
            this.children.push(new TreeNode(child_item.id, child_item, this));
          }
        }
      }
    }
  }

  get isLeaf() {
    return this.children.length === 0;
  }

  get hasChildren() {
    return !this.isLeaf;
  }

  // Gets the key of the node.
  getKey() {
    return this.key;
  }

  setValue(value) {
    this.value = value;
  }

  // Copies the tree rooted at this node.
  copy() {
    const copy = new TreeNode(this.key, this.value, this.parent, true);
    for (const child of this.children) {
      copy.children.push(child.copy());
    }
    return copy;
  }
}

export class Tree {
  constructor(key, value = key) {
    if (key) {
      this.root = new TreeNode(key, value);
    } else this.root = null;
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  // Sets the root node for the tree.
  setRoot(rootNode) {
    this.root = rootNode;
  }

  insert(parentNodeKey, key, value = key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  edit(key, data) {
    // Get the dir using it's id
    const node = this.find(key);
    if (node) {
      node.setValue(data);
      return true;
    }
    return false;
  }

  // Copies the entire tree.
  copy() {
    return this.root.copy();
  }
}
