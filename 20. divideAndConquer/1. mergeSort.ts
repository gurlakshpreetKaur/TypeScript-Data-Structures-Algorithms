//leetCode link: https://leetcode.com/problems/sort-an-array/
//
//Reference: https://stackabuse.com/merge-sort-in-javascript/  (VERY useful)
//
//Q:Write an algorithm that recursively sorts an array in O(nlogn) time complexity.
//
//One of the fastest sorting algorithms is merge sort. it is so fact, infact, that the inbuilt sort algorithm that
//  is used when running a website on google is a combination of 2 sorting algorithms, one of which is merge sort.
//
//Merge sort is defined as a sorting algorithm that works by dividing an array into smaller subarrays, sorting each
// subarray, and then merging the sorted subarrays back together to form the final sorted array.
//
//Think of it as a recursive algorithm continuously splits the array in half until it cannot be further divided.
//This means that if the array becomes empty or has only one element left, the dividing will stop, i.e.
//  it is the base case to stop the recursion. If the array has multiple elements, split the array into halves and
//  recursively invoke the merge sort on each of the halves. Finally, when both halves are sorted, the merge
//  operation is applied. Merge operation is the process of taking two smaller sorted arrays and combining them
//  to eventually make a larger one.
//
//Let's say the given array is-
//  [5, 3, 2, 4, 1]
//  We will sort it in ascending array
//
//  [5, 3, 2, 4, 1]
//    Step 1- calcalate start and end index
//              start index = 0,
//              end index = arr.length - 1 = 5 - 1 = 4
//    Step 2- calculate mid index
//              mid = (start + end)/2 = 4 / 2 = 2
//    Step 3- divide array into 2 halves using start, mid and end index
//              [5, 3, 2, 4, 1]
//                  /     \
//             [5, 3, 2]  [4, 1]
//    Step 4- call the sort function with these two subarrays
//              [5, 3, 2]
//              Step 4.1.1- start = 0
//                          end = 2
//              Step 4.1.2- mid = 2/2 = 1
//              Step 4.1.3- divide into 2
//                          [5, 3, 2]
//                           /    \
//                        [5, 3]  [2]
//              Step 4.1.4- call sort function which these 2 subarrays
//                        [5, 3]
//                        Step 4.1.4.1- start = 0, end = 1
//                        Step 4.1.4.2- mid = 0
//                        Step 4.1.4.3- divide into 2
//                                          [5, 3]
//                                          /   \
//                                         [5]  [3]
//                         [2] this is a single element, so we dont call the function on it
//              [4, 1]
//              Step 4.2.1- start = 0, end = 1
//              Step 4.2.2- mid = 0
//              Step 4.2.3- divide into 2 arrays
//                      [4, 1]
//                      /   \
//                     [4]  [1]
//                  Both arrays are of length 1, so we dont call the function on it.
//    Step 5- At this point, all our items have been divided into single element subarrays, now we will combine them
//              in a manner such that they become sorted.
//                  First we will combine the left side, then the right side, then merge the 2.
//                      5, 3, 2 => 2, 3, 5
//                      4, 1 => 1, 4
//
//                      2, 3, 5    1, 4
//
//                      1 < 2, so one is the smallest element (out of the smallest element of the 2 arrays)
//                      2 < 4, so 2 is the 2nd smallest element
//                      3 < 4, so 3 is the 3rd smallest element
//                      5 > 4, so 4 is the 4th smallest element
//                      5 is the last element, so it is the greatest
//
//                      Now we put this in an auxiliary array, and that array will be sorted
//
//          [5, 3, 2, 4, 1]
//              /       \
//        [5, 3, 2]   [4, 1]
//            / \      / \
//      [5, 3] [2]   [4] [1]
//       / \     /    \  /
//     [5] [3]  /    [1, 4]
//      \  /   /        /
//     [3, 5] /        /
//        \  /        /
//      [2, 5, 3]  [1, 4]
//          \         /
//         [1, 2, 3, 4, 5]
//
//
//Pseudocode-
//  step 1: start
//  step 2: declare array and left, right, mid variable
//  step 3: perform merge function.
//      if left > right
//          return
//      mid= (left+right)/2
//      mergesort(array, left, mid)
//      mergesort(array, mid+1, right)
//      merge(array, left, mid, right)
//  step 4: Stop
//
//This is actually pretty complex, so its okay if you dont understand it easily. You *will* need to revisit it
//  a few times.

//we make start and end optional params, so if they are undefined we assume start to be 0, and end to arr.length-1,
//  this just makes it a little easier to call later.
function mergeSort(arr: number[]) {
    if (arr.length === 1 || arr.length === 0) { //if theres only 1 (or somehow 0 elements), now pointing in spliting
        //                                      further, so just return the input array
        return arr;
    }

    let half = Math.floor((arr.length) / 2); //calculate half index as half of the length of the array

    let firstHalf = arr.splice(0, half); //what this does is that it takes elements from 0 to half, and removes
    //  them from orginal array, but returns them too. so the first half it stored now in this var, and the
    //  arr var has been modified to the second half.

    //create function merge, which we will use to later merge the array
    function merge(left: number[], right: number[]) {

        let sol: number[] = []; //this will store solution

        while (left.length && right.length) { //while the indices are less than lengths
            if (left[0] < right[0]) { //if 0th element of left is less than 0th element of right
                sol.push(left.shift() as number);  //push first element, and then remove it so that the next element
                //  becomes the new first element
            } else {
                sol.push(right.shift() as number); //push first element, and then remove it so that the next element
                //  becomes the new first element
            }
        }

        //we might have some left over elements if the lengths of left and right are now the same. since we
        //  modified the array each time in the while loop, we can just spread them to get the left overs and
        //  add to the sol array. It is noteworthy that BOTH CANNOT BE EMPTY, either 1 will be empty.
        //So here, either the left elements will be added, or right elements will be added, depending on which
        //  has left over items.
        return [...sol, ...left, ...right];
    }

    return merge(mergeSort(firstHalf), mergeSort(arr));
}

//You will need to revisit it several times, and do try to code it on your own.
//TC: O(nlogn)
//SC: O(n)    as we declared that aux array