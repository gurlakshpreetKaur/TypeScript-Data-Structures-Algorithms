//Q: Write a counting sort algorithm that sorts in descending order
//
//For this question, try to write it from memory, but if you can't, refer to the ascending counting sort, and make
// sure your truly understand it, then try again.
//
//There isn't much of an explaination here, just the comments in the function
//
//This solution used the updated version explained in the ascending counting sort, so it works even if the array
//  includes negative numbers.
//
function descendingCountingSort(arr: number[]): number[] {
    //find out what the min and max elements are
    let max = arr[0];
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
        else if (arr[i] < min) min = arr[i];
    }

    //create the auxiliary arrays
    let negativeAux = new Array(Math.abs(min) + 1).fill(0);
    let nonNegativeAux = new Array(Math.abs(max) + 1).fill(0);

    let sol: number[] = [];

    //add items to auxiliary arrays
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            negativeAux[Math.abs(arr[i])]++;
        } else {
            nonNegativeAux[arr[i]]++;
        }
    }

    //here is where the change occurs, we're going loop from the end of both arrays AND the non-negative auxiliary
    //array will come first because of the descending order. we want the largest numbers first, so we will start
    //with the positives and zeroes before the negatives.
    for (let i = nonNegativeAux.length - 1; i >= 0; i--) {
        if (nonNegativeAux[i] > 0) {
            for (let j = 0; i < nonNegativeAux[i]; j++) {
                sol.push(i);
            }
        }
    }

    for (let i = negativeAux.length - 1; i >= 0; i--) {
        if (negativeAux[i] > 0) {
            for (let j = 0; j < negativeAux[i]; j++) {
                sol.push(i * -1);
            }
        }
    }

    return sol;
}