//leetCode link: https://leetcode.com/problems/beautiful-array/
//
//Q:An array nums of length n is beautiful if:
//  nums is a permutation of the integers in the range [1, n].
//  For every 0 <= i < j < n, there is no index k with i < k < j where 2 * nums[k] == nums[i] + nums[j].
//  Given the integer n, return any beautiful array nums of length n. There will be at least one valid answer for 
//  the given n.

//I had no idea how to solve this, until I read this: 
//  https://leetcode.com/problems/beautiful-array/solutions/186901/javascript-how-i-understand-the-solution-with-verification-of-the-solution/
//      AND
//  https://leetcode.com/problems/beautiful-array/solutions/1367891/python-o-n-solution-with-proof-explained/
//
//The solution is in python, but its readable so yeah read that.
//
//Then come back here because I wrote the code in TS-
function beautifulArray(n: number): number[] {
    //create an array of length n and fill it with numbers from 1-n
    let arr: number[] = new Array(n).fill(0).map((i, j) => j + 1);

    //create a helper function
    function helper(ar: number[]) {
        //if length of the array is 1, return ar (base case)
        if (ar.length === 1) return ar;

        //create arrays to store items as even index and items at odd index. basically even and odd items from
        //  1-n will be seperated
        let odd: number[] = [];
        let even: number[] = [];

        //use the loop to add items to odd and even items
        for (let i = 0; i < ar.length; i++) {
            if (i % 2 === 0) even.push(ar[i]);
            else odd.push(ar[i]);
        }

        //recursively call the function on the even and odd parts
        return [...helper(even), ...helper(odd)];
    }

    //return the result of calling helper on the array. basically this way a permutation is returned. READ THE
    //SOLUTION LINK THAT I GAVE.
    return helper(arr);
};

//TC: O(n)
//SC: O(n)