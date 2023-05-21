//Q:Given a floor of 2xn size and tiles of size 2x1, return the number of ways in which the floor can be tiled.
// input: n = 4
// Output: 5
// Explanation:
// For a 2 x 4 board, there are 5 ways
//   All 4 vertical (1 way)
//   All 4 horizontal (1 way)
//   2 vertical and 2 horizontal (3 ways)
//      This question was asked at amazon
//
//How do we do this recursively?
//For that, first we will calculate the ways for a few number
//
//n = 0, when the size of the board is 0, you might think there is no way to tile it, but if the floor doesn't
//  exist, then we can just assume it is tiled. This is sort of a vacously true statement, it *is* technically
//  true, but it doesn't really mean anything. So output is 1.
//n = 1, there is only 1 way to tile the floor, place the tile vertically.
//n = 2, there are 2 ways to tile the floor here, both horizontal and both vertical (2*2 floor).
//n = 3, this is where the recursion comes in. We can split the 2*3 board into 2 boards- 2*1 and 2*2. The total ways
//      to tile will be equal to the ways to title a 2*1 floor + the ways to tile a 2*2 floor. Which should be
//      1+2=3, and we can check this. There are 3 ways to tile this floor-
//          Place all 3 tiles vertically.
//          Place 1 tile vertically and remaining 2 tiles horizontally (2 ways)
//n = 4, we use the recursive formula, 2*3 floor + the ways to tile a 2*2 floor. How might be wondering why not
//      ways to title 2*2 + ways to tile 2*2? because the formula is actually to add n-1's number of tiling to
//      n-2's number of tiling, which, if you think about it, is the fibonacci series.
//
//From geeksForGeeks, this is the explaination-
//1) If we place first tile vertically, the problem reduces to “count(n-1)”
//2) If we place first tile horizontally, we have to place second tile also horizontally. So the problem reduces
//      to “count(n-2)”
//Therefore, count(n) can be written as below.
//count(n) = n if n = 1 or n = 2
//count(n) = count(n-1) + count(n-2)
//
//mathematically-
//  f(0) = 1
//  f(1) = 1
//  f(n) = f(n - 1) + f(n - 2)

function tilingProblem(n: number): number {
    if (n === 0) return 1; //basically the implementation of f(0) = 1
    if (n === 1) return 1; //basically the implementation of f(1) = 1

    return tilingProblem(n - 1) + tilingProblem(n - 2); //the implementation of f(n) = f(n - 1) + f(n - 2)
}

//TC: O(2^n)    this is the same as the fibonacci series, so the TC is also the same
//SC: O(1)      if you notice, we didn't create any auxiliary vars for this question, so its O(1).