//Q:Write a function that takes n and i as parameters, and returns the ith bit in the binary representation of n.
//
//In the previous question, we derived that if we take n&1, we get the last bit of binary representation of n.
//This time, we need to be able to get any bit in the number.
//
//Take a look at this table again: https://www.geeksforgeeks.org/binary-number-system-definition-conversion-examples/
// Look for numbers whose bits stand out particularly.
//
//There are many, but one interesting pattern is that powers of 2 just consist of a single 1, and trailing 0s.
//  2^0 = 1, binary of 1 = 1
//  2^1 = 2, binary of 2 = 10
//  2^2 = 4, binary of 4 = 100
//  2^3 = 8, binary of 8 = 1000
//  2^4 = 16, binary of 16 = 10000
//      Observe that in each binary representation of a power of 2, the number of 0s equals to the power
//  This is also not a coincidence. This is similar to how in the decimal number system, powers of 10 consist of
//      a 1 and trailing 0.
//  10^0 = 1
//  10^1 = 10
//  10^3 = 100
//  10^4 = 1000
//  10^5 = 10000
//How can we use this to get the ith bit?
//Lets draw a relation between this, and getting the last bit.
//  To get the last bit, we took AND with 1, which is 2^0.
//Lets think of how we would get the 1th bit from the right.
//  Lets say this is the number: 11110000111
//  and we want to get the 1th bit from the end, so that would be-
//          11110000111
//                   ^    this position
//  Lets implement the same procedure as getting the last bit, lets take an AND. but with what number? this number
//          needs to have 0s at all digits, except the 1th index from the right. Thinking back to the powers of
//          2, the binary representations of powers of 2 have 0s everywhere, except for the kth position from left,
//          where k is the power of the number.
//  So for this number, we will take & with 2^1, that is 2, in binary, it is 10.
//          11110000111
//         &         10
//          00000000010  =  2
//                      In this case, we haven't gotten 1 or 0, we've gotten 2. If we want to get 1 or 2, we can
//                          just right shift it by 1, that is, the i that we took as input, BUT using some logic,
//                          we know that if its a NON-ZERO VALUE, then it must be 1. So we can use a simple
//                          tertiery operation to indetify that.
//

function getIthBitFromRight(n: number, i: number): 0 | 1 {
    let thePowerOf2 = Math.pow(2, i); //calculate the power of 2 that we will use to get 1th bit

    let takingAndWithPowerOf2 = n & thePowerOf2; //take 2nd of n and the power of 2

    return (takingAndWithPowerOf2 === 0) ? 0 : 1;  //if after taking AND we get 0, then the bit is 0.
    //but if it is not 0, that means the bit is also not 0, so
    //the bit MUST BE 1.
}

//We can do this in a single line too

function getIthBitFromRightShortVersion(n: number, i: number): 0 | 1 {
    return (n & Math.pow(2, i)) === 0 ? 0 : 1;
}

//But in this approach, we didnt actually get the ith bit, we used logic to check if its 0, and if its not 0, it
//      must be 1.
//Now, lets write code that will always GET the last digit directly.

//Okay so until now we know that if we do n&(2^1) we will get 0 if the bit is 0, else we will get a non-zero
//      number, it will actually always be a power of 2 and you can try it and find out why.
//
//So we know that if its a power of 2, we will get 1 followed by a number of 0s, but how many 0s exactly?
//      i zeros.
//          Eg- getting 4th bit from right (0-INDEXING)
//                1 0 1 1 1 0 0 0 1
//             && 0 0 0 0 1 0 0 0 0
//                0 0 0 0 1 0 0 0 0   this is a power of 2. it is 16, in binary, it is one followed by 4 0s,
//                                      which is exactly the bit which we wanted to get.
//So if we shift the result to the right by i digits, we will be left with either 1 or 0, which will actually
//      be the ith bit.
//              0 0 0 0 1 0 0 0 0
//                          right shifting by 4 (the i which we took as input)
//              0 0 0 0 0 0 0 0 1 | 0 0 0 0 
//                  result number | the digits that were pushed out by doing right shift
//      As you can see, this way, the 0s are pushed out, and we are left with 000000001, which is 1.
//You could similarly try it with a pen and paper for different binary numbers, and you will discover that using
//      0-INDEXED indices, the approach will always work.
//
function getIthBitDirectly(a: number, i: number): number {
    let thePowerOf2 = Math.pow(2, i);  //the power of 2 that we need for this to work

    let takingAndWithThePowerOf2 = a & thePowerOf2;  //take the and to get ith bit (in form of power of 2 or 0)

    let gettingRidOfThe0sToGetIthBit = takingAndWithThePowerOf2 >> i;  //we shift the digits to right by i so that
    //the 0s of the power of 2 are removed

    return gettingRidOfThe0sToGetIthBit; //return result
}

//we can do this in a single line as follows-
function getIthBitDirectlyShortVersion(a: number, i: number): number {
    return (a & Math.pow(2, i)) >> i;
}

//We can also solve it without taking the power, as we can just left shift 1 by i to get the power (as exlained
//  in stuffYouShouldReadBefore.txt and basicBitwiseOperators.ts).
function getIthBitDirectlyBetter(a: number, i: number): number {
    return a & (1 << i);
}