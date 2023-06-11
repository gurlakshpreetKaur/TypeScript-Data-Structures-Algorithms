//we know how to reverse a LL, lets look at how to reverse a DLL.
//
//for this, I will create an extension of DLL class and create a new method.

class ReversableDDL<T> extends DoublyLinkedList<T> {
    constructor() { super(); } //just call the super function in constructor, dont need to do anything else

    reverse() { //this method will reverse the DLL
        //to reverse the DLL, we will follow pretty much the same process as reversing a LL, except this time we
        //  will also update prev property each time

        let next: NodeForDoublyLinkedList<T> | null = null; //create next and curr and prev
        let curr = this.head;
        let prev: NodeForDoublyLinkedList<T> | null = null;

        while (curr !== null) { //same condition
            next = curr.next; //store the next node
            curr.next = prev; //update both next and prev
            curr.prev = next;

            prev = curr;
            curr = next;
        }

        //at the end, reverse tail and head
        this.tail = this.head;
        this.head = prev;
    }
}

//TC: O(n)
//SC: O(1)