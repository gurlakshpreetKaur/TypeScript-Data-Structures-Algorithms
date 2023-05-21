//Q:Given an array nums, write a function to check if the array is sorted or not.
//
//We already know how to do this with loops, let's convert this into recursion.
//
//when does our loop end? when i === nums.length, so we will add 2nd param to the function- i, which will act as
//  our current index. BASE CASE: if i===nums.length, return true, as it means the entire array has been traversed.
//
//Our work:
//  is arr[i] > arr[i - 1]? basically this is the same as checking if current element is greater than previous
//      element. if this is false, array cannot be sorted, so we return false.
//      this also means that if the whole array is traversed and base case it hit, that is only possible if
//          false wansn't returned before, proving the array is sorted.
//
//Our recursion:
//  return isSorted(arr, i+1), so check for the next element too.

//by default index is one so function can be called without having to specify the index
function isSorted(nums: number[], index = 1) {
    if (index === nums.length) return true;

    if (nums[index] < nums[index - 1])
        //this means that current element is greater than next element, so nums isnt sorted
        return false;

    //if we made it to this statement, it means the if condition was false, so we move to the next element
    return isSorted(nums, index + 1);
}

//TC: O(n)
//SC: O(n)

//To call the function-
let NUMS_IS_SORTED = [1, 2, 3, 4, 5, 6, 7, 7, 6];
console.log(isSorted(NUMS_IS_SORTED)); //since we set default value to index, it doesnt need to be specified.