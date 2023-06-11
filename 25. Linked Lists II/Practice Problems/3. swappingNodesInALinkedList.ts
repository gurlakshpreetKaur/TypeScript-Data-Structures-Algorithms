//Q:We have a linked list and two keys i and j, swap the 2 nodes with values i and j. nodes should be swapped by
//  LINKS and NOT VALUES. assume that all items in the list are distinct.
//
//Eg: 1->2->3->4->5, i = 2, k = 5
//      output: 1->5->3->4->2
//      swap the 2 nodes.
//
//to solve this, an obvious thing is to remember that we can only modify the NEXT of each node. so each time,
//  we will need to keep track of the the node BEFORE the key nodes, and also the node AFTER the key nodes.

function swapNodesWithValue<T>(list: NodeForLinkedList<T>, i: number, j: number) {
    if (i === j) return;

    //first, create variables to store the next and prev of keys
    let beforeI: NodeForLinkedList<T> | null = null;
    let iNode: NodeForLinkedList<T> | null = null;
    let afterI: NodeForLinkedList<T> | null = null;
    let beforeJ: NodeForLinkedList<T> | null = null;
    let jNode: NodeForLinkedList<T> | null = null;
    let afterJ: NodeForLinkedList<T> | null = null;

    //we will use these to loop over the list. we also need to keep track of the node before the current node.
    let pointer: NodeForLinkedList<T> | null = list;
    let nodeBefore: NodeForLinkedList<T> | null = null;

    //while we are still in the list
    while (pointer !== null) {
        //if value of pointer is equal to i
        if (pointer.value === i) {
            //then set the variable values.
            beforeI = nodeBefore; //before i is equal to the node before.
            iNode = pointer; //iNode is the currentNode
            afterI = pointer.next; //and afterI is the node after
        } else if (pointer.value === j) { //same procedure with pointer.value===j
            beforeJ = nodeBefore;
            jNode = pointer;
            afterJ = pointer.next;
        }
        nodeBefore = pointer;
        pointer = pointer.next;
    }

    //this is a special case. if the key node is the head node.
    if (beforeI === null && jNode !== null) {
        //then break the list and move around the parts to swap the nodes.
        //i spent over an hour figuring this out i have no idea how to explain it honestly
        beforeJ!.next = null;
        jNode.next = list.next;
        iNode!.next = null;
        let pointer = jNode;
        while (pointer !== null && pointer.next !== null) {
            pointer = pointer.next;
        }
        pointer.next = iNode;
        pointer.next!.next = afterJ;
        return jNode; //return jNode it has the solution
    }

    //this is the easy part, just swap the nexts
    jNode!.next = afterI;
    beforeI!.next = jNode;
    iNode!.next = afterJ;
    beforeJ!.next = iNode;
    return list; //just return list
}

//TC: O(n) linear loops
//SC: O(1) references stored