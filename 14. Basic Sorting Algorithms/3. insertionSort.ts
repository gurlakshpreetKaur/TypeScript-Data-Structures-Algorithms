//insertion sort is the sorting algorithm that we commonly use when sorting cards
//
//how is works is we loop through each item of the array (i), and while the items before i are greater than i,
//we move it towards the start of the array, so all items before it are lesser than it. after repeating this for
//each item of the array, the elements will fall into their sorted position, and the array will be sorted.
//
//image depicting insertion sort: https://media.geeksforgeeks.org/wp-content/uploads/insertionsort.png
//
//implementation-
//1. we will first write a for loop, that goes from 1 to arr.length - 1. this time it goes even to the last element
//      because we need to do the procedure for EACH ELEMENT, no element should be skipped. we will start at 1st index
//      because there are no items before 0th element to compare with.
//2. in the for loop, we will store the current element of the array in a variable called 'key'. then we will create
//      a variable j=i-1, which means the item that occurs before ith element.
//3. we will use the j variable as an index to compare the items before the current element. we will write a while
//      loop which will run while the item at jth index is greater than key (where we have stored value of
//      the element previously). in the while loop, we will swap the elements with key, and decrement j. this way,
//      the current element will be moved a position such that all elements before it are lesser than it.
//
//For an example, please refer to https://media.geeksforgeeks.org/wp-content/uploads/insertionsort.png

function insertionSort(arr: number[]): number[] {
    //write a for loop from 1 to arr.length. we start from 1th index because there are no elements before the 0th
    //to compare with. we end at arr.length-1th index since we need to compare all items of the array, we loop
    //through the entire array.
    for (let i = 1; i < arr.length; i++) {

        //store current element in variable key
        let key = arr[i];

        //create variable j, which will store the index that comes before i
        let j = i - 1;

        //while the element at j (which means the element before current element) > key AND j >= 0 (to avoid negative
        //indices)
        while (j >= 0 && arr[j] > key) {

            //swap element at j with the element that comes after j, because the code is written in a way to ensure
            //that the element after j has the value of key. basically we are moving key value closer to the start
            //of the array, while the elements before it are greater than it. basically we are pushing all elements
            //greater than it towards to end of the array.
            arr[j + 1] = arr[j];
            arr[j] = key;

            //decrement j, to move towards the starting of the array, so that we can compare the elements before
            //current element with the current element.
            j--;

        }

    }
    //return arr (optional since this algorithm works in place) 
    return arr;

}

//TC: O(n^2)   (due to the while loop and for loop both depending on the length of the input)
//SC: O(1)     (the amount of memory used does not depend on the length of the input)