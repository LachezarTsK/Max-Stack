
import java.util.Stack;
import java.util.TreeMap;

public class MaxStack {

    private final CustomizedStack<Integer> customizedStack;
    private final TreeMap<Integer, Stack<Node>> valuesToStackNodes;

    public MaxStack() {
        customizedStack = new CustomizedStack<>();
        valuesToStackNodes = new TreeMap<>();
    }

    public void push(int value) {
        customizedStack.addFirst(value);
        valuesToStackNodes.putIfAbsent(value, new Stack<>());
        valuesToStackNodes.get(value).push(customizedStack.peekFirst());
    }

    public int pop() {
        int popValue = customizedStack.removeFirst().value;
        valuesToStackNodes.get(popValue).pop();

        if (valuesToStackNodes.get(popValue).isEmpty()) {
            valuesToStackNodes.remove(popValue);
        }
        return popValue;
    }

    public int top() {
        return customizedStack.peekFirst().value;
    }

    public int peekMax() {
        return valuesToStackNodes.lastKey();
    }

    public int popMax() {
        int maxValue = valuesToStackNodes.lastKey();
        customizedStack.removeNode(valuesToStackNodes.get(maxValue).pop());

        if (valuesToStackNodes.get(maxValue).isEmpty()) {
            valuesToStackNodes.remove(maxValue);
        }
        return maxValue;
    }
}

class Node<T> {

    T value;
    Node previous;
    Node next;

    Node(T value) {
        this.value = value;
    }
}

class CustomizedStack<T> {

    int size;
    Node<T> head;

    void addFirst(T value) {
        Node nodeToAdd = new Node(value);
        if (size++ == 0) {
            this.head = nodeToAdd;
            return;
        }

        Node nodeAfterHead = head;
        head = nodeToAdd;
        head.next = nodeAfterHead;
        nodeAfterHead.previous = head;
    }

    Node<T> removeFirst() {
        if (size == 0) {
            return head;
        }

        --size;
        Node nodeToRemove = head;
        head = head.next;
        if (head != null) {
            head.previous = null;
        }
        return nodeToRemove;
    }

    Node<T> peekFirst() {
        return head;
    }

    void removeNode(Node<T> node) {
        if (size == 0) {
            return;
        }
        if (node == head) {
            removeFirst();
            return;
        }

        --size;
        if (node.next != null) {
            node.next.previous = node.previous;
        }
        node.previous.next = node.next;
    }
}
