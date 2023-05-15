//leetCode link: https://leetcode.com/problems/search-in-rotated-sorted-array/

//Q:There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your 
//function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting
// array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). 
//For example, 
//     [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
//Given the array nums after the possible rotation and an integer target, return the index of target if it is in 
//nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.
//
//The question specifies that the array is sorted, and that we need to write an algorithm with O(log n) time compl-
//ecity, which clearly means we need to use binary search.
//
//We also know that the array is possibly rotated at some pivot k.
//
//Let's take a few possibly rotated sorted arrays as examples.
//[4,5,6,7,0,1,2]
//[7,8,1,2,3,4,5,6]
//[4,5,6,7,8,1,2,3]
//[1,3]
//
//Observe-
//1. for each rotated sorted array, the middle element is either less than the first element, or greater than the 
//      last element.
//      s = start, e = end, m = mid
//     [4,5,6,7,0,1,2]
//      s     m     e
//    This array is rotated at a pivot index of 3, and here the mid element (7) is less than the end element (2).
//2. If an array is sorted in an ascending order, and unrotated, the middle element will be greater than the start 
//  element, and less than the end element. That is how ascending order works. Each element is greater than the
//     previous element.
//We will use these observations as the core of our approach.
//
//As previously said, we will be using a binary search, as the algorithm needs to have O(logn) complexity.
//
//Our approach will be as follows-
//
//1. declare start and end variables. initialize start with 0, and end with nums.length-1.
//
//2. as with a usual binary search, write a while loop, that will run while start <= end.
//
//3. in the while loop, we will check if the mid element is equal to key. if it is equal to key, we will return mid
//      as the solution. do the same with the start and end index.
//
//4. IMPORTANT- this is the most important part of our algorithm, and here we use the observation which we made
//      before.
//          We know that if nums[mid] > nums[start], then the first half is sorted.
//                       if nums[end] > nums[mid], then the second half of the array is sorted
//      With this information, we know that there can be the following cases-
//              if nums[mid] > nums[start] it means that the first half is sorted
//                      and if our target is in the range between nums[start] and nums[mid]
//                          then we can simple perform the usual binary search, by setting the end as end=mid-1,
//                          as this part is sorted AND our target lies in this range
//                      but if our target is not in this range
//                          then we know we need to look further in the array, so we set the start as start=mid+1,
//                          as we want to MOVE AHEAD, FURTHER down the array.
//              else if nums[end] > nums[mid], then the second half of the array is sorted
//                      and if our target is in the range between nums[mid] and nums[end]
//                          then we can simple perform the usual binary search, by setting the end as start=mid+1,
//                          as this part is sorted AND our target lies in this range
//                      but if our target is not in this range
//                          then we know we can discard this range, and we need to look more to the beginning of
//                          the array. so we move more towards the left by setting the end as end=mid-1;
//              else
//                      we know that our target is in neither range, so we break from the loop
//
//5. if we broke from the loop, that means the target doesnt exist in array, so we return -1;

function searchInRotatedSortedArray(nums: number[], target: number) {
    //declare start variable and initialize with 0 as this is start of our search range
    let start = 0;
    //declare end variable with initialize with nums.length - 1 as this is end of our search range
    let end = nums.length - 1;
    //write the while loop to perform binary search

    while (start <= end) {
        //calculate mid as the average of the start and end, and floor it to ensure we end up with an integer
        let mid = Math.floor((start + end) / 2);

        //if the mid element is equal to the target, return mid as the answer and exit the function
        if (nums[mid] === target) return mid;
        //if the end element is equal to the target, return end as the answer and exit the function
        if (nums[end] === target) return end;
        //if the start element is equal to the target, return start as the answer and exit the function
        if (nums[start] === target) return start;

        //if we made it to this part, it means that neither mid element, nor end element, nor start element is
        //equal to the key
        //check is first half is sorted by checking if start element is less than the mid element
        if (nums[start] < nums[mid]) {
            //if target is greater than start element (it cant equal to start element, we covered that in the if
            //statements at the start of the while loop), and less than the mid element (it cant equal to mid
            //element, we covered that in the if statements at the start of the while loop), then we can simply
            //continue the binary search as a usual binary search in the first half of the array, by setting the
            //end variable to mid - 1.
            if (target > nums[start] && target < nums[mid]) end = mid - 1;

            //if it doesnt exist in this range, we discard this range by setting start to mid + 1;
            else start = mid + 1;
        }

        //check if the second half is sorted by checking if the middle element is lesser than the end element
        else if (nums[mid] < nums[end]) {
            //if target is lesser than end element (it cant equal to start element, we covered that in the if
            //statements at the start of the while loop), and greater than the mid element (it cant equal to mid
            //element, we covered that in the if statements at the start of the while loop), then we can simply
            //continue the binary search as a usual binary search in the second half of the array, by setting the
            //start variable to mid + 1.
            if (target > nums[mid] && target < nums[end]) start = mid + 1;

            //if it doesnt exist in this range, we discard this range by setting end to mid - 1;
            else end = mid - 1;
        }

        //if neither is sorted AND nums[start] !== target, AND nums[end] !== target, AND nums[mid] !== target,
        //it means the array does not contain target, so we exit the loop.
        else break;
    }

    //if the loop was exited and this line is being executed, it means the array does not contain target. so we 
    //return -1.
    return -1;
};


//TC: O(logn)  (we performed binary search)
//SC: O(logn)  (the amount of memory taken is constant regardless of size of input)