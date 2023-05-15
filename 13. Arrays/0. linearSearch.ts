//Linear search is an algorithm used to find index of a key in an array.
//How it works is, we go to each element of the array, and check if it equals the key.
//If that element equals to the key, we return the index of that element, else we continue the search.

//Example-
//  arr = [4, 9, 1, 2, 12, 5, 0, 3, 59, 8, -1]
//  key = 2
//  
//  First, we go to 0th element of array.
//        [4, 9, 1, 2, 12, 5, 0, 3, 59, 8, -1]
//         ^          
//  0th element is 4, 4 !== 2, so we continue the search.
//
//  Next, we go to 1th element of array.
//        [4, 9, 1, 2, 12, 5, 0, 3, 59, 8, -1]
//            ^          
//  1th element is 9, 9 !== 2, so we continue the search.
//
//  Next, we go to 2th element of array.
//        [4, 9, 1, 2, 12, 5, 0, 3, 59, 8, -1]
//               ^ 
//  2th element is 1, 1 !== 2, so we continue the search.
//
//  Next, we go the 3th element of array.
//        [4, 9, 1, 2, 12, 5, 0, 3, 59, 8, -1]
//                  ^ 
//  3th element is 2, 2 === 2, so we return the index, that is, 3.
//  Now, we know that in the arr, 2 is on the 3rd index.
//
//We will code this using a loop, either for or while loop can be used but for loop is prefered as it has
//  shorter syntax. You may be thinking of using for (item in arr) loop, but we can't do that since we need to keep
//  track of the index too.

function linearSearch<T extends string | number>(arr: T[], key: T): number {
    //loop through the array
    for (let i = 0; i < arr.length; i++) {
        //if item at ith index is equal to key, return i as the index
        if (arr[i] === key) return i;
    }
    //if the loop is over, that means no index was returned. this will only happen if the item was not in the
    //array. in this case, we return -1 (negative index can be used in if condition to check if the item
    //exists in the array or not).
    return -1;
}

//TC: O(n)   (due to the loop)
//SC: O(1)   (as we didn't declare any arrays or objects)