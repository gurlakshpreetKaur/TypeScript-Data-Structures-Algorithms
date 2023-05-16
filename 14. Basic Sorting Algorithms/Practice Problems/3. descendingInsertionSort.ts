//Q: Write an insertion algorithm that sorts in descending order
//
//For this question, try to write it from memory, but if you can't, refer to the ascending insertion sort, and make
// sure your truly understand it, then try again.
//
//There isn't much of an explaination here, just the comments in the function
//
function descendingInsertionSort(arr: number[]): number[] {
    //outer loop is same as ascending sort

    for (let i = 1; i < arr.length; i++) {

        //keep track of current element in variable key (same)
        let key = arr[i];
        //this paet is the same too
        let j = i - 1;

        //all we change is we change arr[j] > key to arr[j] < key, basically flip the sign, from GREATER than to
        //LESSER than
        while (arr[j] < key && j >= 0) {
            arr[j + 1] = arr[j];
            arr[j] = key;
            j--;
        }
    }

    //returning the array is optional
    return arr;
}