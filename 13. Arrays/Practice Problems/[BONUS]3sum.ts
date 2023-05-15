//leetCode link: https://leetcode.com/problems/3sum/

//Q:Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and 
//  j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.
//
//First, lets understand this question. We will be given an integer array nums. We need to write an algorithm to
//  find all triplets such that they add up to 0, and return them in form of a 2D array.
// But, we cannot repeat items which have the same index.
//For example-
//      nums = [-1, 2, 0, -2, 4, -2]
//
//      Here, [-1, -1, 2] is NOT ACCEPTABLE, because -1 occurs once in the array at index 0, and we cannot repeat
//              elements with the same array.
//      But [-2, 4, -2] is acceptable because -2 occurs twice in the array, so -2 is not repeated from the same
//              index, since is occurs at difference indices in the array.
//Also, we cannot have duplicate pairs.
//      nums = [-1, 2, 0, -2, 4, -2]
//
//      Here, we cannot include both [-2, 4, -2] and [-2, -2, 4] in the answer array. The solutions need to be 
//          unique.
//
//There are many ways to solve this question. The simplest is to use 3 nested loops, you could try that but this
//  solution does not cover that approach.
//2 very popular methods are to use a Map, or to use a 2 pointer approach.
//
//This solution covers the 2 pointer approach. To understand what the 2 pointer apporach is, please look at the
//  solution for the 2sum problem.
//
//
//
//For this question, we use a variation of the 2-pointer approach-
// Step 1: Declare 2D array sol, and initialize it with an empty array.
// Step 2: sort nums using inbuilt sort. this is very important because it helps us easily compare elements to prevent
//             dupicates.
// Step 3: create a loop from 0 to length-1. in each iteration, we will take i as a fixed point, and use it to compare
//              if the other elements and ith element together can add up to 0.
// For further explanation, please refer to the code.

function threeSum(nums: number[]): number[][] {
    //create 2D array sol and initialize as an empty array
    let sol: number[][] = [];
    //sort nums using inbuilt sort
    nums.sort((a, b) => a - b);

    //since nums is sorted, if the first element is greater than 0, we know that no negative number exists in the
    //array. This means there CANNOT exist a set of 3 numbers such that they add up to 0, because we need a -ve
    //number to cancel out the +ve so that we can end up with a 0. so, we return an empty array, as no solution
    //exists
    if (nums[0] > 0) return [];
    for (let i = 0; i < nums.length - 2; i++) {
        //if curernt element equals previous element, this means we're at a duplicate element. since the array is
        //sorted, we can be sure that if we skip the iteration each time nums[i] == nums[i - 1], we can eliminate
        //the duplicate fixed numbers.
        if (nums[i] == nums[i - 1]) continue;

        //starting 2 pointer approach from i + 1
        let start = i + 1;
        //declaring end variable as same each time as the array is sorted
        let end = nums.length - 1;

        //while start < end to use the two pointer approach
        while (start < end) {
            //calculate sum of fixed number, start element, end end element
            let sum = (nums[i] + nums[start] + nums[end]);

            //checking is sum equals 0
            if (sum === 0) {
                //if sum equals 0, add it to solution array
                sol.push([nums[i], nums[start], nums[end]]);

                //store current start element in an array
                let currentStartElement = nums[start];
                //while element at index start equal currentStartElement, we increment the start element.
                //this is done to eliminate duplicates that may arise from the start variable. there can be multiple
                //equal numbers in a row, so this is necessary
                while (nums[start] === currentStartElement && start < end) {
                    //moving towards the right, away from the initial start point
                    start++;
                }

                //repeating same procedure as with the start element
                let currentEndElement = nums[end];
                while (nums[end] === currentEndElement && start < end) {
                    //but here we move towards the left, away from the initial end point
                    end--;
                }
            }
            //if sum<0, that means we need to increase the sum. to do this we increase start index (look at sorted
            //sum solution for more details)
            else if (sum < 0) {
                //incrementing start index
                start++;
            }
            //if this piece of code is executed, that means sum>0, in this case we want to decrease the sum. to do
            //this, we do end--.(look at sorted sum solution for more details)
            else {
                end--;
            }
        }
    }
    //return sol
    return sol;
}

//TC: O(n^2)   (2 pointer approach takes O(n), and we out that in the for loop, so we get O(n^2))
//SC: O(n)     (we declared the sol array, which can vary depending on the input array)