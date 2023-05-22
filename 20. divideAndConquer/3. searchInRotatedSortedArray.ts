//leetCode link: https://leetcode.com/problems/search-in-rotated-sorted-array/

//LEARN BINARY SEARCH BEFORE COMING HERE IN THE RECURSION BASICS CHAPTER

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
//We previously solved this question in the arrays chapter using a while loop for binary search. This time,
//  we will use basically the same approach, but out binary search will be recursive.
//
//In the recursion basics chapter, I'd added a bonus practice problem, recursive binary problem.
//We will combine that with the loop version to find a recursive solution.

//give start a default value and make end optional for convenience when using
function searchInRotatedSortedArrayRecursive(arr: number[], target: number, start = 0, end?: number): number {
    //if end is undefined, calculate end as the length of the array. this will only happen in the initial function
    //  call
    if (end === undefined) end = arr.length;

    let mid = Math.floor((start + end) / 2); //calculate mid

    if (arr[mid] === target) return mid; //if mid item is equal to target, return mid as the solution
    if (arr[start] === target) return start; //if start item is equal to target, return start as the solution
    if (arr[end] === target) return end; //if end item is equal to target, return end as the solution

    if (arr[start] < arr[mid]) { //if arr[start] is less than arr[start] then this part must be sorted (in a rotated
        //sorted array)

        //we already know that target is not equal to arr[start] or arr[mid] or arr[end], due to the above 3
        //  if conditions, so now we check if target is in range of the sorted part
        if (arr[start] < target && target < arr[mid]) {

            //if it is range, then we continue our search in this range by recursively calling the function
            return searchInRotatedSortedArrayRecursive(arr, target, start + 1, mid - 1);

        } else { //else we know that it is useless to search in this range, as target CANNOT be part of it,
            //so we set the start index to mid+1, so continue our search in that range

            return searchInRotatedSortedArrayRecursive(arr, target, mid + 1, end - 1);

        }

    } else if (arr[mid] < arr[end]) { //else if 2nd part is sorted

        if (arr[mid] < target && target < arr[end]) { //check if target is in this range

            //if target is in this range, then we perform binary search in this area and return the result
            return searchInRotatedSortedArrayRecursive(arr, target, mid + 1, end - 1);

        } else { //else if target is not in this range, then no point in searching here, so we move to the 1st half

            return searchInRotatedSortedArrayRecursive(arr, target, start + 1, mid - 1);

        }

    } else return -1; //else it means target is in neither range, so return -1
}

//TC: O(logn)
//SC: O(logn)  due to the vars

//To call the function-
let SEARCH_IN_SORTED_ROTATED_ARRAY_RECURSIVE_ARR = [4, 5, 6, 7, 0, 1, 2];
let TARGET = 5;

//we dont need to specify start and end as the function assumes/calcalates it
console.log(searchInRotatedSortedArrayRecursive(SEARCH_IN_SORTED_ROTATED_ARRAY_RECURSIVE_ARR, TARGET));