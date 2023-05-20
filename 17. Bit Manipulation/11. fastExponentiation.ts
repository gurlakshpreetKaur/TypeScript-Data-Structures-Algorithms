//leetCode link: https://leetcode.com/problems/powx-n/submissions/953325914/
//    Note- remember that there are also other ways to solve this problem, the solutions below are just the ones
//              that are related to the topic of Bit Manipulation.
//
//Q:Write a function which takes a number n and a power i and returns n^i.
//
//Naive approach: Use a loop and each time multiply sol with n
function returnPow(n: number, i: number): number {
    let sol = 1;   //init sol variable with 1
    for (let k = 0; k < i; k++) sol *= n;    //write a loop and each time multiply sol with n, so ultimately we multiply
    //sol with itself i times, so we get n^i.
    return sol;
}
//TC: O(n)     due to the loop
//SC: O(1)     the space taken up by this function in the memory is not dependent on the size of the input

//Note that above approach does not work for negative indices, so lets write a new one which does work for
//  negative indices

function returnPowInclusive(n: number, i: number): number {
    let sol = 1;
    if (i < 0) {
        for (let k = 0; k < Math.abs(i); k++) sol /= n;   //when index in negative we divide
    } else {
        for (let k = 0; k < Math.abs(i); k++) sol *= n;   //when they are positive we multiply
    }

    return sol;
}

//Fast exponentiation- Fast exponentiation is an approach in which we use bits to bring down the time complexity
//                          to O(logn), which is a huge improvement when calculating with big exponents.
//How this works, basically, is by taking advantage of the fact that the binary number system is dependent on 2s.
//  We first create a variable to store the solution,
//  then we use a while loop which will run while i > 0.
//  In iteration, we will right shift i by 1, and multiply n with itself (THIS IS NOT STORED IN SOL).
//          We will also check if the last bit of i is 1, if it is one, we will multiply sol with a.
//If we use this algorithm, then at the we will have the correct answer.
//You are probably confused about why it works, so I will try my best to explain.
//Let's say that n is 2, and i is 5. So we want to calculate 2 to the power 5.
//  in binary, 5 is 101. so basically, we want 2^(101 binary)
//
//      what our approach does is that it assigns a 2th power of n to each index from right to left
//
//          1   0   1
//                  ^ n^1
//              ^ n^2
//          ^ n^4
//      so basically exponents of powers of 2.
//
//      now we will run the loop while i > 0.
//          in each iteration, if the ith bit from the right is equal to one, then we multiply ans by the assigned
//              value of that bit. how do we keep track of assigned values? we multiply n by itself in each
//                  iteration. this way, in each iteration, the power stays a power of 2, and we can solve it in
//                      constant space.
//
//          look at the bits of 5, that is, 101.
//          the right-most 1 has an assigned value of n^1.
//          the left-most 1 has an assigned value of n^4.
//              using laws of exponenets, we know that if we multiply them, we will get n^5, which is what we
//              wanted.
//      We are basically making use of binary. Also since binary number system is based on 2s, our TC will be
//          O(log base 2 of i), which basically becomes O(logi).
//
//
function fastExponentiation(n: number, i: number): number {
    let sol = 1;  //init sol with 1, as we will need to multiply sol with different numbers

    //this while loop needs to run while i > 0, since no point in multiplying with n^0, as it will be 1.
    while (i > 0) {
        let lastDigitOfI = i & 1;   //calculate last digit of i

        if (lastDigitOfI === 1) {   //if last digit is 1
            sol *= n;   //then we multiply sol with n
        }

        n *= n;   //multiply n with itself each time. this is basically like assigning a value of exponent to each
        //bit

        i = i >> 1;  //shift i to the right by 1, so that the last digit keeps updating
    }

    //return sol
    return sol;
}

//TC: O(logi)    as binary system by default works on powers of 2, so we get log base 2 of i complexity.
//SC: O(1)

//This approach does not work for negative indices, so lets write one that does include negative indices
function fastExponentiationInclusive(n: number, i: number): number {
    if (i === 0) return 1;   //if the index is 0, return 1
    let sol = 1;   //initialize sol the same
    let iCopy = i;  //store copy of i in a variable for later use
    i = Math.abs(i);    //make i positive by taking absolute value

    while (i > 0) {   //instead of i, use Math.floor(i)
        let lastDigitOfI = i & 1; //instead of i, use Math.floor(i)

        if (lastDigitOfI === 1) {  //if last digit is 1
            sol *= n;   //then we multiply sol with n
        }

        n *= n;  //multiply n with itself as basically assigning a power to each bit
        i = i >> 1;   //shift to the right each time to update the last digit with the absolute value
    }

    if (iCopy > 0) return sol;  //use iCopy to check if index if positive and return sol as is
    else return 1 / sol;    //else it must mean that the index is negative, so we return THE RECIPROCAL, because
    //of laws of negative exponents.
}

//TC: O(logi)
//SC: O(1)