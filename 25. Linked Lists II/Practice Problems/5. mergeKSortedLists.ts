//leetCode link: https://leetcode.com/problems/merge-k-sorted-lists/
//
//Q: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the 
//  linked-lists into one sorted linked-list and return it.
//
//We already know how to do this for arrays (as seen in Divide And Conquer). So we will use a similar procedure
//  for lists.
//
//Before we look at lists, however, let's go back to arrays, and think how we would merge k sorted arrays.
//  The thing is, managing k different lists at the same time can be difficult, so instead we will create a sort
//  of main array, which will store the final sorted array, and set it to the first of the k arrays.
//  then, we one by one we will merge the other arrays with it until all arrays are cleared.
//      Eg:  [1, 2, 3, 4], [3, 8, 9, 10], [5, 6, 7, 12]
//          first, create a main array and set it to the first of the 3 arrays
//              mainArray = [1, 2, 3, 4]
//          then merge second array with main array.
//              mainArray = [1, 2, 3, 4]
//              2nd array = [3, 8, 9, 10]
//              mergeArray = [1, 2, 3, 3, 4, 8, 9, 10]
//              mainArray = mergeArray
//                        = [1, 2, 3, 3, 4, 8, 9, 10]
//          then merge the 3rd array with the new main array
//              mainArray = [1, 2, 3, 3, 4, 8, 9, 10]
//              3rd array = [5, 6, 7, 12]
//              mergedArray = [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 12]
//         output: [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 12]
//
//We will follow a similar procedure with linked lists
//
function mergeSortedLists<T = number | string>(lists: NodeForLinkedList<T>[]): NodeForLinkedList<T> {
    //first, create a main list
    let mainList = lists[0];

    //now, run a for look over the list, from 1th element, as 0th element is already in the main array
    for (let i = 1; i < lists.length; i++) {
        //store current list in a variable
        let currentList = lists[i];
        //now, create seperate pointers for the main list and the current list
        let pointerForMain: NodeForLinkedList<T> | null = mainList;
        let pointerForCurrent: NodeForLinkedList<T> | null = currentList;

        //create a third pointer, a fresh node in which we will insert values. since we wrote our constructor such that
        //  an initial value is required, give it the smaller value out of the 2 nodes (since we want to sort in 
        //  ascending order).
        let resList = new NodeForLinkedList(pointerForMain.value < pointerForCurrent.value
            ? pointerForMain.value
            : pointerForCurrent.value);

        //update pointers because we already added one of the values
        if (pointerForMain.value < pointerForCurrent.value) pointerForMain = pointerForMain.next;
        else pointerForCurrent = pointerForCurrent.next;

        //create a pointer for reslist too
        let resPointer = resList;

        //run a loop while both are defined
        while (pointerForMain !== null && pointerForCurrent !== null) {
            //if pointer for main has the smaler value
            if (pointerForMain.value < pointerForCurrent.value) {
                //add pointer for main's value to resList
                resPointer.next = new NodeForLinkedList(pointerForMain.value);
                resPointer = resPointer.next; //update pointers
                pointerForMain = pointerForMain.next;
            } else {
                //else add pointer for current value
                resPointer.next = new NodeForLinkedList(pointerForCurrent.value);
                resPointer = resPointer.next; //update pointer
                pointerForCurrent = pointerForCurrent.next;
            }

            //if there's any left over nodes (caused by unequal nodes) add all the remaining to the end, since we
            //  know they are all sorted
            if (pointerForMain !== null) {
                resPointer.next = pointerForMain;
            } else {
                resPointer.next = pointerForCurrent;
            }

            //lastly set the main list to our merged result
            mainList = resList;
        }
    }

    //return main list
    return mainList;
}

//TC: O(k*n)   where k is length of input array, and m is the length of the node head with the most linked nodes
//                  due to the for loop which has a while loop in it
//SC: O(k*n)   where k is length of input array, and m is the length of the node head with the most linked nodes
//                  due to the res and main lists
//
//Try it out-
//create 3 sorted node heads and then call the function and console log it
let node1 = new NodeForLinkedList(1);
node1.next = new NodeForLinkedList(2);
node1.next.next = new NodeForLinkedList(3);
node1.next.next.next = new NodeForLinkedList(10);

let node2 = new NodeForLinkedList(2);
node2.next = new NodeForLinkedList(5);
node2.next.next = new NodeForLinkedList(6);
node2.next.next.next = new NodeForLinkedList(6.5);

let node3 = new NodeForLinkedList(0);
node3.next = new NodeForLinkedList(5.5);
node3.next.next = new NodeForLinkedList(10);

let RES = mergeSortedLists([node1, node2, node3]);
console.log(RES);