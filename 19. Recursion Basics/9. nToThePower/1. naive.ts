//leetCode link: https://leetcode.com/problems/powx-n/
//
//Q:Write a function pow(n, i) which returns n^i.
//
//We must do this using recursion. Previously in bit manipulation, we had solved it using bitwise operators.
//
//Our first approach is the naive approach, the most basic approach.
//
//Let's think of our base case. If we have 5^3, then we know we can stop multplying when we have written out five
//  3s? But how to we keep track of it? This time, we don't need OR want a third variable index, as we can simply
//  set i===0 as our base case. in this case, we simply return 1. 
//
//We will start by calling the function with i === 3, and in each call, we will recursively call the same 
//  function for i-1, until it becomes 0 and recursion stops (1 is directly returned). If we think about it,
//  5^3 = 5 * 5^2, by now you shoulda already be seeing how that could transform into recursion. We will return
//  n * pow(n, i - 1) each time.

function pow(n: number, i: number): number {
    if (i === 0) return 1; //base case, recursion should stop when 0 is hit

    return n * pow(n, i - 1); //if we didn't return 1 in the previous line, then this index is > 0, so we return
    //n * pow(n, i - 1), basically we reduce i by 1. same as doing n*(n^(i - 1)) which is same as n^i
}

//TC: O(n)   n recursive function calls max
//SC: O(n)   each function call takes up constant space, so with n calls max, it will take n space max

//Note that the above approach does not work for negative indices. let's write an approach for negative indices.
//
//When dealing with negative indices, instead of DECREAING the index, we will INCREASE the index. Our goal is
//  basically to use the base case as the case that stops it, so we want to move TOWARDS 0 INDEX.
//We actually don't have to change a lot to ensure that, just change n * pow(n, i - 1) to n * pow(n, i + 1)
//  AND remember that negative indices are some form of 1/x, so change n * pow(n, i + 1) to
//  (1/n * 1/pow(n, i + 1)), basically return the inverse of it. We will use an if conditition here, if the index
//  is negative, return inverse, else the normal version
//
//This will work because we are using i as a countdown, we aren't really performing any operations USING i directly,
//  just using it as a countdown. we ALWAYS want to reach 0 (to end the countdown), so when i is positive we
//  subtract. when i is negative we add. this way we keep moving towards 0 until we reach 0 and 1 is returned.

function powInclusive(n: number, i: number): number {
    if (i === 0) return 1; //base case, recursion should stop when 0 is hit, works for both +ve and -ve

    //if i is not equal to zero (we made it past previous statement) then i can be either greater than or lesser
    //  than 0
    if (i > 0)   //i is positive, so we return the positive version
        return n * pow(n, i - 1); //index will reduce in each call
    else
        return 1 / (n * pow(n, i + 1));  //return the inverse AND increase index instead of decreasing
}

//TC: O(n)   same as non-inclusive approach
//SC: O(n)   same as non-inclusive approach