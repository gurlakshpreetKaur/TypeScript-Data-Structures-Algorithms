//leetCode link: https://leetcode.com/problems/intersection-of-two-linked-lists/
//
//Q:Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect.
//  If the two linked lists have no intersection at all, return null.
//  Note that the linked lists must retain their original structure after the function returns.
//Eg:   1➡️2➡️3➡️4➡️5➡️6➡️7
//                  ↗️
//     11➡️12➡️13↗️
//
//  The 2 linked lists merge at node 5, so output will be a reference to that node
//
//To do this, we will take the following approach-
//1. the easy one- look at the constraints given for the problem.
//          1 <= Node.val <= 10^5
//      This means that for any given node, its value will always be +ve, BUT, if we set the values to a negative
//          number each time, we will know which nodes have already been visited, so that we can find the merged
//          nodes. But we aren't allowed to permanently modify the list, so we will make a copy.
//  Eg: input: head1: 1->2->3->4
//             head2: 5->6-^
//        we will make duplicates of both nodes
//              h1 = 1->2->3->4
//              h2 = 5->6-^
//          now, we will loop over h1 and multiply each item by -1
//              h1 = (-1)->(-2)->(-3)->(-4)
//              h2 =         5->6-^
//          now, when we loop over h2, if we find ANY negative number, we will mutiply that node by -1 (to make
//              it positive again) and return it.

function getIntersectionNode(headA: NodeForLinkedList<number> | null, headB: NodeForLinkedList<number> | null): NodeForLinkedList<number> | null {

    //create a pointer for the first node head
    let h1Pointer = headA;
    //loop over the first node head using the pointer
    while (h1Pointer !== null) {
        //and multiply each node by -1, to set it to its own negative counterpart.
        h1Pointer.value = h1Pointer.value * -1;
        h1Pointer = h1Pointer.next;
    }

    //then create a sol variable, to store the solution node, and initialize with null
    let sol: NodeForLinkedList<number> | null = null;

    //create a pointer for second node head
    let h2Pointer = headB;
    //and loop over it
    while (h2Pointer !== null) {
        //if the value of current node is negative
        if (h2Pointer.value < 0) {
            //then make it positive (resetting the common list nodes to their original form)
            h2Pointer.value *= -1;
            //then if the solution is null, it means it is the first negative node, so it is the solution node where the intersection occurs
            if (sol === null) sol = h2Pointer;
        }
        h2Pointer = h2Pointer.next;
    }

    //lastly, recall that we only set the COMMON NODES to their positive values. so now we will loop through first node head, and set all the nodes with negative values to positive values. these nodes will all be consecutive, hence the while condition
    h1Pointer = headA;
    while (h1Pointer !== null && h1Pointer.value < 0) {
        h1Pointer.value *= -1;
        h1Pointer = h1Pointer.next;
    }

    //return sol. if there was no intersection, sol would be null, so null would be returned, else the intersection node would be returned.
    return sol;
};

//TC: O(n)   we only used linear loop
//SC: O(1)   we did create pointers, but they are only a reference to the original node, so they dont take up any
//           new space in memory

//To test this-
//create a merged node head as follows-
let node1 = new NodeForLinkedList(1);
node1.next = new NodeForLinkedList(2);
node1.next.next = new NodeForLinkedList(3);
node1.next.next.next = new NodeForLinkedList(4);
node1.next.next.next.next = new NodeForLinkedList(5);
node1.next.next.next.next.next = new NodeForLinkedList(6);

let node2 = new NodeForLinkedList(11);
node2.next = new NodeForLinkedList(12);
node2.next.next = new NodeForLinkedList(13);
node2.next.next.next = node1.next.next; //merge the lists like this

let sol = getIntersectionNode(node1, node2);
console.log(sol === null ? "There is no intersection" : ("Intersection at node " + sol.value));