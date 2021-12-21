
public class MaxStack {

    final int MAXIMUM_CALLS_TO_STACK = (int) Math.pow(10, 4);
    int indexMaxElement;
    int indexTop;
    int[] container;

    /*
    The problem statement guaranatees that there will be at least one element 
    in the stack when pop, top, peekMax, or popMax is called.
     */
    public MaxStack() {
        container = new int[MAXIMUM_CALLS_TO_STACK];
        indexTop = -1;
    }

    public void push(int x) {
        container[++indexTop] = x;
        if (indexTop > 0 && container[indexMaxElement] <= x) {
            indexMaxElement = indexTop;
        }
    }

    public int pop() {
        if (indexMaxElement == indexTop) {
            update_indexMaxElement();
        }
        return container[indexTop--];
    }

    public int top() {
        return container[indexTop];
    }

    public int peekMax() {
        return container[indexMaxElement];
    }

    public int popMax() {

        int maxElement = container[indexMaxElement];

        //Move all elements after 'indexMaxElement' one step to the left.
        while (indexMaxElement < indexTop) {
            container[indexMaxElement] = container[++indexMaxElement];
        }
        update_indexMaxElement();
        indexTop--;
        return maxElement;
    }

    public void update_indexMaxElement() {
        indexMaxElement = 0;
        int indexNextMaxElement = 0;
        while (indexNextMaxElement < indexTop) {
            if (container[indexNextMaxElement] >= container[indexMaxElement]) {
                indexMaxElement = indexNextMaxElement;
            }
            indexNextMaxElement++;
        }
    }
}
