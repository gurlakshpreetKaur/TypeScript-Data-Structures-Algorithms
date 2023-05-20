//IMPORTANT: READ stuffYouShouldReadBefore.txt BEFORE THIS AND ALSO THE ARTICLES MENTIONED IN IT

//If you read stuffYouShouldReadBefore.txt, this will be pretty easy for you, have read through and try using the
//  operands yourself. if you've already done that, skip this file.
//
//This file basically covers the basic bitwise operators in TS.
//
//The functions will be number based, but bitwise works on other data types too.

//Bitwise NOT: Bitwise NOT will flip the bits of an operand.
//     1011001 will become 0100110, as the 1s become 0s, and the 0s become 1s.
//      This is similar to the boolean operator !, which turns true to false and false to true.
//          Is is important to note that in memory, binary numbers are stored as 16 digits, or 16 bits.
//          So even though in binary 1 is the same, it is 1, it will be stored as 0000000000000001.
//      So when we flip the bits, we wont get 0, we will get 1111111111111110.
//
function bitWiseNot(a: number): number {
    return ~a;   //a tilde (~) is used as the NOT operator.
}


//BITWISE AND: Bitwise AND will go to respective bits of two operands, and return 1 only if they are both 1, else 0.
//              Think of it like boolean values, true&&true === true, but true&&false === false, 
//              false&&true === false, false&&false === false.
//Eg:   1 0 1 1 0 0 1    =  89
//    & 0 0 1 0 1 1 0    =  22
//      0 0 1 0 0 0 0    =  16
//        we get 1 only when both bits are 1

function bitWiseAnd(a: number, b: number): number {
    return a & b;   //to perform bitwise and in TS, we use a single & as the operator
}

//BITWISE OR: Bitwise OR will go to respective bits of two operands, and return 1 if either bit is 1, else false.
//              Similar to boolean values, true||true === true, false||true === true, true||false === true,
//              false||false === fales.
//Eg:   1 0 1 1 0 0 1    =  89
//    | 0 0 1 0 1 1 0    =  22
//      1 0 1 1 1 1 1    =  95
//
function bitWiseOr(a: number, b: number): number {
    return a | b;
}

//BITWISE XOR: Bitwise XOR returns 0 when both bits are same, and 1 when both bits are different.
//Eg:   1 0 1 1 0 0 1    =  89
//    ^ 0 0 1 0 1 1 0    =  22
//      1 0 0 1 1 1 1    
//    
//  0^0 = 0
//  0^1 = 1
//  1^0 = 1
//  1^1 = 0
//
function BitWiseXor(a: number, b: number): number {
    return a ^ b;
}

//Left-shift: Left shift is used to shift a given range of bits to the left n times and adds 0s to the end
//              the operator is <<.
//      for example, lets say the following bits are stored somewhere on memory-
//
//              |  1  |  0  |  1  |  1  |  0  |  0  |  1  |
//          If I shift it all to the left by 2, I will be left with this-
//  |  1  |  0  |  1  |  1  |  0  |  0  |  1  |  0  |  0  |
//          And to preverve the length, we add trailing zeros to the length and trim of the access at the left side
//              |  1  |  1  |  0  |  0  |  1  |  0  |  0  |
//              So this will be the result
//
//        It is noteworthy that Left shift is equivalent to multiplying the bit pattern with 2^k, where k is
//              the number by which we shifted the bits.
//      Eg. 1 in binary is 001, if we left shift it by 2, we get the following-
//              |  0  |  0  |  1  |
//                  shifting by 2
//  |  0  |  0  |  1  |  0  |  0  |
//                  trim the access
//              |  1  |  0  |  0  |
//          we get 100 in binary. if we convert it to decimal, we get 4, which is 2^2.
//              since we left shifted 1 by 2, we get 1*(2^2), which is 4.
//          You can try this on different numbers
//  IMPORTANT: Rememeber that bits are stored as either groups of 16, 32, 64, etc, so when we shift to the left,
//              the 0s at the start are pushed over unless the number is really big.
//              001 in memory is actually 0000000000000001, or even more 0s depending on the computer.
//
function binaryLeftShift(n: number, shiftBy: number) {
    return n << shiftBy;   //this is how we left shift bits. if we want to shift i by n, the syntax will be i<<n.
    //these are 2 arrows pointing to the left
}

//right-shift: right shift is used to shift a range of bits to the right n times, and it adds 0s to the start
//              to preserve length.
//      for example, lets say the following bits are stored somewhere on memory-
//
//              |  1  |  0  |  1  |  1  |  0  |  0  |  1  |
//          If I shift it all to the right by 2, I will be left with this-
//              |  0  |  0  |  1  |  0  |  1  |  1  |  0  |  0  |  1  |
//          And to preverve the length, we add trailing zeros to the length and trim of the access at the left side
//              |  1  |  1  |  0  |  0  |  1  |  0  |  0  |
//              So this will be the result.
//      
//          In constast to left-shift, right shift is equivalent to dividing the bit pattern with 2k (if we are 
//              shifting k bits ).
//          Eg. if we shift 100 in binary (4 in decimal) to the right by 2, we get-
//              |  1  |  0  |  0  |
//                  on rightshifting-
//              |  0  |  0  |  1  |  0  |  0  |
//                  on removing left excess bits-
//              |  0  |  0  |  1  |
//                  the result is 001
//              on converting to decimal, we get 1. 1 === 4/(2^2), so that checks out too. You can try this
//                  with different numbers
//
//
function rightShift(n: number, shiftBy: number) {
    return n >> shiftBy;  //this is the syntax to shift bits to the right. if we want to shift a by b bits, a>>b
    //will give up the result. these are 2 arrows pointing to the right.
}