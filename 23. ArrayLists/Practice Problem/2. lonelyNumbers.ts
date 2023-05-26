//leetCode link: https://leetcode.com/problems/find-all-lonely-numbers-in-the-array/
//
//Q:You are given an integer array nums. A number x is lonely when it appears only once, and no adjacent numbers 
//      (i.e. x + 1 and x - 1) appear in the array. Return all lonely numbers in nums. You may return the answer 
//      in any order.
//Eg: [10,6,5,8]
//      output: [10, 8]
//      explanation: 
//          - 10 is a lonely number since it appears exactly once and 9 and 11 does not appear in nums.
//          - 8 is a lonely number since it appears exactly once and 7 and 9 does not appear in nums.
//          - 5 is not a lonely number since 6 appears in nums and vice versa.
//          Hence, the lonely numbers in nums are [10, 8].
//          Note that [8, 10] may also be returned.
//
//Okay, so for this question, one approach is clearly a nested loop. But that is slow and obvious, so I wont
//      explain it.

//We will look at the faster approaches. The thing is, in arrays, if you want to find an item, you have to go
//  to each index and look for it, which is slow. so our first approach will be reduce this time wastage using
//  a hashmap, which in JS, is as simple as an object.
//
//  First, we will go to each item of the array, and add it to hash. the hash will keep track of the number
//      of times that an item occurs in the array.
//  Then, we will run a second loop to go to each item of the array, and use the hash to check if it occurs
//      more than once and if its adjacent numbers occur in the array, if either is true, return it means the item
//      is not lonely, else it is lonely so we will add it to a solution array.

function lonelyNumbers(nums: number[]): number[] {
    let hash = {}; //create hash object which will store each item of array as key, and the number of times the
    //  item occurs in array as a value

    for (let i = 0; i < nums.length; i++) {
        let currentItem = nums[i]; //store current item in a variable

        if (hash[currentItem] === undefined) { //if currentitem is not in the hash
            hash[currentItem] = 1; //then add it to hash, and set its occurance as 1.
        } else { //else it means current item is already in hash, so just increase the count
            hash[currentItem]++;
        }
    }

    let sol: number[] = []; //create solution array

    //now write a second loop to check if each item is a lonely number
    for (let i = 0; i < nums.length; i++) {
        let currentItem = nums[i]; //store current item in a variable

        let occursOnlyOnce = (hash[currentItem] === 1); //check if item occurs only once

        //check if greater adjacent number doesnt occur
        let adjacentGreaterNumberDoesntOccur = (hash[currentItem + 1] === undefined);

        //check if smaller adjacent number doesnt occur
        let adjacentSmallerNumberDoesntOccur = (hash[currentItem - 1] === undefined);

        //if all three conditions are true
        if (occursOnlyOnce && adjacentGreaterNumberDoesntOccur && adjacentSmallerNumberDoesntOccur) {
            //then push current item to solutions array
            sol.push(currentItem);
        }
    }

    //return the solutions array
    return sol;
}

//TC: O(n)    due to the loops
//SC: O(n)    due to the hash AND the solution array

//Another approach you can take is by sorting the array using inbuilt function, then check adjacent items.

function lonelyNumbersSorted(nums: number[]): number[] {
    //first sort the array. this way adjacent and same numbers will 
    //be side by side
    nums.sort((a, b) => a - b);

    //create an array to store solution
    let sol: number[] = [];

    //loop over the nums array which is now sorted
    for (let i = 0; i < nums.length; i++) {
        //since nums is sorted, we can easily check if a number occurs
        //more than once by checking adjacent items of sorted array and skip
        if (nums[i - 1] === nums[i]) continue;
        if (nums[i + 1] === nums[i]) continue;

        //similary, we can check if adjacent NUMBERS to the current
        //item as in array and skip
        if ((nums[i - 1] + 1) === nums[i]) continue;
        if (nums[i + 1] === (nums[i] + 1)) continue;

        //if we didnt skip, that means all those conditions are false,
        //which means the number occurs only once, and adjacent numbers
        //dont occur. which means it is a lonely number, so add it to sol.
        sol.push(nums[i]);
    }

    //at the end, return sol
    return sol;
};

//TC: O(inbuilt sort)   the inbuilt sort will usually use timsort or quicksort, so the TC will be whatever the TC
//      of timsort or quicksort is, as timsort takes O(nlogn) and quicksort takes O(n^2) TC, our TC will be either
//      O(nlogn) or O(n^2).
//SC: O(n)       due to the sol array

//Now, it may seem that due to greater TC this algorithm will be slower, BUT in practice, it is usually faster.
//  This is because in approach 1 (without sorting) the time taken to allocate memory for hash AND the 2nd
//  for loop will weigh down the algorithm.