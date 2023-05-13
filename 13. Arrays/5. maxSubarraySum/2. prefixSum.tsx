//Approach:
//1. Calculate prefix sum for each element.
////Basically, calculate the sum of all elements before each ith element.
////Store this in an array.
//2. Now, use nested loops to determine start and end of subarray (as used in the naive approach)
//3. Use the prefix sum array to calculate subarray sum with start and end using the nested loop.
////subarraySum(start, end) = prefixSum[end] - prefixSum[start - 1].
////You are basically eliminating the elements you don't want.
////                arr = [1, 2, 3, 4]
////                prefixSum = [1, 1+2, 1+2+3, 1+2+3+4] = [1, 3, 6, 10]
////                subarraySum(1, 3) = prefixSum[3] - prefixSum[1 - 1] = prefixSum[3] - prefixSum[0]
////                                                                    = 10 - 1 = 9
////        Here, we kept the elements we wanted (1 - 3), and removed those we didn't want by the subtraction step.

function maxSubarraySumPrefixSum(arr: number[]): number {
    if (arr.length === 0) return NaN;
    //prefixSum is an array, where we make the first element = arr[1], because the prefixSum
    //uptill the first element will be equal to the first element
    let prefixSum = [arr[1]];
    //loop through the arr, and for each element, use the previous index prefixSum to calculate current index prefixsum
    //prefixSum[i] = prefixSum[i - 1] + arr[i]
    //prefixSum of nth index = prefixSum of last index + arr number at current index
    for (let i = 1; i < arr.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + arr[i];
    }
    //initialize max index with -Infinity, so that any and all numbers are greater than it.
    let max = -Infinity;
    //loop to calculate start index
    for (let start = 0; start < arr.length; start++) {
        //loop to calculate end index
        for (let end = start; end < arr.length; end++) {
            //calculating current subarray sum using the prefixSum array
            let curr = start > 0 ? (prefixSum[end] - prefixSum[start - 1]) : prefixSum[end];
            //if current sum > max sum, then set max sum to current sum
            if (curr > max) max = curr;
        }
    }
    return max;
}

//TC: O(n^2 + n);
//SC: O(n) (since we made the prefix sum array with same length as given array)