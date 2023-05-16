//Q: Write a bubble sort algorithm that sorts in descending order
//
//For this question, try to write it from memory, but if you can't, refer to the ascending bubble sort, and make
// sure your truly understand it, then try again.
//
//There isn't much of an explaination here, just the comments in the function
//
function descendingBubbleSort(arr: number[]): number[] {
    //the outer two loops work the same
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {

            //this part is also pretty much the same, except instead of swapping when jth element > j+1th element,
            //we swap when jth element < j+1th element. we just change the greater than to lesser than.
            //basically, this way, the smaller elements are pushed to the end, until we are only left with the
            //largest elements towards the start of the array.
            if (arr[j] < arr[j + 1]) {
                let copyOfJ = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = copyOfJ;
            }

        }
    }

    //return the array optionally, this is optional as we sorted in-place
    return arr;
}