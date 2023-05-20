//Q:Write a function that uses bitwise operators to add 1 to a given number
//
//To solve this, we will use the expression -~x. Why? because negative numbers are stored in 2's complement manner
// plus 1. So for example, to get negative of 2 we do ~2+1 in binary. So if we do ~2, and then multiply it by
//  -1, the number that we will get will be 2+3 = 3.
//
function addOne(a: number) {
    return -~a;
}