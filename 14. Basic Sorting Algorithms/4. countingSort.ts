//until now, all the sorting algorithms we've looked at have been using constant space, and we've been making edits
// in place. they've also all been O(n^2) TC algorithms. Now, we're gonna look at a faster algorithm, which runs
// in O(n), with help of an auxiliary array. basically, we're transferring the weight of the nested loop to the
// memory.
//
//This algorithm is called counting sort.
//
//IMPORTANT
//Before starting, counting sort can seem easy and fun, but remember to only use it when you know the numbers
//are in a close range, and the highest value is not very large. 
//if the array is [1, 2442000], then this method is ineffective, as its time complexity AND
//space complecity, both depend on the largest item of the array.
//Also, please read through to the end, because the FIRST FUNCTION WILL NOT WORK IF THE ARRAY HAS
//ANY NEGATIVE NUMBERS, only the UPDATED VERSION WILL WORK EVEN IF THE ARRAY HAS NEGATIVE NUMBERS.
//
//Approach-
// 1. Use a loop to find the greatest number and smallest number of that array. You could also use the Math.max() and
//      the spread operator, but they have the same TC, so it is better to just implement it using a loop for the
//      same of undestanding it better, but ultimately, it doesn't really matter. We store the greatest number
//      in a variable called max, and the smallest in a variable called min. The reason we did this is explained
//      in the next step.
// 2. we create an array called aux, or any other name you want. The purpose of this array is to count the number the
//      number of times each number appears in the array. It should be created with length max+1, adjusing for 
//      0-indexing.
// 3. we create another array called sol, with same length as the input array, as we will store the solution here.
// 4. IMPORTANT- loop over the input array, and for each element, do aux[currentElement]++. basically, we use the
//               currentElement as an index, and count the total number of times that it appears in the input.
// 5. use the aux array to add items to the sol array in a sorted manner.

function countingSort(arr: number[]): number[] {
    //declare max variable and initialize with first item of array
    let max = arr[0];
    //loop from first item of array to last item of array, and compare each item with max
    for (let i = 1; i < arr.length; i++) {
        //if item is greater than max, make it the new maximum
        if (arr[i] > max) max = arr[i];
    }

    //declare aux as a number array of length (max + 1), and make every item in the array equal to 0.
    let aux: number[] = new Array(max + 1);
    for (let i = 0; i < aux.length; i++) aux[i] = 0;
    let sol: number[] = [];

    //loop over arr, and use each item as an index to increase count in the aux array
    for (let i = 0; i < arr.length; i++) {
        aux[arr[i]]++;
    }
    //now our aux array is ready. basically, aux[i] stores the count of how many times i appears in arr.
    //now, we will loop over the aux array, and if aux[i] > 0, then we push i to the solution array aux[i] times.
    //eg: arr = [3, 2, 1, 2, 2, 2] aux = [0, 1, 4, 1]
    //aux[0] is 0, that means 0 does not occur in the array
    //aux[1] is 1, so we push 1 to the sol array once
    //aux[2] is 4, that means the number 2 occurs in arr 4 times, so we push it 4 times
    //aux[3] is 1, so we push 3 to the sol array once.
    //hence, by making use of indices of arrays, we sort the array. the sol array, in this case, will be
    // [1, 2, 2, 2, 2, 3], which is the sorted version of the input

    //loop over aux
    for (let i = 0; i < aux.length; i++) {
        //if aux[i] > 0, that means that i occurs in the input array
        if (aux[i] > 0) {
            //add i to the input aux[i] times, using a loop which runs aux[i] times
            for (let k = 0; k < aux[i]; k++) {
                //in each iteration of the loop, push it to sol array
                sol.push(i);
            }
        }
    }

    return sol;
}

//TC: O(Math.max(max, arr.length))
//              (in the worst case, that is, in the final loop, it will run aux.length times, and aux.length is
//               equal to the max number of array, but if the max is less than the length of array, then it
//               will run worst case length of array, that is, when we find the maximum item of array)
//      eg: for [1, 24435341] it will run O(max), as 24435341 > arr.length, so the loop to add items to sol array
//                      at the end will run more times than the loop to find the maxiumum in the array
//          for [1, 1, 2, 1, 2, 2] it will run O(arr.length), as arr.length > max, so the loop to find the largest
//                      number will actually take more iterations that the loop to add items to sol array at the end
//SC: O(max)    (the length of the aux array depends on the maxiumum item of arr)
//
//The above approach will only work when all numbers are non-negative. why? because if we attempt to increase
//  aux[-1] or any other negative number, we would get an error, as negative indices do not exist. Our whole approach
//  is based arround aux[i] being equal to the count of the number i, it wont work for negative numbers.
//
//So, how do we write a solution that works for negative numbers too?
// Let's think of like this. we know that each negative number is a positive number*-1. we also know that we can
// make use of aux arrays. putting those two together, we now have a new approach- store positive and negative count
// in different arrays.
// we already know that the length of the positive array will depend on the max of array, same as in the approach
// that we took before, but what about negative numbers? we know that each negative number is a positive number*-1,
// so, to find the length of the negative numbers array, we will need the MINUMUM number. if the array contains
// negatives, the minumum array will always be negative. and if we take absolute value of minimum, we will get
// a positive number, will we will use for the length of the negative array.
// this minumum number can be calculated the same loop as the maxiumum number.
// in the loop where we add numbers to the aux arrays, we will write an if condition.
// if the number<0, add it to negativeAux, else add it to nonNegativeAux. 0 will also go to nonNegativeAux, and
// we know TS arrays are 0 index, so we wont run into a problem.

function countingSortUpdated(arr: number[]): number[] {
    //declare max AND MIN variable and initialize with first item of array
    let max = arr[0];
    let min = arr[0];
    //loop from first item of array to last item of array, and compare each item with max
    for (let i = 1; i < arr.length; i++) {
        //if item is greater than max, make it the new maximum
        if (arr[i] > max) max = arr[i];
        //else if item is less than min, make it the new minimum
        else if (arr[i] < min) min = arr[i];
    }

    //use max to create the nonNegativeAux, and use the min to create positiveAux.
    let nonNegativeAux: number[] = new Array(max + 1);
    let negativeAux: number[] = new Array(Math.abs(min) + 1);
    //fill both arrays with 0s
    for (let i = 0; i < nonNegativeAux.length; i++) nonNegativeAux[i] = 0;
    for (let i = 0; i < negativeAux.length; i++) negativeAux[i] = 0;

    let sol: number[] = [];

    //loop over arr to add numbers to nonNegativeAux and negativeAux
    for (let i = 0; i < arr.length; i++) {
        //use an if condition to check if this item of arr is negative
        if (arr[i] < 0) {
            //if this item is negative, increment the value in negative aux using absolute value of item as index
            negativeAux[Math.abs(arr[i])]++;
            //else it must be non negative so increment the value in positive aux using item as index
        } else {
            nonNegativeAux[arr[i]]++;
        }
    }

    //now our aux arrays are ready.

    //now we will first loop over the negativeAux, since negative numbers will always be smaller than positive
    //numbers, so they will always occur earlier in the solution array (non decreasing order);

    for (let i = 0; i < negativeAux.length; i++) {
        //if the item at index i in negativeAux is greater than 0, it means negativeI occurs in input array

        if (negativeAux[i] > 0) {
            //multiply the index by -1 to get negative 1. this is important because the indices are the absolute
            //value of item, so it is important to convert them to negative items.
            let negativeI = -1 * i;

            //run a loop which runs negativeAux[i] times, so that negativeI is push the number of times that it
            //occurs in array
            for (let j = 0; j < negativeAux[i]; j++) {
                sol.push(negativeI);
            }
        }
    }

    //now we will loop over the nonNegativeAux, and use the same procedure as the non-upated version that was
    //mentioned before
    for (let i = 0; i < nonNegativeAux.length; i++) {
        if (nonNegativeAux[i] > 0) {
            for (let j = 0; j < nonNegativeAux[i]; j++) {
                sol.push(i);
            }
        }
    }

    return sol;
}

//TC and SC are same as the un-updated version, for the same reasons