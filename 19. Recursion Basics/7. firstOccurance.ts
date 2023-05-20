//Q:Write a function that when given an integer array nums and an integer target as number, returns the index
//  of the first occurance of target in the array.
//We know how to solve this using a loop, lets convert it into recursion.
//
//Base case: the loop will end when index === nums.length, so we will add a third param: index to keep track of
//  index. our code will be written in such a way that hitting the base case means traversing the entire array,
//  which means that the item wasn't found anywhere in the array, so we will return -1.
//
//Work: if(item at current index equals target) return current index
//
//Recursion: if we didnt return, it means the target hasnt yet been found, so we will move onto to next index,
//  to check if the next item is target. we will call this function again, but increase index by 1.

//we give currentIndex a default value of 0 so that the function will work normally even if we dont specify the
//start index while calling it
function firstOccurance(nums: number[], target: number, currentIndex = 0): number {
    if (currentIndex === nums.length) return -1; //if current index is nums.length, it means the entire array has
    //been traversed and target wasn't found, so we return -1

    if (nums[currentIndex] === target) return currentIndex; //if current item equals target, return current index

    //if we made it here, it means the current item isnt equal to target, so we move onto the next item by
    //calling the function after increasing index
    return firstOccurance(nums, target, currentIndex + 1);
}

//TC: O(n)
//SC: O(n)  you know by now