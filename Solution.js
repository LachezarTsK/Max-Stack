
const {PriorityQueue} = require('@datastructures-js/priority-queue');

var MaxStack = function () {
    this.customizedStack = new CustomizedStack();
    this.valuesToStackNodes = new Map();//Map<number, Node[]>
    this.maxHeapValues = new MaxPriorityQueue({compare: (x, y) => y - x});
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxStack.prototype.push = function (value) {
    this.customizedStack.addFirst(value);
    if (!this.valuesToStackNodes.has(value)) {
        this.valuesToStackNodes.set(value, []);
    }
    this.maxHeapValues.enqueue(value);
    this.valuesToStackNodes.get(value).push(this.customizedStack.peekFirst());
};

/**
 * @return {number}
 */
MaxStack.prototype.pop = function () {
    let popValue = this.customizedStack.removeFirst().value;
    this.valuesToStackNodes.get(popValue).pop();

    if (this.valuesToStackNodes.get(popValue).length === 0) {
        this.valuesToStackNodes.delete(popValue);
    }
    return popValue;
};

/**
 * @return {number}
 */
MaxStack.prototype.top = function () {
    return this.customizedStack.peekFirst().value;
};

/**
 * @return {number}
 */
MaxStack.prototype.peekMax = function () {
    while (!this.valuesToStackNodes.has(this.maxHeapValues.front())) {
        this.maxHeapValues.dequeue();
    }
    return this.maxHeapValues.front();
};

/**
 * @return {number}
 */
MaxStack.prototype.popMax = function () {
    while (!this.valuesToStackNodes.has(this.maxHeapValues.front())) {
        this.maxHeapValues.dequeue();
    }
    let maxValue = this.maxHeapValues.dequeue();
    let maxValueNode = this.valuesToStackNodes.get(maxValue).pop();
    this.customizedStack.removeNode(maxValueNode);

    if (this.valuesToStackNodes.get(maxValue).length === 0) {
        this.valuesToStackNodes.delete(maxValue);
    }
    return maxValue;
};



function Node(value) {
    this.value = value;
    this.previous = null;
    this.next = null;
}

class CustomizedStack {

    constructor() {
        this.size = 0;
        this.head = null;
    }

    addFirst(value) {
        let nodeToAdd = new Node(value);
        if (this.size++ === 0) {
            this.head = nodeToAdd;
            return;
        }

        let nodeAfterHead = this.head;
        this.head = nodeToAdd;
        this.head.next = nodeAfterHead;
        nodeAfterHead.previous = this.head;
    }

    removeFirst() {
        if (this.size === 0) {
            return this.head;
        }

        --this.size;
        let nodeToRemove = this.head;
        this.head = this.head.next;
        if (this.head !== null) {
            this.head.previous = null;
        }
        return nodeToRemove;
    }

    peekFirst() {
        return this.head;
    }

    removeNode(node) {
        if (this.size === 0) {
            return;
        }
        if (node === this.head) {
            this.removeFirst();
            return;
        }

        --this.size;
        if (node.next !== null) {
            node.next.previous = node.previous;
        }
        node.previous.next = node.next;
    }
}
