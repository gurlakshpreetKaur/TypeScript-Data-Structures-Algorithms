//Q:Inversion Count for an array indicates – how far (or close) the array is from being sorted. If the array is 
// already sorted, then the inversion count is 0, but if the array is sorted in reverse order, the inversion count 
// is the maximum. 
// Given an array arr[]. The task is to find the inversion count of arr[]. Where two elements arr[i] and arr[j] 
// form an inversion if a[i] > a[j] and i < j.
//
//Observe the definition of an inversion. Where two elements arr[i] and arr[j] form an inversion if a[i] > a[j] 
// and i < j. we will use this defintion in a modified version of merge sort to solve the question.

//Focus on the merge function, where we combine the sorted arrays. If the right element of the array is less than
//  the left element, we push it to sol array. But also, it means that at a greater index, a smaller item exists,
//  which means there is an INVERSION. not only that, but if this happens, it means an inversion will have to be
//  done on the left side for ALL ELEMENTS WHICH COME BEFORE THE ELEMENT THAT IS GREATER THAN THE RIGHT ELEMENT.
//In merge process, let i is used for indexing left sub-array and j for right sub-array. At any step in merge(), 
//  if a[i] is greater than a[j], then there are (mid – i) inversions. because left and right subarrays are sorted,
//  so all the remaining elements in left-subarray (a[i+1], a[i+2] … a[mid]) will be greater than a[j].

//We need to return the inverstion count, BUT since we sort array recursively, we also need to keep track of the
//  array itself, so in the return type, we will return an object containing the array and count.
function countInversions(arr: number[]): { arr: number[], count: number } {
    //Base case: if length of array is less than 2, return the input array itself and count as 0.
    if (arr.length < 2) return { arr: arr, count: 0 };

    //calcalate middle index
    let middle = Math.floor(arr.length / 2);

    //merge function. This too will return 
    function merge(left: number[], right: number[]): { arr: number[]; count: number } {
        //create count variable
        let count = 0;

        //create i and j to store index of left and right array
        let i = 0;
        let j = 0;

        //creare sol array
        const sol: number[] = [];

        //run a while loop while i is in range of left array, and j is in range of the right array
        while (i < left.length && i < right.length) {
            if (left[i] < right[i]) { //if left item is smaller
                sol.push(left[i]); //push it to sol
                i++; //and increment i
            } else { //else right item is less OR equal
                sol.push(right[j]); //then add the right item
                j++; //and increment j
                count += left.length - i; //Since right item ALWAYS will have a greater index, this means as
                //  inversion was made. since the left and right arrays are sorted, IF ONE ELEMENT OF LEFT IS
                //  GREATER, IT MEANS ALL ITEMS TO ITS RIGHT WILL ALSO BE GREATER. so that means the number of
                //  inversions will be length of left array - current left index, so that we get the number of
                //  items to its right. we will add this to inversion count.
            }
        }

        //return array and our count found
        return {
            arr: [...sol, ...left.slice(i), ...right.slice(j)],
            count,
        };
    }

    //recursively call for left and right array, and use object destruction (ES6) in variables
    let { arr: left, count: a } = countInversions(arr.slice(0, middle));
    let { arr: right, count: b } = countInversions(arr.slice(middle));

    //merge the 2 left and right arrays and store the merged version and a count in a variable
    let { arr: merged, count: c } = merge(left, right);

    //the array will be the merged array, and the count will be the count of the recursive operations + merging
    //  operation, so return that in form of an object.
    return { arr: merged, count: a + b + c };
}

//TC: O(nlogn)  TC of merge sort
//SC: O(n)  SC of merge sort

//to call and use the function-

let INPUT_ARRAY_FOR_INVERSION_COUNT = [3, 2, 1, 4, 0, 5];

let OUTPUT_OF_INVERSION_COUNT = countInversions(INPUT_ARRAY_FOR_INVERSION_COUNT);

console.log(OUTPUT_OF_INVERSION_COUNT.arr); //this outputs the sorted array

console.log(OUTPUT_OF_INVERSION_COUNT.count); //outputs the inversion count