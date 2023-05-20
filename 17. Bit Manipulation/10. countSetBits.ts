//Q:Write a function that takes the binary representation of an integer and returns the number of set bits (1s).
//
//This question is the same as finding the number of times a given digit k occurs in a given number n.
//For example- n = 3992335, k = 3
//  we will write a while loop, that runs while n > 0, each time we will use module operator to get last digit,
//      and if it is equal to k, add it to a total count variable.
//
//For this question, we will do the same. We will run a while loop while n > 0. each time, we will get last digit,
//      and if it is equal to 1 (a set bit), we will increment count variable. then we will right shift by 1, so
//      that we get next digit.
//
//
function countSetBits(n: number): number {
    //create totalCount variable
    let totalCount = 0;

    //while input number is greater than 1
    while (n > 0) {
        let lastDigit = n & 1;  //we calculate last digit by taking AND with 1

        if (lastDigit === 1) totalCount++;  //if it is equal to 1 (a set bit), increase totalCount

        n = n >> 1;  //shift n to right by one each time, same as how we divide decimal numbers by 10 when counting
        //the number of times that a specific digit occurs in a given number
    }

    //return the totalCount
    return totalCount;
}

//TC: O(n)   number of bits in the input will directly impact the while loop iterations
//SC: O(1)