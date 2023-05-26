//Q:There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).
//  Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such
//  that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
//  For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].
//  Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not
//  in nums.

//Brute force: 2 nested loops. you know how to do it. outer loop i inner loop j. if ith item and jth item add up
//  to target, return true, else false.

//Optimized approach:
//  Since the array is SORTED AND ROTATED, if we find the pivot, we can simply peform a 2-pointer and find the
//      answer.
//  So, how do we find the pivot?
//      let take this array as an example-
//              [2,5,6,0,0,1,2]
//      Here clearly, the array from index 0-2 is sorted, then theres a break at index 3-6 and they're also sorted.
//      The pivot is 3, if the array were sorted ([0, 0, 1, 2, 2, 5, 6]), you can see that the 4th element has been
//          made the first element. The new element at (4-1)th index (0) is the starting of the 2nd sorted split part.
//      Observe something.
//                [2,5,6,0,0,1,2]
//                       ^ this element
//          for the entire rest of the array, the (i-1)th element is less than (i)th element, as the array is
//              sorted in non-decreasing order. BUT for the item at the pivot index, the item before it
//              is greater than it.
//          So this way, we know that if we loop over the array, and check for every element, then we can find
//          the pivot.
//
//After finding the pivot, we can split the array into 2, and combine it in the right order, then perform 2-pointer.

function TwoSumInRotatedSortedArray(nums: number[], target: number): boolean {
    //first, calcualate the pivot. create a variable to store the pivot and set it to 0.
    let pivot = 0;

    //now loop over the entire array, and check if the item before it is greater than the current item, if so,
    //  then current index is the pointer. Also in the same step, we can also check if the item before and the
    //  current item add up to target. this is just a small optimization.
    //start the loop from 1, as to find the previous item, we will need to substract 1 from i any way.
    for (let i = 1; i < nums.length; i++) {
        if ((nums[i - 1] + nums[i]) === target) return true; //if two nums add up to target, we found soluton
        //  so return true
        if (nums[i - 1] > nums[i]) { //if previous item is greater than current item, we found pivot. so set pivot
            //  to i-1 and break
            pivot = i;
            break;
        }
    }

    //now that we know the pivot, lets split the array and combine in a way such that we get wholely sorted array
    let secondHalf = nums.slice(0, pivot); //array until pivot is second half, due to being rotated that way
    let firstHalf = nums.slice(pivot, nums.length); //array after pivot is first half
    let sortedNums = firstHalf.concat(secondHalf); //combine the parts in the right order to get wholely sorted arr

    //now, perform the 2-pointer approach just the same
    let left = 0;
    let right = sortedNums.length - 1;

    while (left < right) {
        let sum = sortedNums[left] + sortedNums[right];

        if (sum === target) return true;

        if (sum > target) right--;
        else left++;
    }

    //if solution wasnt found, return false
    return false;
}

//TC: O(n)   we only used linear loops, and 2-pointer is linear too
//SC: O(n)   due created a sorted version of array

//MORE OPTIMIZED SIGMA ALPHA GIGACHAD APPROACH: use modular arithmetic
//Currently, the best we've done is to sort the array using the pivot, but that given us O(n) SC, due to that extra
//  array. But now, we can reduce that time. How?
//      [2,5,6,0,0,1,2]
//  Here, pivot is 4. the 2nd array starts at index 3. So, if put our left pointer there, and put the right
//      pointer 1 before that like this-
//      [2,5,6,0,0,1,2]
//           ^R^L
//      Then we can just move forward and backward exactly the way we did in the usual 2-pointer BUT what if we
//  reach end of array? We need a way to go back to the start. For this we use modular arithmetic.
//  If left is at last index, we can take mod length of array to get back to 0. with this same logic, we will
//      work with the right pointer too.

function TwoSumInRotatedSortedArrayModular(nums: number[], target: number): boolean {
    //calculate pivot the same
    let pivot = 0;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] > nums[i]) {
            pivot = i;
        }
    }

    //now, instead of the aux array, we can use modular arithmetic to do the 2-pointer
    //first, set left equal to pivot, since that is where the left side of the wholely sorted array would start.
    //and set right to (pivot-1+nums.length)%nums.length. pivot-1 is where the wholely sorted array would end, and
    //we take mod with nums.length because if there is no pivot (if the array is already wholely sorted) then doing
    // pivot-1 would return in a negative index. to fix that, we do (pivot-1+nums.length)%nums.length;
    let left = pivot;
    let right = (pivot - 1) % nums.length;

    //this time, we will change our while condition to left!==right. you could use this while condition for the
    //  normal 2-pointer too. since we only change ONE value, not both at a time, this would still work.
    while (left !== right) {

        //calculate sum
        let sum = nums[left] + nums[right];

        //if sum is target, return true
        if (sum === target) return true;

        //if sum is greater than target, then in the normal two pointer, we would do right--. but here, we will do
        //  right = (right - 1 + nums.length)%nums.length.
        if (sum > target) {
            right = (right - 1 + nums.length) % nums.length;
        } else {
            //normally in this case we would do left++, but now we will do (left+1)%nums.length, since we want to
            //  go circular around the array.
            left = (left + 1) % nums.length;
        }
    }

    //if true wasnt returned until now, then sum wasnt found, so return false.
    return false;
}

//TC: O(n)
//SC: O(1)   since we got rid of auxiliary sorted array, and used modular arithmetic, our SC is now constant.