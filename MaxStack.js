
/*
 The problem statement guaranatees that there will be at least one element 
 in the stack when pop, top, peekMax, or popMax is called.
 */
var MaxStack = function () {

    this.indexMaxElement = 0;
    this.container = [];
    this.indexTop = -1;
    ;
};

/** 
 * @param {number} x
 * @return {void}
 */
MaxStack.prototype.push = function (x) {
    this.container[++this.indexTop] = x;
    if (this.indexTop > 0 && this.container[this.indexMaxElement] <= x) {
        this.indexMaxElement = this.indexTop;
    }
};

/**
 * @return {number}
 */
MaxStack.prototype.pop = function () {
    if (this.indexMaxElement === this.indexTop) {
        this.update_indexMaxElement();
    }
    return this.container[this.indexTop--];
};

/**
 * @return {number}
 */
MaxStack.prototype.top = function () {
    return this.container[this.indexTop];
};

/**
 * @return {number}
 */
MaxStack.prototype.peekMax = function () {
    return this.container[this.indexMaxElement];
};

/**
 * @return {number}
 */
MaxStack.prototype.popMax = function () {

    let maxElement = this.container[this.indexMaxElement];

    //Move all elements after 'indexMaxElement' one step to the left.
    while (this.indexMaxElement < this.indexTop) {
        this.container[this.indexMaxElement] = this.container[++this.indexMaxElement];
    }
    this.update_indexMaxElement();
    this.indexTop--;
    return maxElement;
};


MaxStack.prototype.update_indexMaxElement = function () {
    this.indexMaxElement = 0;
    let indexNextMaxElement = 0;
    while (indexNextMaxElement < this.indexTop) {
        if (this.container[indexNextMaxElement] >= this.container[this.indexMaxElement]) {
            this.indexMaxElement = indexNextMaxElement;
        }
        indexNextMaxElement++;
    }
};
