//Until now, we've look at 2 types of linked lists-
//  one that is linear, but be can only move forwards. 1->2->3
//  one that is circular, but we can still only use .next to move forwards. 1->2->[1->2->[1->2->...]]

//Now we will look at a doubly linked linked list, which is linked both backwards and forwads, SO WE CAN MOVE
//  BACWARDS AS WELL

//to implement this, we first of all need a new node class, with a third property- prev, to store the previous
//  node

class NodeForDoublyLinkedList<T> {
    protected _value: T; //create value propety
    protected _next: NodeForDoublyLinkedList<T> | null = null; //next property
    protected _prev: NodeForDoublyLinkedList<T> | null = null; //prev property
    constructor(value: T) {
        this._value = value;
    }

    //now create getters and setters
    get value(): T {
        return this._value;
    }

    get next(): NodeForDoublyLinkedList<T> | null {
        return this._next;
    }

    get prev(): NodeForDoublyLinkedList<T> | null {
        return this._prev;
    }

    set value(value: T) {
        this._value = value;
    }

    set next(next: NodeForDoublyLinkedList<T> | null) {
        this._next = next;
    }

    set prev(prev: NodeForDoublyLinkedList<T> | null) {
        this._prev = prev;
    }
}

//now lets implement a doubly linked list class
class DoublyLinkedList<T> {
    //lets create the properties- head and tail
    _head: NodeForDoublyLinkedList<T> | null = null;
    _tail: NodeForDoublyLinkedList<T> | null = null;

    //this time, we will also create a variable to store the length. this way, it will have O(1) TC rather than
    //  O(n) TC like last time
    _length = 0;

    //create the constructor. we dont need to do anything here really
    constructor() { }

    //then create getters for head and tail
    get head(): NodeForDoublyLinkedList<T> | null {
        return this._head;
    }

    get tail(): NodeForDoublyLinkedList<T> | null {
        return this._tail;
    }

    get length(): number {
        return this._length;
    }

    //create setters too, but make it protected to that these properties cant directly be changed outside, to prevent
    //  bugs
    protected set head(head: NodeForDoublyLinkedList<T> | null) {
        this._head = head;
    }

    protected set tail(tail: NodeForDoublyLinkedList<T> | null) {
        this._tail = tail;
    }

    protected set length(length) {
        this._length = length;
    }

    //now create some basic methods. such as add first
    //we will take a value as param, and create a node out of it. which we will then add to start of list
    addFirst(value: T) {
        //first of all, increase the length by 1, as a new element is added
        this.length++;

        //if head is null, it means the list is empty. so our work is easier here
        if (this.head === null) {
            //if the list is empty, it means we are adding our first node. so this will be both our head and
            //  tail, as this is the first AND last item
            //we dont have to make any changes to the next and prev, they will remain null
            this.head = this.tail = new NodeForDoublyLinkedList(value);
            return;
        }
        //else it means that theres already one or more elements. either way, the process is the same
        //to add an item BEFORE the current head, we will first create that item as a node
        let newNode = new NodeForDoublyLinkedList<T>(value);

        //then we will set the prev of the head to this new node, since we are adding it BEFORE that node
        this.head.prev = newNode;
        //and we will set the next of the new item to the head, since head comes AFTER this new node
        newNode.next = this.head;

        //finally, we will make the nextNode the new head
        this.head = newNode;
    }

    //now, we will write a method to print the doublyLinkedList
    print() {
        //the process of printing is the same as normal LL, create a pointer that goes through the list, and while
        //  it is not equal to null, add the items to a string then print
        let pointer = this.head;
        let printStr = "";

        while (pointer !== null) {
            printStr += pointer.value + " <-> ";
            pointer = pointer.next;
        }

        //at the end, take a substring to remove the extra " <-> " at the end, and print it
        console.log(printStr.substring(0, printStr.length - 5));
    }

    //lastly, we will also write a method to remove a node, we will write remove last
    removeLast() {
        //if there are no elements in the list, just return
        if (this.tail === null) return;

        //since we will DELETE an element, reduce the length by 1
        this.length--;

        //if there is only 1 element
        if (this.tail.prev === null) {
            this.head = null; //then set both head and tail to null
            this.tail = null; //basically delete the only node
            return; //and return
        }

        //else, to remove the last element, we will go to the tail (the last element), and go to its prev (2nd last
        // element).
        let lastElement = this.tail;
        let secondLastElement = this.tail.prev;

        //we will set the next of the 2nd last element to null. this way, it no longer points to tail
        secondLastElement.next = null;

        //AND we will set the prev of the tail to null. this way the tail also no longer points to 2nd last element
        lastElement.prev = null;

        //lastly, make the 2nd last element the new tail
        this.tail = secondLastElement;
    }
}