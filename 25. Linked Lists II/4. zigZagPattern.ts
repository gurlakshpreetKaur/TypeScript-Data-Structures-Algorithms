//Q:Given a linked list, reorder it such that the left-most and right-most elements alternate.
//  That is, if the linked list is in form L(1)->L(2)->L(3)->L(4)...->L(n), reorder it such that it is in form
//      L(1)->L(n)->L(2)->L(n-1)...
//Eg: 1->2->3->4->5
//  Output: 1->5->2->4->3

//we will return the modified version.
function zigZag<T>(head: NodeForLinkedList<T>): NodeForLinkedList<T> {
    //what we basically do when doing the zig-zag pattern, is that we divide the list into 2 halves, and reverse
    //  the 2nd half.
    //eg: 1->2->3->4->5
    //    1st half = 1->2->3
    //    2nd half = 4->5
    //    reversed 2nd half = 5->4
    //      now, we will go to heads of both halves, and loop over them and merge them
    //      1    2    3
    //        5    4
    //      As you can, when we combine these 2, we get
    //      1->5->2->4->3
    //      which is the correct solution
    //so this will be our approach

    //first, lets a function to get middle node, using the fast-slow algorithm, infact actually we'll get the
    //  node BEFORE the middle node, so that we can divide it into 2 (same as merge sort).
    function getNodeBeforeMiddleNode(h: NodeForLinkedList<T>): NodeForLinkedList<T> {
        if (h.next === null || h.next.next === null) return h; //if theres only one or 2 elements in the list,
        //  we can just return the list as it is.

        let fast: NodeForLinkedList<T> | null = h;
        let slow = h;
        while (fast !== null && fast.next !== null && fast.next.next) {
            slow = slow.next!;
            fast = fast.next.next;
        }

        return slow;
    }

    //now use that to get the node before middle node
    let nodeBeforeMiddleNode = getNodeBeforeMiddleNode(head);

    //now use this to get the mid noded
    let midNode = nodeBeforeMiddleNode.next;

    //and now set the next of nodeBeforeMiddleNode to null, to divide it into 2
    nodeBeforeMiddleNode.next = null;

    //now reverse midNode, to get reversed 2nd half
    let prev: NodeForLinkedList<T> | null = null;
    let curr: NodeForLinkedList<T> | null = midNode;
    let next: NodeForLinkedList<T> | null = null;

    while (curr !== null) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    //now we know that the prev variable stores the reverse, so we will use it later

    //now lets merge both
    let firstHalfPointer: NodeForLinkedList<T> | null = head;
    let secondHalfPointer: NodeForLinkedList<T> | null = prev; //using the prev variable

    let sol = new NodeForLinkedList(firstHalfPointer.value);
    let navigator = sol;
    firstHalfPointer = firstHalfPointer.next;
    if (secondHalfPointer !== null) { //this is to get rid of some TS errors
        navigator.next = new NodeForLinkedList(secondHalfPointer.value);
        navigator = navigator.next;
        secondHalfPointer = secondHalfPointer.next;
    }

    while (firstHalfPointer !== null || secondHalfPointer !== null) {
        //add 1 item from 2nd half, and 1 item from first half (we already initialzed sol with an item from first half)
        if (firstHalfPointer) {
            navigator.next = new NodeForLinkedList(firstHalfPointer.value);
            navigator = navigator.next;
            firstHalfPointer = firstHalfPointer.next;
        }
        if (secondHalfPointer) {
            navigator.next = new NodeForLinkedList(secondHalfPointer.value);
            navigator = navigator.next;
            secondHalfPointer = secondHalfPointer.next;
        }
    }

    return sol;
}

//TC: O(n)   all the loops are basically written in a way such that the entire list is traversed once
//SC: O(n)   the solution linked list