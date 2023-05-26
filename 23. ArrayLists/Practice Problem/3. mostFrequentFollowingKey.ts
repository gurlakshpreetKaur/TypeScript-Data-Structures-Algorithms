//leetCode link: https://leetcode.com/problems/most-frequent-number-following-key-in-an-array/
//
//Q:You are given a 0-indexed integer array nums. You are also given an integer key, which is present in nums.
//  For every unique integer target in nums, count the number of times target immediately follows an occurrence of 
//      key in nums. In other words, count the number of indices i such that:
//          0 <= i <= nums.length - 2,
//          nums[i] == key and,
//          nums[i + 1] == target.
//  Return the target with the maximum count. The test cases will be generated such that the target with maximum 
//      count is unique.

//Eg: Input: nums = [1,100,200,1,100], key = 1
//      Output: 100
//      Explanation: For target = 100, there are 2 occurrences at indices 1 and 4 which follow an occurrence of key.
//      No other integers follow an occurrence of key, so we return 100.

//To simiplify, we need to return the most common element that follows an occurance of key in the array.
//
//How do we do this? Well this should be simple enough for you to solve too.
//We will use a hash object, and basically first we will loop over the array and check if the current item is
//  equal to key. if the current item is key we will add NEXT item to hash. the key in the hash will be an item,
//  and the value will be the number of occurances.
//Then we will simply find which key of hash has the greatest count.

function mostFrequent(nums: number[], key: number): number {
    //create hash object first
    let hash = {};

    //then loop over the nums array. remember to stop at SECOND LAST item, because in the loop we add 1, so if
    //  we go to last index and add one, we will get an index that does not exist in the array.
    for (let i = 0; i < nums.length - 1; i++) {
        //if current item is equal to key
        if (nums[i] === key) {
            //then store the NEXT item in a variable
            let n = nums[i + 1];

            //if next item is part of hash, increase its count.
            if (hash[n] !== undefined) hash[n]++;
            //else add it to hash and set the count to 1.
            else hash[n] = 1;
        }
    }

    //now, we will find which item in hash has the greatest count.

    //for this, we will need 2 variables, maximum item, and maximum count.
    let maximumItem = -1; //this will store the solution- the item with the greatest count.
    let maximumCount = -1; //and this will store the COUNT OF THE ITEM WITH THE GREATEST COUNT.
    //so if 100 has maximum count, then maximum item will store 100, and maximum count will store the number of
    //  occurances of 100 in the array.

    //use for in loop to loop over the keys of the hash
    for (key as any in hash) {
        //if the count of current key is greater than maximum count
        if (hash[key] > maximumCount) {
            //then set the maximum count to the current count, and make the current item the maximum item.
            maximumCount = hash[key];
            maximumItem = Number(key);
        }
    }

    //at the end, return the maximum item as the solution.
    return maximumItem;
}

//TC: O(n)   due to the loop
//SC: O(n)   due to the hash