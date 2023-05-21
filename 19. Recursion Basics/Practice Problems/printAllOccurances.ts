//Q:For a given integer array and a integer key, print all the indices at which k occurs in the array.
//
//We know how to solve this using loops, let's convert it into recursion. We will basically use a loop-like
//  approach. other than the integer array and key, we will also have i as a parameter, to store the index, which
//  will start with 0, and end when index becomes equal to length of array.
//
//Base case: same as the end condition of loop, the base case will be when i becomes equal to length of array.
//
//Work: we will check if item at current index is equal to target, and print it if it is.
//
//Recursion: call the function with the next index.

//we will give index a default value of 0, so that we dont have to specify the index while calling
function printAllOccurances(nums: number[], target: number, index = 0) {
    if (index === nums.length) return; //if index is length of nums, we have checked all items, so we just return

    if (nums[index] === target) //if current index is equal to target
        console.log(index); //print current index

    printAllOccurances(nums, target, index + 1); //move onto next item
}

//TC: O(n)   the function will be called n times in recursion, where n is the length of the input array
//SC: O(1)   we didnt create any auxiliary variables, so SC is O(1)

//To call the function:
let NUMS: number[] = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let TARGET: number = 3;

printAllOccurances(NUMS, TARGET); //as we gave default value to index, we don't need to specify it.