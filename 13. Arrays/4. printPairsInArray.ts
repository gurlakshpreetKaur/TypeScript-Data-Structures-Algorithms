//Pairs of arrays are basically 2 a group of any 2 items from the array.
//Example-
//      arr = [1, 2, 4, 5]
//      if we start from the first index, we can pair 1 as follows-
//          [1, 2, 4, 5]
//           *  ^               => [1, 2]
//
//          [1, 2, 4, 5]
//           *     ^            => [1, 4]
//
//          [1, 2, 4, 5]
//           *        ^         => [1, 5]
//
//      then for next item 2-
//          [1, 2, 4, 5]
//           ^  *               => [2, 1]
//
//          [1, 2, 4, 5]
//              *  ^            => [2, 4]
//
//          [1, 2, 4, 5]
//              *     ^         => [2, 5]
//      And so on
//  But what we want to do is to print unique pairs. In the above example, you may have noticed that [1, 2] and
//      [2, 1] have the same items. they are duplicate pairs. we want to avoid that.
//To avoid printing duplicate pairs, we will start from current item's index + 1.
//Example-
//      arr = [1, 2, 4, 5]
//      if we start from the first index, we can pair 1 as follows-
//          [1, 2, 4, 5]
//           *  ^               => [1, 2]
//
//          [1, 2, 4, 5]
//           *     ^            => [1, 4]
//
//          [1, 2, 4, 5]
//           *        ^         => [1, 5]
//  
//      then for next item 2 at index 1, we will start printing pairs from the next index NOT FROM THE FIRST INDEX.
//          [1, 2, 4, 5]
//              *  ^            => [2, 4]
//
//          [1, 2, 4, 5]
//              *     ^         => [2, 5]
//
//          [2, 4], [2, 5]
//
//For each item in the array, there will be (arr.length - 1 - indexOfItem) pairs. This means the last item of arr
//     will not have any of its own unique pairs.
//Approach-
//1. Write a for loop with variable i from 0th index to length-1th index.
//2. In this loop, write another loop with variable j, which goes from i+1th index t0 length-1th index.
//3. In each iteration of inner loop, print ith and jth elements as a pair.

function printPairsInArrays(arr: any[]): void {
    //outer loop with var i which goes from 0 to length-1.
    for (let i = 0; i < arr.length; i++) {
        //inner loop which goes from i+1 to length-1.
        for (let j = i + 1; j < arr.length; j++) {
            //print the element at those two indices as a pair.
            console.log("[" + arr[i] + ", " + arr[j] + "]");
        }
    }
}

//TC: O(n^2)   (nested loops, both depend on length of arr)
//SC: O(1)     (constant as the memory taken does not depend on the length of arr)