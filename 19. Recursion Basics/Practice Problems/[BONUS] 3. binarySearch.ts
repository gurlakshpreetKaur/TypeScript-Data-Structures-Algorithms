//We already know how to implement binary search using while loop, lets convert it to a recursive approach.
//
//In the usual approach, we calculate start and end points. For recursion, we will do the same, using optional
//  params.
//
//The base will be same as while condition, that is, start <= end.
//
//In each iteration, we check the same conditions that we check in usual binary search, and recursively call the
//  function again.

//assume start to be 0, and make end an optional param so we cant calculate it in initial call
function binarySearch(arr: number[], target: number, start = 0, end?: number): number {
    if (end === undefined) { //in initial call, we will check if end is undefined
        end = arr.length - 1; //if it is undefined, calculate and set it to arr.length;
    }

    if (end > start) return -1; //this is our while condition, in this case return -1 as target aint in arr.

    let mid = Math.floor((start + end) / 2); //calculate mid index

    if (arr[mid] === target) return mid; //if mid element is target, return mid as index

    if (target > arr[mid]) return binarySearch(arr, target, mid + 1, end); //if target is greater than mid element 
    //  then make mid index + 1 the start point for next function call

    //else if means that target is less than target, so make mid-1 the new end point.
    return binarySearch(arr, target, start, mid - 1);
}

//TC: O(logn)  same as normal binary search
//SC: O(logn) as we delcared that one mid variable, but if you get rid of it, it will be constant SC. in each function
//      call the number of aux vars is 1- the mid var, multiply that by the number of max function calls and it
//      becomes O(logn).

//To call this function-
let BINARY_SEARCH_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let TARGET = 5;

console.log(binarySearch(BINARY_SEARCH_ARR, TARGET)); //as start index is assumed, and end index is calculated
//  in the initial call, we dont need to specify it.