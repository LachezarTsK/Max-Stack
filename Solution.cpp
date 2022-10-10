
#include <memory>
using namespace std;

template <typename T> struct Node {
    T value;
    shared_ptr<Node<T>> previous{};
    shared_ptr<Node<T>> next{};

    Node() = default;
    explicit Node(T value) : value{value}{}
};

template <typename T> class CustomizedStack {
    
    size_t size{};
    shared_ptr<Node<T>> head{};

public:
    CustomizedStack() = default;

    void addFirst(T value) {
        shared_ptr<Node<T>> nodeToAdd = make_shared<Node<T >> (value);
        if (size++ == 0) {
            head = nodeToAdd;
            return;
        }
        
        shared_ptr<Node<T>> nodeAfterHead = head;
        head = nodeToAdd;
        head->next = nodeAfterHead;
        nodeAfterHead->previous = head;
    }

    shared_ptr<Node<T>> removeFirst() {
        if (size == 0) {
            return head;
        }

        --size;
        shared_ptr<Node<T>> nodeToRemove = head;
        head = head->next;
        if (head != nullptr) {
            head->previous = nullptr;
        }
        return nodeToRemove;
    }

    shared_ptr<Node<T>> peekFirst() const {
        return head;
    }

    void removeNode(shared_ptr<Node<T>> node) {
        if (size == 0) {
            return;
        }
        if (node == head) {
            removeFirst();
            return;
        }
        
        --size;
        if (node->next != nullptr) {
            node->next->previous = node->previous;
        }
        node->previous->next = node->next;
    }
};

class MaxStack {
    
    CustomizedStack<int> customizedStack;
    map<int, stack<shared_ptr<Node<int>>>> valuesToStackNodes;
    
public:
    MaxStack() = default;

    void push(int value) {
        customizedStack.addFirst(value);
        valuesToStackNodes[value].push(customizedStack.peekFirst());
    }

    int pop() {
        int popValue = customizedStack.peekFirst()->value;
        valuesToStackNodes[popValue].pop();

        if (valuesToStackNodes[popValue].empty()) {
            valuesToStackNodes.erase(popValue);
        }
        return customizedStack.removeFirst()->value;
    }

    int top() const {
        return customizedStack.peekFirst()->value;
    }

    int peekMax() const {
        return valuesToStackNodes.rbegin()->first;
    }

    int popMax() {
        int maxValue = valuesToStackNodes.rbegin()->first;
        customizedStack.removeNode(valuesToStackNodes[maxValue].top());
        valuesToStackNodes[maxValue].pop();

        if (valuesToStackNodes[maxValue].empty()) {
            valuesToStackNodes.erase(maxValue);
        }
        return maxValue;
    }
};
