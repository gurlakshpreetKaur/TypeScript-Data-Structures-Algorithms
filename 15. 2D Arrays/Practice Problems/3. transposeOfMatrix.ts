//leetCode link: https://leetcode.com/problems/transpose-matrix/
//
//Q:Given a 2D integer array matrix, return the transpose of matrix. The transpose of a matrix is the matrix 
//  flipped over its main diagonal, switching the matrix's row and column indices.
//
//For example-
// matrix =
// 1 2 3
// 4 5 6
//
// transpose = 
// 1 4
// 2 5
// 3 6
//
//It is pretty clear than we will need to use another array so store the solution. Also, matrix[i][j] will always
//  equal transpose[j][i], as the rows become columns in the transpose. We will use this fact to solve the question.
//
//
function transposeMatrix(arr: number[][]): number[][] {
    //the number of rows in transpose will equal to the number of columns in the matrix.
    //so we create a solution 2D array of length matrix column count, and we fill each item with another array.
    //each inner array will equal to the row count of the input matrix.
    //basically this way the row count becomes the column count, and the column count becomes the row count.
    let transpose: number[][] = new Array(arr[0].length);
    for (let i = 0; i < transpose.length; i++) {
        transpose[i] = new Array<number>(arr.length);
    }

    //loop over input matrix, and flip indices. This is, by definition, what a transpose is.
    for (let matrixRow = 0; matrixRow < arr.length; matrixRow++) {
        for (let matrixCol = 0; matrixCol < arr[matrixRow].length; matrixCol++) {
            //the transpose row index will be the matrix col index, and the transpose col index will be the matrix
            //  row index
            let transposeRow = matrixCol;
            let transposeCol = matrixRow;

            //assign the item to the transpose indices
            transpose[transposeRow][transposeCol] = arr[matrixRow][matrixCol];
        }
    }

    //return transpose at the end
    return transpose;
}

//TC: O(n*m)     the amount of times the inner loop will run will depend on the number of cells, and the number
//                  of cells equals rowCount * colCount, which is, n*m
//SC: O(n*m)     we declared the solution array, which will store n*m items, as the input array also has n*m items