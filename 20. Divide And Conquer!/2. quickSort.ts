//Reference: https://stackabuse.com/quicksort-in-javascript/ (also VERY useful)
//
//QuickSort is a sorting algorithm based on the Divide and Conquer algorithm that picks an element as a pivot
//  and partitions the given array around the picked pivot by placing the pivot in its correct position in the
//  sorted array. The special thing about it, is that it uses constant auxiliary space.
//
//Quick sort is slower than merge sort, in terms of worst case time complexity. The work case TC is O(n^2) but
//  average case is θ(nlogn). But while actually running the code, quick sort tends to be faster for arrays,
//  as the time taken to allocate space increases the actual runtime of merge sort.
//
//The steps taken will be as follows-
//  Select an element of the array. This element is generally called the pivot. Most often this element is either
//      the first or the last element in the array.
//  Then, rearrange the elements of the array so that all the elements to the left of the pivot are smaller than
//      the pivot and all the elements to the right are greater than the pivot. The step is called partitioning. If
//      an element is equal to the pivot, it doesn't matter on which side it goes.
//  Repeat this process individually for the left and right side of the pivot, until the array is sorted.

//
//The following example is taken from stackabuse.com-
//Consider an array of unsorted elements [7, -2, 4, 1, 6, 5, 0, -4, 2].
//  We'll choose the last element to be the pivot.
//  The step-by-step breakdown of the array would be as shown in the image below:
//
//          [7, -2, 4, 1, 6, 5, 0, -4, 2]
//                 /              \    ^pivot
//       [-2, 0, -4]    [2]     [7, 4, 1, 6, 5]
//             \  ^pivot            /   \    ^pivot
//     [-4]     \              [4, 1] [5] [7, 6]
//          [-2, 0]              \ ^pivot  \  ^pivot
//            /  ^pivot     [1] [4]    [6] [7]
//        [-2]   [0]
//
//  Obersve that the individual elements at the end are in sorted order.

//give start a default value and make end optional for convenience when using
function quickSort(arr: number[], start = 0, end?: number) { //we dont return anything as it works in place
    if (end === undefined) end = arr.length - 1; //we made end an optional parameter for convenience, so if it is
    //  undefined it must be the initial call, in this case, we set calculate it.

    if (start >= end) return; //if start>=end, it means we have sorted this part so we just return

    //lets write the partition function here, and it will return the next pivot index
    function partition(array: number[], start: number, end: number): number {
        let pivotItem = arr[end]; //make the last element the pivot item
        let pivotIndex = start; //start from the start index and we will use this index to compare elements

        for (let i = start; i < end; i++) {
            if (array[i] < pivotItem) {
                //new way of swapping using ES6 without a third var
                [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];

                //increase pivot index
                pivotIndex++;
            }
        }

        //make the pivot element the middle element, as elements to the left are lesser and elements to the right are
        //  greater
        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]

        //return the pivot index for later use
        return pivotIndex;
    }

    //call the function and store the returned pivot index in a variable this is the index of the middle element
    //  basically, where our pivot is kept. this will be used later to recursively call quick sort on the first
    //  half and the second half
    let index = partition(arr, start, end);

    //then recursively call quick sort on the first half and the second half
    //first half is the index upto before the middle element
    quickSort(arr, start, index - 1);
    //second half is the index of the elements after middle element
    quickSort(arr, index + 1, end);

    //this algorithm works in place, so we dont return anything
}

//TC: O(n^2)   due to the combination of the function call and the for loop in the partition sub-function
//SC: O(n)  each function call has constant SC, so in n function calls it becomes O(n)

//To call the function-
let QUICK_SORT_ARR = [7, -2, 4, 1, 6, 5, 0, -4, 2];

quickSort(QUICK_SORT_ARR); //call it like this as it in place. we also dont need to specify the start and end

console.log(QUICK_SORT_ARR); //use it like you would use the original array