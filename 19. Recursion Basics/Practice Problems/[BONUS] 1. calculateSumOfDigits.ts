//Q:Given a number n as input, return the sum of all its digits.
//
//You probably have done this using loops.
//The basic idea when using a loop to this this, is to use a while loop which runs while n > 0. In each iteration,
//  calculate last digit using mod and add it to sum variable, and then remove the last digit of n by doing
//  Math.floor(n / 10) so that the digits are higher place value too become the last digit and are added.
//
//To do this using recursion, our base case will be n === 0. If this happens, we return 0 (the sum of digits in this
//  case is 0).
//
//Our work will be to add n to the sum of the previous digits. Eg. if the numer is 3452, we will do 3+(4+5+2) recursively.
//  This is the same as the sum of the first n natural numbers. This is also our recursion.

function calculateSumOfDigits(n: number): number {
    if (n === 0) return 0; //base case

    let lastDigit = n % 10; //calculate last digit
    let numberWithoutLastDigit = Math.floor(n / 10); //calculate what the number will be after removing last digit

    return lastDigit + calculateSumOfDigits(numberWithoutLastDigit); //return the sum of the last digit and the
    //sum of the rest of the digits. this works recursively.
}

//TC: O(n)   //we are just looping through the digits
//SC: O(n)   //due to the vars which take up constant space in 1 iteration, but in n iterations will take up
//  1*n space, which is O(n)