//Q:Write a function that takes n and i as parameters, and replaces the ith bit (from right) of n with 0.
//
//For this we will use both ~ and &.
//We know how to set ith bit, but to clear ith bit we need to think of an operation that always results in 0.
//
//If we take & with 0, we always get 0. 1&0 === 0, 0&1 === 0, 0&0 === 0.
//
//Now that we know that, we need a way to target only 1 bit of the number, we know how to do that- power of 2.
//  But in 2^i, the ith bit will be 1, not 0, so how do we make it so that only the ith bit is 0 and the rest
//      are 1?
//  We use the ~ operator.
//  Recall that in memory, numbers are stored as groups of 16 bits or more.
//      Eg. 2^3   =   8   = 0000000000001000
//          ~(2^3) = ~8   = 1111111111110111  = -9
//  Now if we take AND of this number (1111111111110111 in binary) with a number, all bits will remain the same,
//          except ith bit, which will always become 0.
//
//
function clearIthBitFromRight(a: number, i: number): number {
    let thePowerOf2 = Math.pow(2, i);   //store the power of 2 needed in a var

    let theFlippedPowerOf2 = ~thePowerOf2;    //flip the bits using ~ operator

    let clearTheBitByTakingAnd = a & theFlippedPowerOf2;     //take AND of input number and the power of 2, so that
    //all bits remain the same except the ith bit which
    //will become 0

    return clearTheBitByTakingAnd;    //return the result
}

//we can shorten it to a single line
function clearIthBitFromRightShort(a: number, i: number): number {
    return a & (~(Math.pow(2, i)));
}

//We can also solve it without taking the power, as we can just left shift 1 by i to get the power (as exlained
//  in stuffYouShouldReadBefore.txt and basicBitwiseOperators.ts).
function clearIthBitFromRightBetter(a: number, i: number): number {
    return a & (~(1 << i));
}