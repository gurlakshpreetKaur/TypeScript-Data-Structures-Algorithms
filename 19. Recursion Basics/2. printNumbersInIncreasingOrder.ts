//Q:Write a function to print numbers from 1 to n in increasing order.
//
//We want to solve this using recursion
//
//For this we will need to create a function with 2 params- currentNumb, limit
//
//Our base case is when currentNumb becomes greater than limit, as it means all numbers until limit have been
//  printed
//
//Our work will be to print currentNumb
//
//Recursive implementation will be to call the function with currentNumb+1, so the next number is printed.

//we make currentNumb optional so the function can be called without having to specify currentNumb
function printNumebersInIncreasingOrder(limit: number, currentNumb: number = 1) {
    if (currentNumb > limit) return; //base case: if currentNumb exceeds limit, all the nums in range have been 
    //  printed

    //work: print the current numb
    console.log(currentNumb);

    //recursion: call function with currentNumb+1, to print number number
    printNumebersInIncreasingOrder(limit, currentNumb + 1);
}

//TC: O(n)  //same as using a loop
//SC: O(1)