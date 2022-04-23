/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    let removed;

    if (!this.head) {
      throw "list is empty";
    }

    if (!this.head.next) {
      removed = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return removed;
    }

    let second_last = this.head;
    let previous;
    while (second_last.next) {
      previous = second_last;
      second_last = second_last.next;
      if (!second_last.next) {
        removed = second_last.val;
        this.tail = previous;
        this.tail.next = null;
        this.length -= 1;
        return removed;
      }
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    let removed;

    if (!this.head) {
      throw "list is empty";
    }

    if (!this.head.next) {
      removed = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return removed;
    }

    let next = this.head.next;
    if (next) {
      removed = this.head.val;
      this.head = next;
      this.length -= 1;
      return removed;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (!this.head) {
      throw "list is empty";
    }

    let prevNode = this.head;
    let prevIdx = 0;
    if (prevNode) {
      prevNode.idx = prevIdx;
      this.length = 1;
      while (prevNode.next) {
        prevNode = prevNode.next;
        prevNode.idx = prevIdx += 1;
        this.length += 1;
      }

      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.idx === idx) {
          return currentNode.val;
        } else {
          currentNode = currentNode.next;
        }

        if (!currentNode) {
          throw "index not found";
        }
      }
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (!this.head) {
      throw "list is empty";
    }

    let prevNode = this.head;
    let prevIdx = 0;
    if (prevNode) {
      prevNode.idx = prevIdx;
      this.length = 1;
      while (prevNode.next) {
        prevNode = prevNode.next;
        prevNode.idx = prevIdx += 1;
        this.length += 1;
      }

      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.idx === idx) {
          currentNode.val = val;
          break;
        } else {
          currentNode = currentNode.next;
        }

        if (!currentNode) {
          throw "index not found";
        }
      }
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let newNode = new Node(val);

    //if empty list
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length = 1;
      newNode.idx = 0;
      return;
    }

    let prevNode = this.head;
    let prevIdx = 0;
    //add indexes first
    if (prevNode) {
      prevNode.idx = prevIdx;
      this.length = 1;
      while (prevNode.next) {
        prevNode = prevNode.next;
        prevNode.idx = prevIdx += 1;
        this.length += 1;
      }

      let previousNode = this.head;
      let nextNode;
      while (previousNode) {
        //find index and add newNode
        //if add at the front
        if (previousNode.idx === idx && idx === 0) {
          this.head = newNode;
          this.head.next = previousNode;
          this.length += 1;
          break;
        } //if add at the back
        else if (previousNode.idx + 1 === idx && idx === this.tail.idx + 1) {
          this.tail.next = newNode;
          this.tail = newNode;
          this.length += 1;
          break;
        }
        //if add in between
        else if (previousNode.idx + 1 === idx && idx != 0) {
          nextNode = previousNode.next;
          previousNode.next = newNode;
          previousNode.next.next = nextNode;
          this.length += 1;
          break;
        } else {
          previousNode = previousNode.next;
        }

        if (!previousNode) {
          throw "index not found";
        }
      }
    }

    //reset index
    let newIdx = 0;
    let currentNode = this.head;
    if (currentNode) {
      while (currentNode.next) {
        currentNode = currentNode.next;
        currentNode.idx = newIdx += 1;
      }
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let removed;
    if (!this.head) {
      throw "list is empty";
    }

    //remove only item in the list
    if (this.head.next === null) {
      removed = this.head.val;
      this.head = null;
      this.tail = null;
      this.length -= 1;
    }

    let prevNode = this.head;
    let prevIdx = 0;
    if (prevNode) {
      prevNode.idx = prevIdx;
      this.length = 1;
      while (prevNode.next) {
        prevNode = prevNode.next;
        prevNode.idx = prevIdx += 1;
        this.length += 1;
      }

      let currentNode = this.head;
      let next;
      while (currentNode) {
        //remove the first node
        if (currentNode.idx === idx && idx === 0) {
          removed = currentNode.val;
          this.head = currentNode.next;
          this.length -= 1;
          break;
        } //remove in between
        else if (currentNode.idx + 1 === idx && this.tail.idx !== idx) {
          removed = currentNode.next.val;
          next = currentNode.next.next;
          currentNode.next = next;
          this.length -= 1;
          break;
        } //remove the last item
        else if (currentNode.idx + 1 === idx && this.tail.idx === idx) {
          removed = this.tail.val;
          this.tail = currentNode;
          this.tail.next = null;
          this.length -= 1;
          break;
        } else {
          currentNode = currentNode.next;
        }

        if (!currentNode) {
          throw "index not found";
        }
      }
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) {
      return 0;
    }

    this.length = 0;
    let sum = 0;
    let currentNode = this.head;
    while (currentNode) {
      currentNode;
      sum += currentNode.val;
      this.length += 1;
      currentNode = currentNode.next;
      if (!currentNode) {
        break;
      }
    }
    return sum / this.length;
  }
}

module.exports = LinkedList;
