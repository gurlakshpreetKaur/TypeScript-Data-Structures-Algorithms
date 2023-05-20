//Q: Given three numbers n, i, and j, clear all bits of n in the range of i and j from the end (i and j inclusive).
//Eg: n = 1111101111101, i = 2, j = 5.
//          1111101111101
//                 ^  ^
//          after clearing this range-
//          1111101000001 will be our result.
//
//At this point, we already know how to clear last i bits.
//Let's make use of that information. Since we know how to clear the last i bits, and we know that clearing
//  a range also involved clearing bits, lets first clear the last j bits, which would complete the range.
//  Eg: 1111101111111, i = 2, j = 5,    expected answer of clearning in range: 1111101000001
//      lets clear the last j bits
//      1111101100000
//              ^     cleared the last 5 bits
//      lets compare this with the expected result which we would have gotten after clearning within the range only
//
//      1111101100000
//
//      1111101000011   As you can see, the difference is formed by the numbers that come BEFORE the range
//          which means that if we are able to to get the last i bits, and combine them with the result of removing
//          last j bits, we will get the correct solution.

//                eg: 1111111111111, i = 3, j = 6
// remove j bits end: 1111110000000
//   the last i bits:          1111
//      combine them: 1111110001111  this is result after removing the bits in range
//
//So now the question becomes how to get the last i bits, and how to combine them?
//      we can easily derive that the two binary representations can be combined using OR.
//
// To get the last bits, basically what we are doing is the opposite of clearing the last i bits.
//      when we clear the last i bits, we take AND with ~(2^i-1), but if we take and with 2^i-1, all bits EXCEPT
//          last i bits will be cleared. So this way we get the last i bits.
//      eg: 11111110101, i = 3
//  2^3-1 = 00000000111    (8 - 1 = 7)
//   AND  = 00000000101   these are the last 3 bits
// Now we can use this, along with clearing last j bits, to combine the two to get the result.
//
//
function clearRangeOfBits(n: number, i: number, j: number): number {
    let clearedLastJBits = (n >> j) << j;  //first clear last j bits and store in var

    let powerOf2MinusOne = (1 << i) - 1;  //then calculate 2 to the power i - 1. instead of using math.pow, here
    //i've used the left shift operator (as explained in the basicBitwiseOperators.ts file this can be used to
    //calculate powers of 2).

    let lastIDigits = n & powerOf2MinusOne;  //take AND so that all digits are cleared except last i digits

    let resultAfterClearingRangeOfBits = clearedLastJBits | lastIDigits;
    //combine the last i digits and the result after clearing last j digits to get the result.

    return resultAfterClearingRangeOfBits; //return the result
}

//this can be done in a single line too-
function clearRangeOfBitsShort(n: number, i: number, j: number): number {
    return ((n >> j) << j) | (n & (1 << i) - 1);
}