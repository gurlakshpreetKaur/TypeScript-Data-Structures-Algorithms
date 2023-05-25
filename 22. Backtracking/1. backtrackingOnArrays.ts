//Q:Given an empty array of size N, write a recursive function that stores (i+1) on the ith index, and while
//  returning the each recursive call, decrement each index by 2.
//Eg: arr = [,,,,], N = 5
//      recursive call- [1, 2, 3, 4, 5]
//      returning call- [-1, 0, 1, 2, 3]

//We will solve this using recursion

//first, write the function with arr and i, where arr is input and i in index
function iEqualIPlusPlus(arr: number[], i = 0): number {
    //base case
    if (i === arr.length) { //it was said in the question that we want that going from 0 to length, we set each
        //index to i+1, so to check if this even happened correctly, we will print the array when base case is hit
        console.log("BASE CASE", arr);
        return i - 2; //we will return the index that we want to set to when going from LENGTH TO 0, that is,
        //i-2
    }

    arr[i] = i + 1; //first set each index to index + 1
    arr[i] = iEqualIPlusPlus(arr, i + 1); //then call it with next index. when base case is hit, i-2 is returned,
    //  so we set ith index to that value. this is our backtracking step

    return i - 2; //return i-2 as the update index
}

//If you dont understand, you will have to dry run it

//You can try calling the function like so-
let ARR = new Array(5);
let CALLING_FUNCTION = iEqualIPlusPlus(ARR); //will console log arr with each item being index+1
console.log(ARR); //will console log each item as (index+1)-2