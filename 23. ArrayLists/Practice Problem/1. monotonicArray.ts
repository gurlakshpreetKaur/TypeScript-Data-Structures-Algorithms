//leetCode link: https://leetcode.com/problems/monotonic-array/
//
//Q:An array is monotonic if it is either monotone increasing or monotone decreasing.
//  An array nums is monotone increasing if for all i <= j, nums[i] <= nums[j]. An array nums is monotone 
//      decreasing if for all i <= j, nums[i] >= nums[j].
//  Given an integer array nums, return true if the given array is monotonic, or false otherwise.

//To simplify, an array is monotonic if it is sorted in either non-increasing or non-decreasing order.

function isMonotonic(nums: number[]): boolean {
    //if there is only 1 item in nums, then nums IS monotonic. but our functions will return false. so return true
    //      outright.
    if (nums.length === 1) return true;

    //first we will write a sub-function to check if it is sorted in non-decreasing order
    function isSortedNonDecreasing(arr: number[]): boolean {
        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] > nums[i]) return false;
        }
        return true;
    }

    //then write a sub-function to check if it is sorted in non-increasing order
    function isSortedNonIncreasing(arr: number[]): boolean {
        for (let i = 1; i < nums.length; i++) {
            if (nums[i - 1] < nums[i]) return false;
        }
        return true;
    }

    //if either of those functions returns true, it means the array is monotonic. so we will return the OR of the
    //  two functions
    return isSortedNonDecreasing(nums) || isSortedNonIncreasing(nums);
}

//TC: O(n)   due to the loops
//SC: O(1)   the amount of memory taken will be constant regardless of input