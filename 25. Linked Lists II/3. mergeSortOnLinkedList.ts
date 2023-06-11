//leetCode link: https://leetcode.com/problems/sort-list/
//
//Q:Given the head of a linked list, return the list after sorting it in ascending order.
//
//We already know how to perform merge sort on arrays, as seen in divide and conquer. but how do we do it on LLs?
//Look at the comments.

function mergeSortOnLL(head: NodeForLinkedList<number>): NodeForLinkedList<number> {
    if (head.next === null) return head;
    //first, divide the input into 2
    //how do we divide a list into 2?
    //if we simply get the node before middle node, and set its next to null, then the list will be divided into 2
    //to get the middle node, we will write a helper function. we already know how to do this using the fast-slow
    //  approach
    function beforeMiddleNode<T>(h: NodeForLinkedList<T>): NodeForLinkedList<T> {
        //use slow fast approach
        let slow: NodeForLinkedList<T> | null = h;
        let fast: NodeForLinkedList<T> | null = h;

        //modify while condition so that we get the node BEFORE the middle node
        while (fast.next !== null && fast.next.next !== null) {
            slow = slow!.next;
            fast = fast.next.next;
        }
        return slow!;
    }

    //to split into 2, first store node before middle node in a variable
    let nodeBeforeMidNode = beforeMiddleNode(head);

    //then get its next. basically this way we get the middle node
    let secondHalf = nodeBeforeMidNode.next;

    //then set next of node before middle node to null, so that they detatch and split into two
    nodeBeforeMidNode.next = null;

    //Eg: 1 -> 2 -> 3 -> 4 > 5
    //         ^ node before mid node   store in a variable
    //              ^ mid node
    // when we set next of the node before mid to null, this happens-
    // 1 -> 2 -> 3 -> 4 > 5
    //      becomes
    //            1 -> 2   3 -> 4 -> 5
    //           |_____|  |__________|
    //nodeBeforeMidNode     secondHalf
    //Now we can perform merge sort on these halves

    //write the murge function which takes 2 sorted node heads and combines them into 1 and returns it
    function merge(a: NodeForLinkedList<number>, b: NodeForLinkedList<number>): NodeForLinkedList<number> {
        //create solution node, and set it to null initially
        let sol: NodeForLinkedList<number> | null = null;

        //first of all, create the node using the smaller value out of the 2 sorted nodes. this is so that we
        //  get started with a node, and dont just have sol as null
        if (a.value > b.value) {
            sol = new NodeForLinkedList(b.value);
            b = b.next!;
        } else {
            sol = new NodeForLinkedList(a.value);
            a = a.next!;
        }

        //create a navigator, which is just a copy of sol. this is similar to how we've used currentNode to travel
        //  through the node head.
        let navigator: NodeForLinkedList<number> = sol;

        //write a loop that runs which either a or b is non-null
        while (a !== null || b !== null) {
            //this condition would basically mean that b should be added to the solution
            if ((b !== null) && ((a === null) || (b.value < a.value))) {
                //so set the next of navigator to a new node with b's value
                navigator.next = new NodeForLinkedList(b.value);
                //and move b to the next node
                b = b.next!;

            } else { //else it means that the value of a needs to be added
                //so add a new node with a as value
                navigator.next = new NodeForLinkedList(a.value);
                //and move a to the next node
                a = a.next!;
            }

            //in each iteration, we would also need to move navigator to its next, so that the next time the node
            //  is added AFTER the current node
            navigator = navigator.next;
        }

        //at the end, return sol
        return sol;
    }

    //recursively call merge function on recursively sorted halves
    return merge(mergeSortOnLL(head), mergeSortOnLL(secondHalf!));
}

//TC: O(n log n)
//SC: O(n)   stack + sol list

//Try it out-
//create a list node    1 -> 4 -> 3 -> 1
let newList = new NodeForLinkedList(1);
newList.next = new NodeForLinkedList(4);
newList.next.next = new NodeForLinkedList(3);
newList.next.next.next = new NodeForLinkedList(-1);

//sort it and console.log
console.log(mergeSortOnLL(newList)); //output: -1 -> 1 -> 3 -> 4