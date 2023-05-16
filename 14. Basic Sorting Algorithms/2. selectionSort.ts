//selection sort is a beginner friendly and untuitive way of sorting an array.
//
//the way it works is that we maintain two sections of the array, one with sorted items, and one with unsorted
//items. we then go through the entire array, and find a suitable item to move over to the sorted section, until
//the entire array is sorted.
//
//Example-
//lets say I have the following array-
// [3,   7,   0,   5,   6]
// and I want to sort them, what would I do?
//I'd follow this procedure-
// first, i look through the array to find the element with the smallest number
//      3   7   0   5   6
//              ^
//           smallest
// then, i move it to the side, as the "sorted part"
//      0  |  3   7   5   6
//   sorted|  unsorted    
//
//then, in the unsorted part, i once again look for the smallest element
//      0  |  3   7   5   6
//            ^
//           smallest
// then, i move that element to the sorted part
//      0   3  |  7   5   6
//
// once again, i look for the smallest element in the unsorted part
//      0   3  |  7   5   6
//                    ^
//                  smallest
// then i move it to the sorted part
//
//     0   3   5  |  7   6
//
// now that only 2 numbers are left, i know that if i find the smallest number and move it to the sorted part,
// the only remaining number left must be the largest number. so, without further comparisions after that, i can
// move it to the end of the sorted array as it is the largest number
//    0   3   5  |  7   6
//                      ^
//                    smallest
//  after moving it to the sorted part, i am left with-
//    0   3   5   6  |  7
//  now, only one number is left in the unsorted part, so, it MUST be the largest number, and now i can move it to
//  the end of the sorted array.
//
//   0   3   5   6   7
//  our array is now sorted.
//  we will follow this same approach.
//
// implementation-
// 1. create nested loops i and j. i is the outer loop, which will go from 0 to length - 1. j is the inner loop,
// which will go from i + 1 to length - 1, as in each iteration of i, the first i elements would make up the sorted
// part.
// 2. compare elements and accordingly swap
//
function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length - 1; i++) {
        let smallest = arr[i];
        let smallestsIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < smallest) {
                smallest = arr[j];
                smallestsIndex = j;
            }
        }
        let tempArrI = arr[i];
        arr[i] = smallest;
        arr[smallestsIndex] = tempArrI;
    }

    //returning arr is optional as this algorithm works in place
    return arr;
}

//TC: O(n^2)  (due to the nested loops which both depend on length of array)
//SC: O(1)    (memory taken does not depend on the length of array)