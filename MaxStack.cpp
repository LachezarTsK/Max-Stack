
#include<array>
using namespace std;


const int MAXIMUM_CALLS_TO_STACK = 10000;
int container[MAXIMUM_CALLS_TO_STACK] = { 0 };

class MaxStack {
public:

	int indexMaxElement;
	int indexTop;

	/*
	The problem statement guaranatees that there will be at least one element
	in the stack when pop, top, peekMax, or popMax is called.
	*/
	MaxStack() {
		indexMaxElement = 0;
		indexTop = -1;
	}

	void push(int x) {
		container[++indexTop] = x;
		if (indexTop > 0 && container[indexMaxElement] <= x) {
			indexMaxElement = indexTop;
		}
	}

	int pop() {
		if (indexMaxElement == indexTop) {
			update_indexMaxElement();
		}
		return container[indexTop--];
	}

	int top() {
		return container[indexTop];
	}

	int peekMax() {
		return container[indexMaxElement];
	}

	int popMax() {

		int maxElement = container[indexMaxElement];

		//Move all elements after 'indexMaxElement' one step to the left.
		while (indexMaxElement < indexTop) {
			container[indexMaxElement] = container[indexMaxElement + 1];
			++indexMaxElement;
		}

		update_indexMaxElement();
		indexTop--;
		return maxElement;
	}

	void update_indexMaxElement() {
		indexMaxElement = 0;
		int indexNextMaxElement = 0;
		while (indexNextMaxElement < indexTop) {
			if (container[indexNextMaxElement] >= container[indexMaxElement]) {
				indexMaxElement = indexNextMaxElement;
			}
			indexNextMaxElement++;
		}
	}
};
