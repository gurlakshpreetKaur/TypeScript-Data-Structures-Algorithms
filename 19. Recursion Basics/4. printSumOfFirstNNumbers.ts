//Q:Write a function that when given a positive integer n, returns the sum of all integers from 1 to n.
//
//This question is basically the same as n!, except instead of multiplying, we add.
//
//Base: when n is 1, we return 1.
//
//Work & recursion: return n+sumAllBelow(n - 1), so that all numbers before n are added.

function sumAllUntil(n: number): number {
    if (n === 1) return 1; //if n is 1, return 1

    return n + sumAllUntil(n - 1); //else return n + sum of all numbers BEFORE n
}

//TC: O(n)
//SC: O(n)   recursive approach creates n vars each time