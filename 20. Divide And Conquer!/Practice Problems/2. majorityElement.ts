//leetCode link: https://leetcode.com/problems/majority-element/
//
//Given an array nums of size n, return the majority element.
//The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority 
//  element always exists in the array
//
//We can easily solve this using a loop and an object, by looping over the array and adding the count of occurances
//  to the object.

function majorityElement(nums: number[]): number {
    const hash = {}; //create object

    for (let i = 0; i < nums.length; i++) { //loop over array
        if (hash[nums[i]]) { //if it exists in hash, increment its count
            hash[nums[i]]++;
        } else { //else add it to hash
            hash[nums[i]] = 1;
        }

        //if the count is greater than half of length of nums, then return the current element, as it means
        //  it is majority element
        if (hash[nums[i]] > Math.floor(nums.length / 2)) return nums[i];
    }

    //this is just a placeholder, it is guaranteed that there is a solution, so this wont be called
    return nums[nums.length - 1];
};

//We know how to solve this using loops, so now lets convert this into recursion.
//Since we want to keep track of the hash, we will make it a param, along with the nums array and an index keeper

function majorityElementRecursion(nums: number[], hash = {}, i = 0): number { //by default, hash is empty (initial call)
    //base case: it index is equal to nums.length, the entire array has been traversed, so we return NaN as there
    //  is no majority element

    if (i === nums.length) return NaN;

    //check if current element is in hash
    if (hash[nums[i]] !== undefined) {
        hash[nums[i]]++; //then increment its count
    } else { //else it means that the element is not in hash, so add it to the hash
        hash[nums[i]] = 1;
    }

    //check if its count is greater than n/2 times, if yes, then return current element as majority
    if (hash[nums[i]] > Math.floor(nums.length / 2)) return nums[i];

    //recursively call function with next index
    return majorityElementRecursion(nums, hash, i + 1);
}

//TC: O(n)   same as looping over
//SC: O(n)   due to hash

//To call it-
let MAJORITY_ELEMENT_ARR = [1, 3, 2, 1, 4, 1, 1];

console.log(majorityElementRecursion(MAJORITY_ELEMENT_ARR)); //no need to specify hash and start index