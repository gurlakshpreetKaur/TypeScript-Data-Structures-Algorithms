//geeksForGeeks link: https://practice.geeksforgeeks.org/problems/friends-pairing-problem5425/1
//
//Given N friends, each one can remain single or can be paired up with some other friend. Each friend can be
//  paired only once. Find out the total number of ways in which friends can remain single or can be paired up.
//
//Let's think about it the way we thought of the tiling problem.
//First, let's calculate for a few numbers, and try to find a pattern.
//n = 1, since there is only one person, the only possibility is for them to be single. output = 1
//n = 2, they can both be paired together, or both be single. output = 2
//n = 3, if the friends are a, b, and, c, then a&c can be paired and be will be single, a&b can be paired and c
//  will be single, b and c can be paired and a will be single, or they can all be single. which is 4 possibilities.

//Okay now lets think about it a little logically.
// For n-th person there are two choices:
//  1) n-th person remains single, we recur for f(n – 1).
//  2) n-th person pairs up with any of the remaining n – 1 persons. We get (n – 1) * f(n – 2).
//  Therefore we can recursively write f(n) as: f(n) = f(n – 1) + (n – 1) * f(n – 2).
//  We can simply form the recursive function for it with base case if n<=2 then f(n) = n as f(1)=1 and f(2)=2.
//src: geeksForGeeks

//mathematically-
//f(1) = 1
//f(2) = 2
//f(n) = f(n – 1) + (n – 1) * f(n – 2)
//        ^single     ^^^^^^^^^^^ pair

function friendsPairing(n: number) {
    if (n === 1) return 1; //base cases
    if (n === 2) return 2; //base cases
    return friendsPairing(n - 1) + ((n - 1) * friendsPairing(n - 2));
}

//TC: O(2^n)), as it will be having same time complexity as that of recursive fibonacci program.
//TC: O(n), as max number of stack frames in recursion tree of it will have n frames.