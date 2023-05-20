//Q:Given a number n, write a function that returns n!.
//
//We will solve this using recursion.
//
//First, what is a factorial? It will all numbers from 1 to n multiplied together.
//  Eg: 4! = 4*3*2*1 = 24
//
//So our base case will be when n==1, we just return 1!, which is 1.
//
//our work will be to multiply the numbers together. this is also where our recursion comes in. observe that
//  n! = n * (n - 1)!. so our function will return n*factorial(n-1), this way all numbers from n to 1 will be
//  multiplied. 
//
//If you're confused, dry run the function on a paper and it will be clear.

function factorial(n: number): number {
    if (n === 1) return 1;  //base case: when n === 1, we will just return 1! which is just 1.

    //if we made it here, then n>1, so in this case we return n*factorial(n - 1)
    return n * factorial(n - 1);
}

//TC: O(n)   same as look
//SC: O(n)   due to recursion, n vars will be kept in memory

//Look at this if you're confused it may help:
//  if we have n = 3, then our function will run as follows-
//      n = 3
//      is (n === 1)? no
//          so return n*factorial(n-1) = 3*factorial(2)                                 = 2*3 = 6, return 6
//
//          n = 2
//          is (n === 1)? no
//              so return n*factorial(n-1) = 2*factorial(1)                            = 2*1 = 2, return 2 ^
//
//                  n = 1
//                  is (n === 1)? yes, so return 1, now, this value will go back and be returned   ^
//
//So 6 is returned. if you still dont understand, look it up on youtube.