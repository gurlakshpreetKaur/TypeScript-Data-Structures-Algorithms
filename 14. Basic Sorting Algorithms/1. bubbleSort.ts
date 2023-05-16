//Bubble sort is one of the most beginner-friendly sorting algorithms.
//We'll be sorting in non-decreasing order.
//It works by comparing adjacent elements, and moving greater elements towards the end. This way, at then end,
//the greatest element will be last, the shortest element will be first in array, and the array will be sorted.
//
//In its implementation, a nested loop is used. To undestand how it works, loop at the following example-
// arr = [3, 4, 2, 5, 1]
// iteration = 0
//  we will compare adject elements, starting from 0
// arr = [3, 4, 2, 5, 1]
//        j  k  
//  is jth element > kth element? no, so we do nothing
// arr = [3, 4, 2, 5, 1]
//           j  k
//  is jth element > kth element? yes, so we swap
// arr = [3, 2, 4, 5, 1]
//              j  k
//  is jth element > kth element? no, so we do nothing
// arr = [3, 2, 4, 5, 1]
//                 j  k
//  is jth element > kth element? yes, so we swap
// arr = [3, 2, 4, 1, 5]
//  observe that the largest element has been moved to the end in the 0th iteration. this is not a coincidence.
//      in bubble sort, in each iteration we compare adjacent elements starting from 0, to length-iterationCount-1,
//      and in each iteration, the last iterationCount + 1 elements will always be sorted, and we push greater
//      elements towards the end.
// iteration = 1
// arr = [3, 2, 4, 1, 5]
//        j  k
//  is jth element > kth element, yes, so we swap
//
// arr = [2, 3, 4, 1, 5]
//           j  k
//  is jth element > kth element, no, so we do nothing
//
// arr = [2, 3, 4, 1, 5]
//              j  k
//  is jth element > kth element? yes, so we swap
//
// arr = [2, 3, 1, 4, 5]
//  observe the last 2 elements are the 2 greatest numbers in that array, and they are sorted. our 1th iteration
//       is also over.
// iteration = 2
// arr = [2, 3, 1, 4, 5]
//        j  k
//  is jth element > kth element? no, so we do nothing
//
// arr = [2, 3, 1, 4, 5]
//           j  k
//  is jth element > kth element, yes, so we swap
//
// arr = [2, 1, 3, 4, 5]
//              j  k
//  in this iteration, we don't need to compare, since we already know the last 2 numbers are the greatest
//  iteration = 3
// arr = [2, 1, 3, 4, 5]
//        j  k
//   is jth element > kth element? yes, so we swap
//
// arr = [1, 2, 3, 4, 5]
//           j  k
//  we dont need to compare now, since we already know the last 3 numbers are sorted (our iteration count is 3
//  and bubble sort has this basic principle the in the ith count of the outer loop, the last i elements will
//  always be sorted).
//
//Implementation-
//Write nested loops with variables i and j. i will act as our outer iteration counter, which will help us know
//  that the last i elements are sorted. we will use i to control the times that j runs, as we dont need to 
//  compare last i elements, j will run arr.length-1-i times. this will avoid unecessary comparisions.
//in the nested loop, we compare and swap adjacdent elements. so we compare j with j+1th element, and swap if
//  necessary

function bubbleSort(arr: number[]): number[] {
    //create outer loop that goes from 0 to arr.length - 2, why -2? we could go to arr.length - 1, but we dont,
    //because we know that by last iteration, the last ith numbers will be sorted. which means by last iteration,
    //all numbers will be sorted except for 0th element of array. if we know all other numbers of array are greater
    //than 0th element, then we dont even need to compare and check, because we can logically derive that if all
    //other numbers are greater, than the 0th element MUST be smallest. so we go to arr.length-2 to avoid
    //unecessary comparisions in that case.

    for (let iterationCount = 0; iterationCount < arr.length - 1; iterationCount++) {
        //inner loop which we will use to compare adjacent elements

        for (let j = 0; j < arr.length - iterationCount - 1; j++) {

            let k = j + 1; //j will be our first index, and k=j+1 will be the adjacent index.

            if (arr[j] > arr[k]) {
                //if the jth element > kth element, it means an item that occurs earlier in the array is greater
                //than an item that occurs later in the array. since we are sorting in non-decreasing order,
                //we will swap them so that the earlier elements are smaller than the later elements.
                let jthElementCopy = arr[j];
                arr[j] = arr[k];
                arr[k] = jthElementCopy;

            }
        }

        //this procedure will be repeated until the array is sorted.
    }

    //returning arr is optional as this algorithm works in place
    return arr;
}

//TC: O(n^2)  (due to the nested loop which depend on the length of the input array)
//SC: O(1)    (the variables which we declared do not depend on length of input array, as we swap IN PLACE)