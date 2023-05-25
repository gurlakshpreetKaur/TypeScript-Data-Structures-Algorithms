//Print ANY one solution of the n-queens problem for a given number n.
//Eg: 4
//  output:
//      ..Q.
//      Q...
//      ...Q 
//      .Q..

//For this, we will write a code VERY similar to printAllWays, but we will have to make slight changes to ensure
//      that only one solution is printed.

//the isSafe function is the same
function isSafe(row: number, column: number, board: string[][]): boolean {
    function isColumnSafe(r: number, c: number): boolean {
        for (let i = 0; i < r; i++) {
            if ((board[i][c] === "Q") && (i !== r)) return false;
        }
        return true;
    }

    function isPrimaryDiagonalSafe(r: number, c: number): boolean {
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if ((board[i][j] === "Q") && (i !== r)) return false;
        }
        return true;
    }

    function isSecondaryDiagonalSafe(r: number, c: number): boolean {
        for (let i = r - 1, j = c + 1; i >= 0 && j <= board.length; i--, j++) {
            if ((board[i][j] === "Q") && (i !== r)) return false;
        }
        return true;
    }

    return isColumnSafe(row, column) && isPrimaryDiagonalSafe(row, column) && isSecondaryDiagonalSafe(row, column);
}

//write the nQueens function the same, but make it return a boolean value. when the base case is hit, it will
//      print the solution and return true, and we will use that return value to check if a solution has alreaedy
//      been printed, and exit the loop.
function nQueensPrintOneWay(n: number, board: string[][] = new Array(n).fill(false).map(a => new Array(n).fill(".")),
    row = 0): boolean {
    //if n <= 3, then print the empty board and return false, as a solution wasnt found
    if (n <= 3) {
        console.log(board);
        return false;
    }

    //if base case was hit, then a solution was found. so print the board, and return true.
    if (row === n) {
        console.log(board);
        return true;
    }

    for (let i = 0; i < n; i++) {
        if (isSafe(row, i, board)) {
            board[row][i] = "Q";

            //if the function returned true, it means a solution was found, so we can break out of the loop
            //  as we dont need to find any more solutions, and return true to exit the function.
            if (nQueensPrintOneWay(n, board, row + 1)) {
                return true;
            }

            //if we didnt break in the previous line, it means that it wasnt a solution, so we set the block
            //  back to ".";
            board[row][i] = ".";
        }
    }

    console.log(board); //if we didnt find any solutions and return, then print empty board and return false
    return false;
}

//TC & SC are the same

//to call the function-
let N_FOR_N_QUEENS_PRINT_ONE_WAY = 4;
nQueensPrintOneWay(N_FOR_N_QUEENS_PRINT_ONE_WAY);