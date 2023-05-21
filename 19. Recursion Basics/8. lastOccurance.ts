//Q:Given an array nums and a number target, return the index of the LAST occurance of target in the array.
//
//This question is the same as the first occurance question, except because we want the LAST occurance, we will
//  start from the last index, and go to the 0th index.
//
//Base case: index is -1, in which case the entire has been search and item wasnt found, so return -1.
//
//work: if current item is target, return index
//
//recursion: call the function with the next item and return it

//we will set the currentIndex param to optional, so that the function can be called without specifying it.
//  in each function call, we will calculate current index. if current index wasnt specified, it means it is
//  initial function call, so we will set current index to nums.length-1. in every other call, current index would
//  already be specified so this step wouldnt be needed
function lastOccurance(nums: number[], target: number, currentIndex?: number): number {
    if (currentIndex === -1) return -1;  //if currentIndex is 0, the entire nums has been traversed and target wasnt
    //found, so return -1

    if (currentIndex === undefined) currentIndex = nums.length - 1; //if currentIndex is undefined, it means it is
    //initial call, so set it to nums.length - 1. this is basically abstraction, we are making the function easier
    //to call elsewhere.

    if (nums[currentIndex] === target) return currentIndex; //if currentIndex item is equal to target, return the
    //index

    //if this part is called, it means the target wasn't found, so call the function with currentIndex-1, basically
    //moving to the index before the current index, to check if that item is equal to the target
    return lastOccurance(nums, target, currentIndex - 1);
}

//I don't need to tell you the TC or SC by now, but still
//TC: O(n)
//SC: O(n)

//To call the function-
let NUMS_LAST_OCCURANCE = [1, 2, 4, 2, 5, 1, 2, 7, 8, 9, 0];
console.log(lastOccurance(NUMS_LAST_OCCURANCE, 2)); //since currentIndex is an optional param, we dont need to
//  specify it.