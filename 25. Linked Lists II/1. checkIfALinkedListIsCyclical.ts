//leetCode link: https://leetcode.com/problems/linked-list-cycle/
//
//Okay, so until now, we've only seen linear linked lists, like this-
//      1 -> 2 -> 3 -> 4 -> 5
//But actually, linked lists can also be cyclical. this means that the last node does not point to null, and instead
//      points to another node in the list, like this-
//      1 -> 2 -> 3 -> 4 -> 5
//                ^         v
//                ^  <- <- <
//      This way, the list becomes circular. And this is sort of an issue if we don't know that a list is cyclical.
//      Because in the previous chapter, ALL OUR CODE PRETTY MUCH DEPENDED ON THE LAST NODE POINTING TO NULL.

//So we need to be able to detect if a list is cyclical or not. So how do we detect that?

//Well for this we use Floyd's Cycle Detecting Algorithm, also called the hare-tortoise or fast-slow algorithm.
//If you remember, we used this before to find the middle node of a linked list.
//
//Well the interesting thing about it is that we only ever find the middle node using this algorithm if the list
//  is linear. When the list is circular, the pointers will keep on traversing UNTIL they both meet, which is
//  how we will know that the list is circular. To summarise, in a linear list, the pointers will never meet,
//  but in a circular list, they will, always, at some point, meet.

//this time rather than a method, we will write a function which takes the head node as a param. the head node will
//  point to all other nodes in the list, so this suffices. we will return true if list is cyclical, else false.
//
//WHY DOES THIS WORK?
//
//  okay so pointer one increasing by 1 node each time
//  and pointer 2 increases by 2 nodes each time
//  so lets track them for a few iterations
//  
//      iter 1:
//          slow = 0,   fast = 0      gap = 0
//      iter 2:
//          slow = 1,   fast = 2      gap = 1
//      iter 3:
//          slow = 2,   fast = 4      gap = 2
//      iter 4:
//          slow = 3,   fast = 6      gap = 3
//                                    so as you can see, the gap between slow and fast is equal to slow
//                                          same things as 2x-x = x.
//  this way, fast will always be at 2*slow node. and if fast, at some point, points to null, we know the list is
//          is finite BUT if it doesnt end, then fast will again come back to a point in the list, since this
//          means the list is cyclical.
//          fast and slow being at same node means not only that the difference between them is 0, but also that
//              the distance between them is equal to the length of the loop from the OTHER side. This is confusing,
//              yes, so watch this- https://www.youtube.com/watch?v=354J83hX7RI 
//                               or https://www.youtube.com/watch?v=Fj1ywT9ETQk
//

function isListCyclical<T>(head: NodeForLinkedList<T>): boolean {
    //create slow and fast pointers
    let slow: NodeForLinkedList<T> | null = head; //start at head
    let fast: NodeForLinkedList<T> | null = head; //start at head

    while (fast !== null && fast.next != null) { //with this condition, if the list is linear, the loop will
        //   eventually break and false will be returned.

        //we need to increment BEFORE, so that the head node doesnt get compared with itself
        slow = slow!.next; //+1
        fast = fast.next.next; //+2

        if (slow === fast) //if pointers are at same block
            return true; //return true, as it means the list MUST be cyclical
        //else the loop will continue until the pointers meet
    }

    //if loop broke, then list is linear, not cyclical, so return false
    return false;
}


//TC: O(n) the loop is linear and will traverse the LL at most once
//SC: O(1) we use constant space here

//To try out the code-
//  we need a cyclical list to try it out
//  so we will make an intentionally cycilar node head
let head = new NodeForLinkedList<number>(1);
head.next = new NodeForLinkedList<number>(2);
head.next.next = new NodeForLinkedList<number>(3);
head.next.next.next = head; //point a node back to head
//  So this list looks like-
//      1 -> 2 -> 3
//      ^         v
//      ^ < < < < <

console.log(isListCyclical(head));
//if you call this same code but remove last line of creating list in which it is made recursive, it will print
//   false