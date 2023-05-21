//Q:Tower of Hanoi is a mathematical puzzle where we have three rods (A, B, and C) and N disks. Initially, all the
//  disks are stacked in decreasing value of diameter i.e., the smallest disk is placed on the top and they are on
//  rod A. The objective of the puzzle is to move the entire stack to another rod (here considered C), obeying the
//  following simple rules:
//      Only one disk can be moved at a time.
//      Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack
//           i.e. a disk can only be moved if it is the uppermost disk on a stack.
//      No disk may be placed on top of a smaller disk.
//
//For this, I actually won't explain anything. It is too complicated for me to just write down and explain, so
//  read this: https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/
//  or watch this: https://www.youtube.com/watch?v=YstLjLCGmgg

//we will set default names for source, helper, and destination, so that it doesn't have to be specified for
//  every call, just to save some time while testing
function towerOfHanoi(n: number, source = "A", helper = "B", destination = "C") {
    if (n === 1) { //if there is only 1 disk, we can simply move it from source to destination
        console.log(`move disk 1 from ${source} to ${destination}.`);
        return;
    }

    towerOfHanoi(n - 1, source, destination, helper); //else first we will move the top (n - 1) disks from SOURCE
    //to HELPER
    console.log(`move disk ${n} from ${source} to ${destination}.`); //then we will move the last, biggest, disk
    //from SOURCE to DESTINATION
    towerOfHanoi(n - 1, helper, source, destination); //finally we move the top (n - 1) disks from HELPER to
    //  DESTINATION
}

//TC: O(2^n)  (the 2 recursive calls)
//SC: O(1)    as we didn't have any auxiliary vars

//function call-
let N = 4;
towerOfHanoi(N); //we don't need to specify source, destination, helper, because we set a default value.