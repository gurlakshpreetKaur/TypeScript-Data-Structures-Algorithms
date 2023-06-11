//Q:Given the head node of a linked list, and 2 integers M and N, write a code that deletes N nodes after traversing
//  M nodes, and repeat until the end of the list.
//  Eg: 1->2->3->4->5->6->7->8, M = 2, N = 2
//      traverse 2 nodes and delete 2 nodes each time
//      1->2->     5->6
//      output: 1->2->5->6
//

function deleteNNodesAfterMNodes<T>(list: NodeForLinkedList<T>, m: number, n: number) {
    //okay, first we will create a pointer
    let pointer: NodeForLinkedList<T> | null = list;

    //then write a while loop, that runs while pointer is not null
    while (pointer !== null) {
        //we will traverse m nodes. this is the step where we're skipping over m-1 nodes. this way, we can store
        //  the mth node.
        for (let i = 0; i < m - 1 && pointer !== null; i++) {
            pointer = pointer.next;
        }

        //then store the current node in a variable. this is the node after which which n nodes will be deleted
        //so this is like if in 1->2->3->4 m=2 and n=2, then current node will store the (m-1)th node, that is,
        //  node 2. this means the nodes 2 and before are safe, and wont be deleted. 
        let currentNode = pointer;

        //then traverse the next n nodes, to get the node BEFORE which the nodes will be deleted
        //so this is basically like determining which nodes will be deleted
        for (let i = 0; i <= n && pointer !== null; i++) {
            pointer = pointer.next;
        }

        //and set current node's next to pointer, so basically we removed the middle nodes from the list
        if (currentNode !== null) currentNode.next = pointer;
    }
}

//TC: O(n)  we will go to each node exactly once, as the pointer var remains consistent
//SC: O(1)  only references we stored, no new space was allocated.

//try out the function-
//first create a node head and log it
let node = new NodeForLinkedList(1);
node.next = new NodeForLinkedList(2);
node.next.next = new NodeForLinkedList(3);
node.next.next.next = new NodeForLinkedList(4);
node.next.next.next.next = new NodeForLinkedList(5);
node.next.next.next.next.next = new NodeForLinkedList(6);
node.next.next.next.next.next.next = new NodeForLinkedList(7);
node.next.next.next.next.next.next.next = new NodeForLinkedList(8);
console.log(node);

//call the function
deleteNNodesAfterMNodes(node, 3, 2)

//console log to node
console.log(node);