//Q:Write a function to print numbers from 1 to n in decreasing order.
//
//We want to solve this question using recursion.
//
//First lets think of our recursive statement, we will simply call the function with n-1.
//
//Okay, let's first think of when we should stop. When n becomes 0, we know she should stop and print nothing.
//
//Let's think of our work, our work will be to print n.

function printNumbersInDecreasingOrder(n: number) {
    if (n === 0) return; //if n is 0, we dont print anything and return, because we only want to print from 1 to n.

    //our work is to print the number
    console.log(n);

    //implement recursion
    printNumbersInDecreasingOrder(n - 1);  //call function with n-1, so that the number is printed in decreasing
    //order
}

//TC: O(n)  //same as using a loop
//SC: O(1)