class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.listHead = null;
  }

  append(value) {
    if (this.listHead === null) {
      this.listHead = new Node(value);
    } else {
      let currentNode = this.listHead;
      while (currentNode.nextNode !== null) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = new Node(value);
    }
  }

  prepend(value) {
    if (this.listHead === null) {
      this.listHead = new Node(value);
    } else {
      const newNode = new Node(value, this.listHead);
      this.listHead = newNode;
    }
  }

  size() {
    if (this.listHead === null) return 0;
    let nodeCount = 1;
    let currentNode = this.listHead;
    while (currentNode.nextNode !== null) {
      nodeCount++;
      currentNode = currentNode.nextNode;
    }
    return nodeCount;
  }

  head() {
    return this.listHead;
  }

  tail() {
    let currentNode = this.listHead;
    while (currentNode !== null && currentNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  at(index) {
    let count = 0;
    let currentNode = this.listHead;
    if (index < 0 || this.size() < index) return null;
    while (count < index) {
      currentNode = currentNode.nextNode;
      count++;
    }
    return currentNode;
  }

  pop() {
    let currentNode = this.listHead;
    while (currentNode.nextNode.nextNode !== null) {
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = null;
  }

  contains(value) {
    let currentNode = this.listHead;
    while (currentNode !== null && currentNode.value !== value) {
      currentNode = currentNode.nextNode;
    }
    return currentNode !== null;
  }

  find(value) {
    let count = 0;
    let currentNode = this.listHead;
    while (currentNode !== null && currentNode.value !== value) {
      currentNode = currentNode.nextNode;
      count++;
    }
    return currentNode !== null ? count : null;
  }

  toString() {
    let listString = "";
    let currentNode = this.listHead;
    while (currentNode !== null) {
      listString += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    listString += "null";
    return listString;
  }

  insertAt(value, index) {
    if (index < 0 || this.size() < index)
      throw new Error("Index is out of bounds.");
    if (index === 0) {
      this.prepend(value);
    } else if (index === this.size()) {
      this.append(value);
    } else {
      this.at(index - 1).nextNode = new Node(value, this.at(index));
    }
  }

  removeAt(index) {
    if (index < 0 || this.size() < index)
      throw new Error("Index is out of bounds.");
    if (index === 0) {
      this.listHead = this.at(1);
    } else if (index === this.size()) {
      this.pop();
    } else {
      this.at(index - 1).nextNode = this.at(index + 1);
    }
  }
}

// Create a linked list
const myList = new LinkedList();

// Append some values
myList.append(10);
myList.append(20);
myList.append(30);

// Prepend a value
myList.prepend(5);

// Insert values at different indices
myList.insertAt(15, 2); // Inserts 15 at index 2
myList.insertAt(25, 4); // Inserts 25 at index 4
myList.insertAt(35, 6); // Inserts 35 at index 6

// Print the linked list to check the results
console.log(myList.toString()); // Output: ( 5 ) -> ( 10 ) -> ( 15 ) -> ( 20 ) -> ( 25 ) -> ( 30 ) -> ( 35 ) -> null

// Remove values at different indices
myList.removeAt(2); // Removes value at index 2 (15)
myList.removeAt(4); // Removes value at index 4 (30)
myList.removeAt(0); // Removes value at index 0 (5)

// Print the linked list after removals
console.log(myList.toString()); // Output: ( 10 ) -> ( 20 ) -> ( 25 ) -> ( 35 ) -> null

// Test head(), tail(), at(), contains(), and find()
console.log(myList.head()); // Output: Node { value: 10, nextNode: Node { value: 20, nextNode: ... } }
console.log(myList.tail()); // Output: Node { value: 35, nextNode: null }
console.log(myList.at(1)); // Output: Node { value: 20, nextNode: Node { value: 25, nextNode: ... } }
console.log(myList.contains(20)); // Output: true
console.log(myList.find(30)); // Output: 2

// Test out-of-bounds index for insertAt() and removeAt()
try {
  myList.insertAt(40, 10); // Index out of bounds error
} catch (error) {
  console.error(error.message); // Output: Index is out of bounds.
}

try {
  myList.removeAt(10); // Index out of bounds error
} catch (error) {
  console.error(error.message); // Output: Index is out of bounds.
}
