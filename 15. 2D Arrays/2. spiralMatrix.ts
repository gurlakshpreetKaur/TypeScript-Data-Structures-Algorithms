//leetCode link:mhttps://leetcode.com/problems/spiral-matrix/
//
//Q:Given an m x n matrix, return all elements of the matrix in spiral order.
//
//Picture for reference: https://media.geeksforgeeks.org/wp-content/uploads/20200421034622/untitled1810.png
//
//Let's first try making out a spiral ourselves
//
// matrix = [[1, 2, 3],
//           [4, 5, 6],
//           [7, 8, 9]]
//To make a spiral, first we traverse the first row and all items to our solution
//      sol = [1, 2, 3]
// matrix = [[-, -, -],    (here - represents items that we have already traversed)
//           [4, 5, 6],
//           [7, 8, 9]]
//
//In a way, we can say, that now row 2 has become our first row, as row 1 is already done
//then we traverse the last column of matrix, starting from first row (row 2). so we have to add each last item of
//  rows start-end to our solution
//  sol = [1, 2, 3, 6, 9]
// matrix = [[-, -, -],    (here - represents items that we have already traversed)
//           [4, 5, -],
//           [7, 8, -]]
//
//Now that we have traversed the last column, we can say that the 2nd last column becomes our new last column.
//
//Now, we will add items of last row to our sol, going from last col (2nd last column) to our first col
//  sol = [1, 2, 3, 6, 9, 8, 7]
// matrix = [[-, -, -],    (here - represents items that we have already traversed)
//           [4, 5, -],
//           [-, -, -]]
//Now that we have traversed the last row, we can say that the 2nd last row has become our new last row.
//
//Now, we will add the first col items going from last row (2nd last row) to first row (also 2nd last row) to our
//  sol
//  sol = [1, 2, 3, 6, 9, 8, 7, 4]
// matrix = [[-, -, -],    (here - represents items that we have already traversed)
//           [-, 5, -],
//           [-, -, -]]
//
//Now, same as the first step, we add items of our first row (2nd row), from first col (2nd col) to last col (2nd col).
//  sol = [1, 2, 3, 6, 9, 8, 7, 4, 5]
// matrix = [[-, -, -],    (here - represents items that we have already traversed)
//           [-, -, -],
//           [-, -, -]]
//
//This way, we have covered the entire array.
//
//If the above explanation was not clear (theres only so much I can explain in my comments), refer to this-
// https://blog.devgenius.io/hello-and-welcome-to-the-spiral-matrix-523b1d14573b
// or https://www.youtube.com/watch?v=BJnMZNwUk1M 
// or YOUR COURSE.
//
function spiralMatrix(matrix: number[][]): number[] {
    //declare solution array, where we will store the solution, because this is a solution array
    let sol: number[] = [];

    //declare startRow and endRow
    // when we start the function, our start row will equal 0, as we will start from the 0th row (topmost)
    let startRow = 0;
    // when we start the function, our end row will equal matrix.length-1, as this is the last row of matrix
    // initially, the end row will be the last row (bottommost)
    let endRow = matrix.length - 1;

    //declare the startCol and endCol
    // when we start the function, our start col will equal 0, as we will start from the 0th col (left most)
    let startCol = 0;
    // when we start the function, our end col will equal matrix[0].length-1, as this is the last col of matrix.
    // initially, the end col will be the last col (rightmost)
    let endCol = matrix[0].length - 1;

    //create the while loop which will run while startCol <= endCol, and startRow <= endRow. this is because in
    //matrices with an odd number of rows and columns, in the last iteration we will be left with a single row
    //or columns (or both). so we want if to run even in that case, but if startCol becomes greater than endCol
    //or startRow becomes greater than endRow, then our solution will be wrong, as we will basically start adding
    //items that have already been added.

    while (startCol <= endCol && startRow <= endRow) {
        //first loop will go from startCol to endCol, as here we are add items of startRow.
        for (let i = startCol; i <= endCol; i++) {
            //we need to check the while loop condition each time, because
            //we change the values of these vars in each iteration. so its
            //possible that at the start of the iteration, the condition
            //is true, but later down it becomes false. so to endure that
            //the loop only takes any action when the condition is true
            //we check it each time
            (startCol <= endCol && startRow <= endRow)
            sol.push(matrix[startRow][i]); //adding ith element of the startRow
        }
        startRow++; //as we added the items of startRow, we will make the next row the start row, to prevent
        //the same element from heing added twice

        //second loop will go from start row to end row, as we want to add the rightmost column of the matrix.
        //the endCol will remain constant, the row will vary as we are adding vertically
        for (let i = startRow; i <= endRow; i++) {
            (startCol <= endCol && startRow <= endRow)
            sol.push(matrix[i][endCol]);
        }
        endCol--; //as we added the items of the endCol, we can make the 2nd last column the last column, to prevent
        //the same element from heing added twice

        //this time we are adding elements of the end row, from right to left. so this loop with run from end col
        //to start row, end this time we will DECREMENT I or else you with run into an infinite loop
        for (let i = endCol; i >= startCol; i--) {
            sol.push(matrix[endRow][i]);
        }
        endRow--; //we added the items of endRow, so we get it out of the picture by making the decreasing it by 1,
        // so the row before it becomes the new end row

        //last inner loop will print the first col. it will go from endRow to startRow, and also remember to 
        //DECREMENT I, or else you may run into an infinite loop
        for (let i = endRow; i >= startRow; i--) {
            sol.push(matrix[i][startCol]);
        }
        //since startCol has been added, we remobe it from the picture by doing startCol++, so that the next col
        //becomes the new start col.
        startCol++;
    }

    return sol;
}