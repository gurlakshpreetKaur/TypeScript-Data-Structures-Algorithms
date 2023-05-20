//Q:Write a function that takes n and i as parameters, and replaces the ith bit (from right) of n with 1.
//
//Eg: n = 1000101, i = 3
//      so we go to the 3th index from right, and set it to 1
//          1000101
//             ^    3th index
//          1001101 is the answer then
//Eg: n = 1111101, i = 3
//          1111101
//             ^
//          after setting that bit to 1, the number remains the same (as the 3th bit was already 1), so we return
//              1111101.
//
//

//Previously we wrote a function to get the ith bit, this time, we need a way to set it to 1.
//  We already know that to get the ith bit, we use 2^i, and we will also use that here (we will use it in all
//      operations that involve operating on a single bit).
//  What could be an operation that will always result in 1, when performed with a power of 2.
//      Let's take an example-
//          1 0 1 1 0 0 1 0
//          0 0 0 0 1 0 0 0   =     2^3 (we want to set 3th bit from right)
//                 since we always want that bit to be 1, we will use OR.  as the ith digit of 2^3 will always be
//                      one, no matter that the number is, when we use OR, we will get 1.
//          1 0 1 1 0 0 1 0
//       || 0 0 0 0 1 0 0 0
//          1 0 1 1 1 0 0 0      OR will 0 result in the same digit, OR with one results in 1, so this way
//                                     only ith bit is changed to 1, the rest of the bits remain the same.
//
function setIthBitFromRight(n: number, i: number): number {
    let thePowerOf2 = Math.pow(2, i); //calculate the power of 2 using i which we will need for the operation

    let usingOrWithThePowerOf2 = n | thePowerOf2;  //use OR with the power of 2 to set the ith bit

    return usingOrWithThePowerOf2;  //return the result
}

//we can do this in a single line as follows-
function setIthBitFromRightShortVersion(n: number, i: number): number {
    return n | (Math.pow(2, i));
}

//We can also solve it without taking the power, as we can just left shift 1 by i to get the power (as exlained
//  in stuffYouShouldReadBefore.txt and basicBitwiseOperators.ts).
function setIthBitFromRightBetter(n: number, i: number): number {
    return n | (1 << i);
}