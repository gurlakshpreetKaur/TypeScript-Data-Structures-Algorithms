//leetCode link: 
//Q:Given a number n as input, write a function that returns the nth fibonacci number
//
//What are fibonacci numbers?
//  its a series of numbers that starts from 0 and 1, and the next number comes by adding the last 2 number
//  fib(0) = 0
//  fib(1) = 1
//  2rd fib = fib(2 - 2) + fib(2 - 1)
//          = fib(0) + fib(1)
//          = 0 + 1
//          = 1
//  3th fib = fib(3 - 2) + fib(3 - 1)
//          = fib(1) + fib(2)
//          = 1 + 1
//          = 2
//  4th fib = fib(4 - 2) + fib(4 - 1)
//          = fib(2) + fib(3)
//          = 1 + 2
//          = 3
//
//  So on, and so forth
//  So im pretty sure that you can see how recursion could be used by observing the above pattern, so try it 
//      yourself.
//
//Here's the solution-
//  Base case: we know that when n===1, fib = 0, and when n===2, fib = 1, so these 2 will be our base case.
//              if(n === 1) return 0
//              if(n === 2) return 1
//  our work and recursion are combined. fib(n) = fib(n - 1) + fib(n - 2), this is exactly what we will code.
//              return nthFibonacci(n - 1) + nthFibonacci(n - 2)
//
//again, if you dont understand, go to youtube and search 'recursive approach to nth fibonacci', or dry run it on
//      a piece paper.

function nthFibonacci(n: number) {
    //base cases
    if (n === 0) return 0;
    if (n === 1) return 1;

    //work & recursion
    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
}

//TC: O(2^n)  this is like a binary tree, for each function call, there will be 2 operations. due to recursion,
//                  TC becomes O(2^n)
//SC: O(n)   due to the function calls, n vars will be created which will take up space in the memory