//Q:Print out the sum of the numbers in the second row of the “nums” array.
//
//This is the same as finding the sum of all items in 1D array, except each item we specify that we're adding items
//  from the 2nd row of a 2D array;
//
//

//I have modified the function so that it excepts an optional 2nd param row, using which it can be specified which
//  row we want to sum.
function printSumOfRow(arr: number[][], row = 2): number {
    //create variable to store sum
    let sum = 0;

    //loop over the row
    for (let i = 0; i < arr[row].length; i++) {
        //add it to sum
        sum += arr[row][i];
    }

    //print and return sum
    console.log(sum);
    return sum;
}