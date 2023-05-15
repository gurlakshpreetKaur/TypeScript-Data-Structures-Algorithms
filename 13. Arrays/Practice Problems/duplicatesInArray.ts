//leetCode link: https://leetcode.com/problems/contains-duplicate/

//Q: Given an integer array nums, return true if any value appears at least twice in the array, and return false 
//  if every element is distinct.
//
//Examples-
// nums = [1, 2, 3, 4, 4, 5, 0, 1]
// Output: true
//
// nums = [1, 2, 3, 4, 5]
// Output: false
//For this question, we have to compare each item of the array with each other item of the array, so, the intuitive
//  approach is a nested loop, as such-
//

function arrayContainsDuplicatesNaive<T>(nums: T[]): boolean {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; i++) {
            if (nums[i] === nums[j]) return true;
        }
    }
    return false;
}
//
//
//BUT this is slow. Is it of time complexity O(n^2).
//
//What we can do, instead, is to transfer the weight of one of the loops from the time complexity to the space
//  complexity
//We can create an object or Map. It will be initialized as an empty object.
//Then we can run a loop, and each time, we will check if the value exists in the object. If it doesn't exist, we
//  will add it, but if it does alrady exist, that means it has been encountered before, and is hence a duplicate.

function duplicatesInArraySmart(nums: any[]): boolean {
    //create an object to store items
    let hash = {};
    //run a loop through the entire array
    for (let i = 0; i < nums.length; i++) {
        //in each iteration, check if item already exists in hash
        if (hash[nums[i]] !== undefined) {
            //if it already exists, that means the item was previously added by us. which means is it a duplicate
            //so we return true and exit the function
            return true;
        }
        //if it doesn't exist in hash, that means it hasn't been encountered yet, so we add it to the hash to ensure
        //that we are able to find all duplicates
        hash[nums[i]] = true;
    }
    //if the loop was completed without exiting, that means no duplicates were found. so we return false
    return false;
}

//TC: O(n)    (we run a single loop, which depends on the length of the input array)
//SC: O(n)    (we declared the hash object, and the memory depends on the length of the input array)