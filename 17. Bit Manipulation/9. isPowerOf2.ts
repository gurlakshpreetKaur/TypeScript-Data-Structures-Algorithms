//Q: Write a function that when given an integer n as input, returns true if the number is a power of 2, else false.
//
//This is really when bitwise operators shine, as this question is related to powers of 2.
//
//Previously, I told you that when we substract 1 from a power of 2, the resultant number is consist of only 1s
//  in binary.
//Eg: 2^3 - 1 = 8 - 1 = 7, in binary this is 111
//the number of 1s is equal to the power, so 2^3-1 in binary will have 3 1s, as the power was 3.
//
//We also know that powers of 2 consist of basically just a single 1, and trailing 0s.
//  2 in binary is 10
//  4 in binary is 100
//  so on and so forth
//The number of 0s is also equal to the power, that is, 2^1 has one 0, 2^2 has two zeros, so on and so forth.
//
//So if we take the and of the two numbers (a power of and and the power of 2  - 1), then we will always get 0.
//
//We will use this in our solution. A number is a power of 2 if (number-1)&number is equal to 0.
//
//But there is a problem here, this approach will incorrectly return true for 0. So for that, we will add another
//  condition to the return statement, that n !== 0
//
function isPowerOf2(n: number) {
    return (n !== 0) && (n & (n - 1)) === 0;  //if result n & (n-1) === 0 and n !== 0
    //                              if this is true, true will be returned, else false.
}