//Okay, so now that we know how to identify whether or not a linked list is circular, let's think of a way to GET
//  RID OF THE CYCLE, since cycles can be annoying.
//
//To cut-off the loop, we simply need to set the next of the last node to null.
//  eg: if LL is
//          1 -> 2 -> 3 -> 4
//                    ^    v
//                      <-
//                           Then the end loop is 4. the list is cyclical because it is pointing to 3.
//                              so if we make it point to null, the cycle will break.
//          we will get this-
//              1 -> 2 -> 3 -> 4
//
//To do this, we first need to FIND the last node. so how do we find the last node in a list that is circular?
//  We will use the fast-slow algorithm + some more logic.
//
//Our first step, will obviously to identify the if the LL is even cyclical in the first place. For that, use
//  fast-slow algorithm, that we used in the previous file. Now, how do we find the last node?
//Read method 3 given here: https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/
//
//With that, we know that the index of start node of the cycle will always be equal to the node where fast and
//  slow met / 2.
//
//With that in find, lets write a function to find and remove cycle in LL
// class NodeForLinkedList<T> {}
function removeCycle<T>(head: NodeForLinkedList<T>) {
    //first, check if a cycle exists. if it isnt, return. we will not use the function that we wrote before because
    //  we will need these pointers laters. you could modify the function to return the pointers, but i'll just
    //  write the function here.
    let slow: NodeForLinkedList<T> | null = head;
    let fast: NodeForLinkedList<T> | null = head;

    //we will create a third variable- cycle, to keep track of whether or not the list is cyclical
    let cycle = false; //init with false

    while (fast !== null && fast.next !== null) {
        slow = slow!.next; //+1
        fast = fast.next.next; //+2
        if (fast === slow) {
            cycle = true;//if fast becomes equal to slow, set cycle to true and break, so that we have our pointers
            break;
        }
    }

    if (!cycle) return; //if list isnt cyclical, just return

    //first we will take care of a special case
    //special corner case: if the pointers meet at head
    if (fast === head) {
        //it will always mean that head is the start of loop. so the last node is pointing to head.
        //so in this case, we will go over to the node before head, and set its next to null
        //for this we will use slow pointer
        while (slow!.next !== head) {
            slow = slow?.next ?? null; //we used ?? to get rid of a TS error
        } //use this to reach last node

        slow!.next = null; //and set its next to null
        return;
    }

    //if we reached here, then the list must be cyclical.
    //now, we will use the fast and slow pointers to find the LAST node.
    //for this, we will first reset the fast pointer OR slow pointer, either one to head. I'll use the fast pointer
    fast = head;

    //now run a loop, while slow.next !== fast.next. this way, we are basically going to break the loop RIGHT before
    //  the start of loop, so that we can set that to null.
    while (slow !== null && fast !== null && slow.next !== fast.next) { //here I just added the slow !== null && 
        //  fast !== null conditions to get rid of TS errors

        slow = slow.next; //+1
        fast = fast.next; //+1
    }

    //when the loop breaks, it means the slow pointer is at the last node.
    //so we will just set its next to null, and break the cycle
    slow!.next = null;
}

//TC: O(n)
//SC: O(1)

//To try out the code-
//  we need a cyclical list to try it out
//  so we will make an intentionally cycilar node head
let headHere = new NodeForLinkedList<number>(1);
headHere.next = new NodeForLinkedList<number>(2);
headHere.next.next = new NodeForLinkedList<number>(3);
headHere.next.next.next = headHere; //point a node back to head
//  So this list looks like-
//      1 -> 2 -> 3
//      ^         v
//      ^ < < < < <

console.log(headHere); //will not even print, in TS it would give an error that the structure is recursive.
removeCycle(headHere);
console.log(headHere); //will print without cycle