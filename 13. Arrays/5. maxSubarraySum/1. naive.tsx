//leetCode link: https://leetcode.com/problems/maximum-subarray/

function maxSubarraySumNaive(arr: number[]): number {
    //variable to store max sum. initialized with the smallest value possible, aka -Infinity so that any and 
    //all values become greater than it.
    let max = -Infinity;
    //loop to determine where to start
    for (let i = 0; i < arr.length; i++) {
        //loop to determine where to end
        for (let j = i; j < arr.length; i++) {
            //variable to store current sum, 0
            let curr = 0;
            //loop that takes the start and end values and actually does something with them
            for (let k = i; k <= j; k++) {
                //looping over subarray and adding the values
                curr += arr[k];
            }
            //if current sum is greater than max sum, then current sum becomes the max sum
            if (curr > max) max = curr;
        }
    }
    return max;
}

//TC: O(n^3)
//SC: O(1)