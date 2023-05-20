//Q:Write a function that takes three params- n, i, and toSet. Given n as a number, the function should replace
//      the ith bit from right with toSet (toSet will be either 0 or 1).
//
//The simplest way to solve this will be to check if toSet is 0 or 1, and according either clearBit, or setBit.
//
//but one other way to do this is to observe the following-
//      if we want to change ith bit, then we usually do 1<<i which is same as Math.pow(2, i).
//      if we want to set ith bit to 1, then if we take OR with 1<<i, the ith bit will be set to 1 (as shown in
//              setIthBit.ts).
//      but this wont work if we have to set it to 0. so what do we do?
//
//the answer is, first we set the bit to 0, regardless of what we want to update it to. then, rather than shifting
//        1 to left by i, we shift the input toSet to left by i, and store it in a variable.
//then we take OR with that variable. if we wanted to change it to 0, then shifting to left would yeild 0 as well,
//          OR will lead to no changes in the number, and as we had already cleared the bit, it would be retuned
//          as that.
//          if we wanted to change it to 1, taking or with 1<<i will change that bit to 1, so what we return will
//              be the setBit.
//
//
function updateIthBit(n: number, i: number, setTo: 0 | 1): number {
    let clearedBit = n & (~(1 << i))                     //first clear ith bit and set it to 0
    let bitMask = setTo << i;                          //take ith bit and left shift by i, so that we reach
    //the index that we want to change
    let dynamicallyAddingOrNotAddingBit = clearedBit | bitMask;  //now if setTo is 0, then using | will lead to no
    //change in the clearedBit value, so clearedBit
    //will be returned.
    //if setTo is 1, then using | will set the ith bit
    //to 1, and clearedBit will be returned after setting
    //ith bit to 1.
    return dynamicallyAddingOrNotAddingBit; //return that value
}

//we can do this in a single line too
function updateIthBitShort(n: number, i: number, setTo: 0 | 1): number {
    return (n & (~(1 << i))) | (setTo << i);
}