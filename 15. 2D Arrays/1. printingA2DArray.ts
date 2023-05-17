//A 2D array is an array in which each element is also an array, but for the inner array, none of its elements are
// arrays. As the levels of arrays increase, we get arrays of different dimensions.
//Eg: [1, 2, 3]   1D Array
//    [[1, 2, 3], [4, 5, 6]]   2D Array
//    [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11 12]]]    3D Array
//Basically, an array of nth dimension is an array in which each element is an array of (n - 1) dimension, and also
// a 1 dimensional array is an array in which none of the elements are arrays.
//
//A 2D array is basically like a matrix
//Eg: [[1, 2, 3], [4, 5, 6]] in form of a matrix is-
//    1    2    3
//    4    5    6
//
//Each inner array acts as a row, and each element of the inner row is a an item column wise.
//So, if we do outerArray.length, we get the number of rows in the matrix. But what if we want the number of columns?
// As previously explained, each element of the inner row is a an item column wise, so, if we want the number of
// columns, we will take length of an inner array. for this, we can simply do outerArray[0].length.
//
//To print the array, we use nested loops. Outer one keeps track of rows, inner one of each column cell of the row.
// We simple print the item at that specific index.

function printA2DArray(arr: any[][]): void {
    let rowCount = arr.length; //length of outer array
    let colCount = arr[0].length; //length of an inner array, to get column count

    //loop over each item in array, so basically we are looking at a row of the matrix at a time
    for (let i = 0; i < rowCount; i++) {
        //keep track of current row
        let thisRowsItems = "";

        //add each cell in row to the thisRowsItems string, separated by a string
        for (let j = 0; j < colCount; j++) thisRowsItems += (arr[i][j] + " ");

        //then console.log the string
        console.log(thisRowsItems);
    }
}

//TC: O(rows*cols)    though there are nested loops, the number of times that they run is equal to the number of
//                      cells. the number of cells will equal rows*cols;
//SC: O(n)   memory taken is constant