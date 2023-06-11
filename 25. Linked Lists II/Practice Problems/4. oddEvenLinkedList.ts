//Q:Given an integer linked list, reorder it such that all the even elements appear before the odd elements, whilst
//      keeping the relative order of the items the same.
//Eg: 1->3->4->9->0
//      output: 4->0->1->3->9

//our approach will be simple, first we will store all value in distinct arrays, depending on whether they are
//  each even or odd. Then we will loop over the linked list and modify each value.

function oddEvenLinkedList(list: NodeForLinkedList<number>) {
    //create 2 arrays
    let even: number[] = [];
    let odd: number[] = [];

    //loop over the linked list
    for (let pointer: null | NodeForLinkedList<number> = list; pointer !== null; pointer = pointer.next)
        //if current item is even, add it to even array
        if (pointer.value % 2 === 0) even.push(pointer.value);
        //else add it to the odd array
        else odd.push(pointer.value);

    //now, to modify the list, create a pointer
    let pointer: NodeForLinkedList<number> | null = list;

    //now loop over the even array (since we want the even elements to come before odd elements)
    for (let i = 0; i < even.length && pointer !== null; i++, pointer = pointer.next) {
        //and modify each node
        pointer.value = even[i];
    }

    //lastly, loop over the even elements
    for (let i = 0; i < odd.length && pointer !== null; i++, pointer = pointer.next) {
        //and modify each node with that value
        pointer.value = odd[i];
    }
}

//this way, we maintain the relative order of nodes
//TC- O(n)   the loops
//SC- O(n)   the array