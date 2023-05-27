//The way a linked list works is that it is a group of nodes, which point to the next node.
//Like this-
//  1 -> 2 -> 3 -> 4 -> 5
//  ^node
// |______________________|
//           in its entirity, this is a linked list.
//
//Each node consists of a value, and a reference to the next node.
//  So for node1, the value is 1, and the next node is node2.
//  So on, until the last node, which doesnt have a next node, its next node is null.

//So lets create a class AND a function to create a linkedList.

//to create a linkedlist, first we need a node. we will give this class a generic, so that we are able to create
//  nodes with different data types as the value
class NodeForLinkedList<T> {
    //a node is made up of 2 properties- its value, and a pointer to the NEXT node. we will create the properties,
    //  and their values will be given in the constructor. by default, a node doesnt point to any other node
    //  so the next property will be null.
    //make both properties private as we will make getters and setters, this is just the "safe" way.
    private _value: T;
    private _next: NodeForLinkedList<T> | null = null;

    //use the generic in the constructor
    constructor(value: T) {
        //set the value property to the input value
        this._value = value;
    }

    //also create getters and setters for both properties
    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get next(): NodeForLinkedList<T> | null {
        return this._next;
    }

    set next(next: NodeForLinkedList<T> | null) {
        this._next = next;
    }
}

class LinkedList<T> {
    //a linkedList consists of a head, that is the first node of the list. using the head, we can trace any other
    //  node in the list, using the next pointer of each node. when the list is just created, and no items have been
    //  added, then head would be null, as the list is empty. so give it an initial value of null.
    private _head: NodeForLinkedList<T> | null = null;
    //the tail is the last node of the linked list. when linked list was just created, tail would also be null.
    //  so init tail with null as well.
    private _tail: NodeForLinkedList<T> | null = null;
    //both properties are private so that the getters and setters are used outside of the class to prevent bugs.

    //the constructor will take an optional headValue of type T. if this is given, we will make this our first item.
    //  we will write a method called addFirst (scroll down a bit) to add a node to the very starting of a list.
    //  we will use that so that if headValue is defined, we will make it the first node.
    constructor(headValue?: T) {
        if (headValue !== undefined) {
            this.addFirst(headValue);
        }
    }

    //create getters and setters
    get head(): NodeForLinkedList<T> | null {
        return this._head;
    }

    private set head(value: NodeForLinkedList<T> | null) { //we will make this method private so that it cant be used
        //  outside of the class, as this can lead to bugs.
        if (value === null) return;
        this._head = value;
    }

    get tail(): NodeForLinkedList<T> | null {
        return this._tail;
    }

    private set tail(value: NodeForLinkedList<T> | null) { //we will make this method private so that it cant be used
        //  outside of the class, as this can lead to bugs.
        if (value === null) return;
        this._tail = value;
    }

    //now, we will create methods to add elements to the linked list

    //this method is add first. what this does is it takes a value as param, we will create a new node with the
    //   param as VALUE, and make this node the head node. else we will just make the param node the head note.
    addFirst(value: T) {
        //first make a node from the param, then make it the head node
        let newNode = new NodeForLinkedList<T>(value);

        //here, we will use a pretty important if condition
        //if currently, the head of the linked list is empty, then that means that the LINKED LIST IS EMPTY.
        //in this case, if we add an item to the linked list as head, it will also be the tail, as it will be the
        //first AND last item. this is also important so that as we add other times to it, we have a consistent 
        //tail.
        if (this.head === null) {
            this.head = this.tail = newNode; //make both head and tail the newNode
            return;
        }

        //to make a node the head node, we simply set its next to the current head node. this way, it starts
        //  pointing to head node as the NEXT NODE, so this node becomes the node before the old head node,
        //  hence, the new head node. for example, if the linkedlist is 1 -> 2 -> 3, and we set the next of a node
        //  with value 0 to refer to 1, then 0 starts pointing to 1, and we get 0 -> 1 -> 2 -> 3, which makes 0
        //  the new head node.
        newNode.next = this.head; //point the next node to head
        this.head = newNode; //then make it the new head

        //TC: O(1)
        //SC: O(1)
    }

    //this time we will make a function to add to the last of the list
    addLast(value: T) {
        //first make a new node with param as value
        let newNode = new NodeForLinkedList<T>(value);

        //same as add first, if the tail is null, it means the linked list is empty. so the add last node with also
        //  have to become the head.
        if (this.tail === null) {
            this.tail = this.head = newNode;
        }

        //to make a node the last node, we will simply set the the next property of our current last node to
        //  point to the new last node and we will also make the tail equal to the newNode.
        //  eg. if 1 -> 2 -> 3 is a linked list, and we make 3 point to a new node 4,
        //  then 4 becomes the last node, and we get 1 -> 2 -> 3 -> 4.
        this.tail.next = newNode;
        this.tail = newNode;

        //TC: O(1)
        //SC: O(1)
    }

    //now, we will create a method to PRINT the linked list.
    //current, if you create a linkedlist object and print it, you will probably get object Object (i havent tried
    //  it), but certainly, what we want wont be printed, that is, the VALUES of the nodes wont be printed.
    //so how do we print the linkedlist? well, first we will start with the head node. we will print its value.
    //  then what? then we will go to the next of the head node, which will also be a node, and print that value,
    //  and we will repeat this process until we reach the tail node. but how do we know if a node is the tail node?
    //  well a tail node wont be pointing to any other node, so if a node is the tail node, its next property
    //  will be null. so now lets write the method.
    print() {
        if (this.head === null) { //if head it null, it means the linked list is empty, so just print
            // "empty linked list" and return.
            console.log("<empty linked list>");
            return;
        }
        //we will first create a variable to store the current node, and init with head node
        //allow it to store null values, you will see why later
        let currentNode: NodeForLinkedList<T> | null = this.head;

        //then we will create a string variable to store a "stringified" version of all the values, which we will
        //  later print in a single line
        let output: string = "";

        //we will run a loop while the current node is NOT null, this is because in each iteration we will update
        //  the currentNode to its own next.
        while (currentNode !== null) {
            //we will add current value to the string followed by "->" to represent the pointers
            output += (currentNode.value + " -> ");

            //and we will make the NEXT node the currentnode, so that the values keep updating and the while
            //  loop is finite. this is similar to how we do i++ in for loops.
            currentNode = currentNode.next;
        }

        //at this point, if the linked list was 1 -> 2 -> 3, our output string will be "1 -> 2 -> 3 -> ", as we
        //  add the arrow each time, so we will remove that arrow from the end by taking a substring. the index
        //  of where the arrow and space start will be equal to output.length - 3, as the arrow and the 2 spaces
        //  combined take up 4 characters AND the substring method is non inclusive with last index, so we will
        //  do 4-1 so that our last character stays in the string.
        output = output.substring(0, output.length - 3);

        //now just console.log the output
        console.log(output);

        //TC: O(n)
        //SC: O(1)
    }

    //so far, we have no way of knowing how many nodes are in the linkedlist, or basically the length of the linked
    //  list. now, we will write a GETTER that will return the length of the linked list
    get length() {
        //how do we calculate the length of a linked list? well, this is similar to printing the linked list,
        //  except this is easier.

        //first of all, if the head node is null, that means the linked list is empty, so just return
        //  0.
        if (this.head === null) return 0;

        //first, we will create a variable to store the length of the linkedlist.
        let length = 0; //initialize with 0

        //then, same as last item, create a variable currentNode which allows null values and initialize with head 
        //node.
        let currentNode: NodeForLinkedList<T> | null = this.head;

        //this is pretty much the same as that while loop.
        while (currentNode !== null) {
            //add 1 to the length
            length++;

            //and set currentNode to the next node
            currentNode = currentNode.next;
        }

        //at the end, return the length
        return length;

        //usually length takes constant time to fetch for an object, but in this case, the TC of getting the length
        //  is O(n) as we have to go through the entire list. SC O(1).
    }

    //now, we will write a method to add in the MIDDLE of the linkedlist, using 2 parameters- and index, which
    //  will represent the number of nodes after which to insert the 2nd param- a variable of type T called value
    //  from which we will construct a node.
    addInBetween(afterNNodes: number, value: T) {
        //okay, so first of all, if the afterNNodes is greater than, or the length of the linked list, we will make
        //  it equal to the length of the linked list itself, and this way, we will basically add to the end of
        //  the list. so we will simply call the addLast() item and return.
        if (afterNNodes >= this.length) {
            this.addLast(value);
            return;
        }

        //if afterNNodes is 0 OR if head is null, we can just use addFirst method
        if (afterNNodes === 0 || this.head === null) {
            this.addFirst(value);
            return;
        }

        //now that we know that afterNNodes is less that the length, then add 
        //create a node from that value
        let newNode = new NodeForLinkedList<T>(value);

        //once again we will create a currentNode variable with head node as initial value
        let currentNode = this.head;

        //now, loop over from 0 to n, and set currentNode to currentNode.next each time. basically this is so
        //  get past the first afterNNodes nodes. we added  && currentNode.next to get rid of a TS warning
        for (let i = 0; i < afterNNodes && currentNode.next; i++) currentNode = currentNode.next;

        //now that we're at the node after which we need to add new node, lets look at how we'll do this
        //first, we'll set newNode.next to currentNode.next, this is basically like doing this-
        //          1 ➡️ 2 ➡️ 3 ➡️ 4
        //                         ⬆️
        //          currentNode^   3.5(newNode)

        //then, we'll set currentNode.next to newNode, like this-
        //          1 ➡️ 2 ➡️  3     4
        //                     ⬇️   ⬆️   
        //                     3.5 ➡️
        //  This it the same as 1->2->3->3.5->4, which would be the resultant list
        newNode.next = currentNode.next;
        currentNode.next = newNode;

        //TC: O(afterNNodes)
        //SC: O(1)
    }

    //now, we will write a method to remove the first node of linked list
    removeFirst() {
        if (this.head === null) { //if head is null, then linked list is empty, so return from here, as there is no
            //  first element to remove
            return;
        }

        //to remove the first item of the linkedList, we will first store the 2nd node in a variable.
        let secondNode = this.head.next;

        //then we will stop the current head (first node) from pointing to 2nd item (which we will make the new
        //  head), by settings its next to null. since it would not be referenced anywhere, this is where our
        //  garbage collector would come in and get rid of the old first node.

        this.head.next = null;

        //then we make the second node the first node
        this.head = secondNode;

        //TC: O(1)
        //SC: O(1)
    }

    removeLast() {
        //removing the second last node is very similar to removing first node. lets first check if our last
        //  node is null. this would mean that the linked list is empty, so we would just return.
        if (this.tail === null || this.head === null) {
            return;
        }

        //to get rid of the last item, we would need to make the 2nd last item the new tail. how would we do this?
        //  we will first go to the second last item, and store it in a variable. then we would set its next to
        //  null, to get rid of the last node. finally, we would make the stored variable node the new tail node.

        //to get to second last node, we would, again, have to make a currentNode variable and use that to get
        //  to the second last node.
        let currentNode = this.head;

        if (currentNode.next === null) { //if next of head is null, there is only 1 node, so we can use remove
            //  first
            this.removeFirst();
            return;
        }

        //usually we use while currentNode !== null, because that way we are able to reach even the last node.
        //  but if we do currentNode.next !== null, we would stop at the 2nd last node, which is what we want.
        while (currentNode.next !== null && currentNode.next.next !== null) {
            currentNode = currentNode.next;
        }

        //set its next to null
        currentNode.next = null;

        //and make it the new last node
        this.tail = currentNode;

        //TC: O(n)  due to the loop which goes over basically the entire list
        //SC: O(1)
    }

    //now, lets write a function to return the index of a key in the linked list.
    //  we can do this in 2 ways- iteration and recursion.
    //first, we will write the iterative approach. we will take the key as input and return a number as result.
    indexOf(key: T): number {
        //first, we will create an item to keep track of indices.
        let index = 0;

        //now, use a while loop and variable to iterate over the list
        let currentNode = this.head;
        while (currentNode !== null) {

            //if current node's value is equal to key, return the current index
            if (currentNode.value === key) return index;

            //else, increment index to that it stays updates with each item
            index++;
            //and move to next node
            currentNode = currentNode.next;
        }

        //if the entire loop was exited, and the index wasnt returned. it means the key wasnt found in the entire
        //  list, so we return -1, to represent that item doesnt exist in list.
        return -1;

        //TC: O(n)
        //SC: O(1)
    }

    //now lets write a recursive method. we will need a target, and we will take an index as param, and we will
    //  take an index and currentNode as param, which we will give a value of 0 and head respectively
    indexOfRecursively(target: number, currentNode = this.head, index = 0): number {
        //bad base case (as in, a result that is bad, worst possible TC)
        //  if currentNode is null, it could mean 2 things- either the list is empty, or we already went through
        //  the entire list and didnt find the target. either way, return -1.
        if (currentNode === null) return -1;
        //good base case. we found the target, so return the index.
        if (currentNode.value === target) return index;

        //if target wasnt found AND if we havent yet gone through the entire list, then recursively call the 
        //  method for the next node and index, and return whatever that results in.
        return this.indexOfRecursively(target, currentNode.next, index + 1);

        //TC: O(n)  the loop
        //SC: O(n)  stack
    }

    //now, we will write a method to REVERSE the list
    //we will do this in place, so the list will be directly modified
    reverse() {
        //leetCode link: https://leetcode.com/problems/reverse-linked-list/

        if (this.head === null || this.head.next === null) { //uf there is 0 or 1 item, return, as there is no
            //point in flipping
            return;
        }
        //to reverse the list, we basically just have to reverse the direction of the pointers.
        //for this, we will keep 3 vars-
        //prevNode, currentNode, nextNode
        //initialize currentNode with head node, and the other 2 with null
        let prevNode: null | NodeForLinkedList<T> = null;
        let currentNode: null | NodeForLinkedList<T> = this.head;
        let nextNode: null | NodeForLinkedList<T> = null;

        //while currentNode is not null, run this loop. basically this means while we are still in the list, because
        //  when the currentNode becomes null, we have traversed the entire list
        while (currentNode !== null) {
            //store the next of the current node in a variable for leter use
            nextNode = currentNode.next;

            //set next of the current node to the previous node, basically, flipping the direction
            currentNode.next = prevNode;

            //set previous node to current node for the next interation
            prevNode = currentNode;

            //and set current node to next node for the next iteration
            currentNode = nextNode;
        }

        //head will become the tail node
        this.tail = this.head;

        //lastly, make the last node the head node
        this.head = prevNode;

        //TC: O(n)  the loop
        //SC: O(1)  we did it in place
    }

    //now we know how to reverse the list inplace, lets write a method that will return a reversed VERSION of
    //  list. which means, the list will not directly be affected. we will make this as a getter
    get reversed(): LinkedList<T> | null {
        if (this.head === null) return null; //if head is null, return null

        //now, we will create a new linkedlist which will act as the revese list
        let reverseList = new LinkedList<T>();

        //we dont have a way to add the items in reverse, so we will use some logic.
        //we already have an add first function. if we go to each item of our linked list, and add that item to
        //  the START of the new list, we will have the reverse list.
        //Eg. original list = 1 -> 2 -> 3
        //      if we go from first item to last item and each each item to the START of the new linked list, we
        //      will have-
        //          1st iter.
        //               original list = 1 -> 2 -> 3
        //               new list = 1
        //          2nd iter.
        //               original list = 1 -> 2 -> 3
        //               new list = 2 -> 1
        //          3rd iter.
        //               original list = 1 -> 2 -> 3
        //               new list = 3 -> 2 -> 1
        //              And this is our reversed list, which we will return

        //so for this, first create the currentNode variable and init with the head of our original list
        let currentNode: NodeForLinkedList<T> | null = this.head;

        //and use a while loop that runs while currentNode is not null
        while (currentNode !== null) {
            reverseList.addFirst(currentNode.value); //and in each iteration, add the value of currentNode to the
            //  STARTING of the reverse list
            currentNode = currentNode.next; //and set currentNode to next node
        }

        return reverseList;

        //TC: O(n)  the loop
        //SC: O(n)  the new list
    }

    //remove ith node
    //this method will take i as a parameter
    removeNodeAtI(i: number) {
        if (this.head === null) return; //if head is null, the list is empty, so just return.

        if (i > this.length) { //if i is greater than length of the list, just remove the last element and return
            this.removeLast();
            return;
        }

        //first we will ues the same currentNode and loop technique to go to the the node BEFORE the node that
        //  we want to remove.
        let currentNode: null | NodeForLinkedList<T> = this.head;
        for (let k = 1; k < i - 1; i++) {
            if (currentNode === null) { //this is just to get rid of TS errors
                this.removeLast();
                return;
            }

            currentNode = currentNode.next;
        }

        if (currentNode === null || currentNode.next === null) { //this is just to get rid of TS errors
            this.removeLast();
            return;
        }

        //set next of the item BEFORE the ith
        //  ith to the item that comes AFTER the ith node. basically, this gets rid of the ith node, since there
        //   will be no pointers to/from it.
        currentNode.next = currentNode?.next?.next;

        //TC: O(i)  the loop
        //SC: O(1)  we did it in place
    }

    //this function will find the first occurance of a given key, and remove that node from the list
    removeFirstOccuranceOfValue(key: T) {
        //for this we will use a combination of 2 functions- indexOf and removeNode.
        let indexOfKeyInList = this.indexOf(key); //find index

        //if index is positive it means item exists in array, so remove the node at at that index
        if (key !== -1) this.removeNodeAtI(indexOfKeyInList);

        //TC: O(n)  TC of indexOf and TC of remove node at i
        //SC: O(1)  we did it in place
    }

    //this function will remove ALL occurance of a value
    removeAllOccurancesOfValue(key: T) {
        //we will use the removeNodeAtI and indexOf with a while loop. you can also this with indexOf and 
        //  removeFirstOccuranceOfValue

        while (this.indexOf(key) !== -1) { //while that key exists in list
            this.removeFirstOccuranceOfValue(key); //remove its first occurance
        }

        //so when there are no more occurances left, the loop will break;

        //TC: O(n)  the loop * RC of remove first occurance = n * 1
        //SC: O(1)  remove first occurance is in place
    }

    //now we will write a pretty important method, which was asked even in flipcart, that is to remove the NTH
    //  NODE FROM END.
    removeNodeFromEnd(n: number) {
        //leetCode link: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
        //              pay attention to the indexing in this question
        //
        //okay, so the thing about removing a node from the end is that it would require us to travel backwards.
        //but that is like pretty hard and complicated. it could be done by copying the list, reversing it, then
        //  removing nth node, and then reversing it again, BUT that is complicated. so we will use from basic
        //  for loop logic.

        //if head node is null, it means the list is empty, so return
        if (this.head === null) return;

        //if n is equal to 0, then the 0th node from the end is simply the last node
        if (n === 0) {
            this.removeLast(); //then remove last
            return; //and return
        }
        //if n is equal to length of list - 1, then removing that node FROM THE END is that same as removing the
        //  the 0th node (first node).
        if (n >= (this.length - 1)) { //if n is greater than or equal to length of list-1
            this.removeFirst(); //then remove first node
            return; //and return
        }

        //now lets think if a node is nth from the end, then what index is it from the start?
        //  eg: 1 -> 2 -> 3 -> 4 -> 5 -> 6
        //                                  4 is 2th node from end
        //                                       and 3th node from start
        //                                  now what is the relation between the them?
        //                                if the node is at nth index from the end, then it will be
        //                                  (list.length - n - 2)th index from end
        //                                so we will use that along with the removeNodeAtI method to remove it
        let indexFromStart = this.length - n - 2;
        this.removeNodeAtI(indexFromStart);

        //TC: O(removeNodeAtI = O(i)) since that is our way of removing the node
        //SC: O(1)
    }

    //now we will write a method to find the mid node. for this, you could obviously use the length and loop over
    //  the list but we will use a slow-fast approach. for this, look at the comments
    midNode(): NodeForLinkedList<T> | null {
        //if the head is null, the list is empty, so return null
        if (this.head === null) return null;

        //if next of head is null, it means there is only 1 node, so return that as the middle node
        if (this.head.next === null) return this.head;

        //now onto the slow-fast approach
        //the way this approach works is that there will be 2 pointers- a slow pointer and fast pointer
        let slow: null | NodeForLinkedList<T> = this.head; //the slow pointer will traverse each node, one-by-one
        let fast: null | NodeForLinkedList<T> | undefined = this.head.next; //the fast pointer will traverse 
        //  2 nodes at a time
        //this way, when fast becomes null, we know that the entire list has been covered. and since slow was
        //  travelling at HALF THE SPEED, it will have the MID NODE

        while (fast !== null && fast !== undefined) {
            slow = slow!.next; //+1   if you're confused by the ! sign here, is is used to get rid of a "possibly
            //  null" TS warning. basically like saying "I know what im doing its not null"
            fast = fast.next?.next; //+2
        }

        //return slow as the middle node
        return slow;

        //TC: O(n / 2)  //due to the slow-fast algorithm
        //SC: O(1)
    }


    //check if list is a palindrome
    isPalindrome(): boolean {
        //leetCode link: https://leetcode.com/problems/palindrome-linked-list/

        if (this.head === null || this.head.next === null) return true; //if there are 1 or 0 nodes, return true

        //a list is palidromic if it is same from start to end. we already have a getter that returns a reversed
        //  version of the list, so we will use that

        let reversedVersion = this.reversed;

        if (reversedVersion === null) return true; //this is just to get rid of some TS errors

        //now this time, we will need 2 trackers, one for each list
        let currentNodeOriginal: NodeForLinkedList<T> | null = this.head;
        let currentNodeDuplicate: NodeForLinkedList<T> | null = reversedVersion.head;

        while (currentNodeOriginal !== null && currentNodeDuplicate !== null) {
            if (currentNodeOriginal.value !== currentNodeDuplicate.value) return false; //if at any point, values
            //  dont match, then the list cannot be a palindrome so return false.
            currentNodeOriginal = currentNodeOriginal.next; //move to next node of both pointers
            currentNodeDuplicate = currentNodeDuplicate.next;
        }

        //if the entire loop was traversed without returning false, return true as it must be a palidrome
        return true;

        //TC: O(reversed + length of list) = O(2n) = O(n)
        //SC: O(reversed) = O(n)
    }

    //a simpler AND faster approach to palindrome question
    isPalindromeSimple() {
        //https://leetcode.com/problems/palindrome-linked-list
        //previously, we use a linked list. which is why our solution was pretty slow. but this time we will
        //  use linkedlists WITH A STRING, to make it faster. what we will do is create 2 empty strings, stright
        //  and reverse. we will loop over the linkedlist, and each time, add the value to both the strings.
        //  in the straight string, we will add to the end, in the reverse string we will ADD TO THE START.
        //  at the end, we simply compare the 2 linked lists.
        //IMPORTANT: DO NOT USE THIS IF THE LIST HAS ITEMS WITH MORE THAN 1 DIGITS
        //          BECAUSE THEN THIS COULD HAPPEN- 12->2->1
        //          straight = "1221"
        //          reverse = "1221"
        //          so true BUT 12->2->1 IS NOT THE SAME BACK TO FRONT, AS THE NUMBERS ARE ACTUALLY DIFFERENT
        //        IN THESE CASES, ADD COMMAS OR SOME SPECIAL CHARACTER IN YOUR STRINGS AFTER EACH ITEM
        //we use the string approach for the leetcode question

        let straight = ""; //create straight and reverse as empty string
        let reverse = "";

        //make copy of the head node
        let head = this.head;

        //while head is not null iterate over it
        while (head !== null) {
            straight = straight + head.value; //add items to end
            reverse = head.value + reverse; //add items to start this way it is in reverse
        }

        return straight === reverse; //return straight === reverse, which is a boolean value

        //TC: O(n)
        //SC: O(n)  the size of string
    }
}