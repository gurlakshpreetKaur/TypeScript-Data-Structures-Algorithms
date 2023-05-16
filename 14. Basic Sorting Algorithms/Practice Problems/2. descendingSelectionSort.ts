////Q: Write a selection sort algorithm that sorts in descending order
//
//For this question, try to write it from memory, but if you can't, refer to the ascending selection sort, and make
// sure your truly understand it, then try again.
//
//There isn't much of an explaination here, just the comments in the function
//
function descendingSelectionSort(arr: number[]): number[] {
    //the outer loop is the same
    for (let i = 0; i < arr.length - 1; i++) {
        //but here, instead of keeping track of min, we keep track of max
        let max = arr[i];
        let maxIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            //and also, rather than updating the variable if item is LESS than it, we want to update if item is
            //GREATER than max, rest is the same
            if (arr[j] > max) {
                max = arr[j];
                maxIndex = j;
            }
        }
        //swapping
        let itemCurr = arr[i];
        arr[i] = max;
        arr[maxIndex] = itemCurr;
    }

    //return the array optionally, this is optional as we sorted in-place
    return arr;
}