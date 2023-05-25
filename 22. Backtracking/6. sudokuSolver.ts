//leetCode link: https://leetcode.com/problems/sudoku-solver/
//
//Q:Write a program to solve a Sudoku puzzle by filling the empty cells.
//  A sudoku solution must satisfy all of the following rules:
//      Each of the digits 1-9 must occur exactly once in each row.
//      Each of the digits 1-9 must occur exactly once in each column.
//      Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
//  The '.' character indicates empty cells.
//
//A sudoku, if you dont know, is a puzzle consisting of a 9x9 grid. We're given the grid with some numbers already
//  filled in some cells, our goal is to fill the empty cells in a way such that no two same numbers occur in the
//  same row, same column OR same subgrid.
//  This is a sample sudoku: https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/2
//      50px-Sudoku-by-L2G-20050714.svg.png
//
//To write an algorithm like this, first lets think of how we'll check if its safe to put a number in a given cell.
//If we're thinking of placing a number n in on a given cell, we will first need to check that entire row, then
//  that entire column AND the entire grid. If n occurs ANYWHERE in these areas, we can't place it.
//So lets write a function for this

//this function will take 4 params- the number we want to check for, its row and column, and the sudoku grid itself
function canPlaceNumberHere(n: string, row: number, column: number, sudoku: string[][]): boolean {
    //function to check if the row is safe
    function isRowSafe(r: number, n: string, board: string[][]): boolean {
        //store the current row in a variable
        let currentRow = board[r];
        //loop through the row (the limit is 9 because sudoku grid always is 9*9).
        for (let i = 0; i < 9; i++) {
            //if ANY cell of the row has same value as n, return false
            if (currentRow[i] === n) return false;
        }
        //if the loop is over, it means n wasn't found anywhere, so return true
        return true;
    }

    //function to check if the column is safe
    function isColumnSafe(c: number, n: string, board: string[][]): boolean {
        //loop through the column
        for (let i = 0; i < 9; i++) {
            //if any cell of the same column has the same value as n
            if (board[i][c] === n) return false;
        }
        //if the loop is over, it means n wasn't found anywhere, so return true
        return true;
    }

    function isGridSafe(r: number, c: number, n: string, board: string[][]): boolean {
        //to check the grid, we first need the calculate the area of the grid
        //lets calculate the start of the grid.
        //to do this, observe-
        //if it is the first grid, then the columns will start at 0, and end at 2, and same for the row.
        //lets say there is a number at [1, 2]. how do we calculate its grid?
        //to do this, we will first take the row index- 1. the simple formula is, that the start row index of the
        //  subgrid will equal Math.floor(row / 3) * 3. So when row is 1, the row grid start will be Math.floor(1/3)
        // * 3, which will be 0*3 = 0. The same formula will work for column.
        let startOfGridRow = Math.floor(r / 3) * 3;
        let startOfGridCol = Math.floor(c / 3) * 3;

        //each subgrid will consist of 3 rows and 3 columns. so lets use that to calculate the end of col.
        let endOfGridRow = startOfGridRow + 3 - 1; //the start is inclusive. try it yourself if you dont understand.
        let endOfGridCol = startOfGridCol + 3 - 1;

        //now lets loop over this area of the board, and check if any number is equal to n
        for (let i = startOfGridRow; i <= endOfGridRow; i++) {
            for (let j = startOfGridCol; j <= endOfGridCol; j++) {
                //if ANY item of the grid is equal to n, return false
                if (board[i][j] === n) return false;
            }
        }

        //if false wasn't retuned until now, that means the grid doesn't contain n, so return true
        return true;
    }

    //if any one of them is false, then the spot is not safe, so we will take AND of all three
    return isRowSafe(row, n, sudoku) && isColumnSafe(column, n, sudoku) && isGridSafe(row, column, n, sudoku);
}

//now lets write the main function which takes sudoku as input, and row as a param which will have default
//  value of 0, and return boolean value
function solveSudoku(sudoku: string[][], row = 0, col = 0): boolean {
    if (row === 9) return true; //this means the entire sudoku has been solved, as row 8 has been solved (0-INDEXED),
    //  so this is a solution. in this case, return true.

    //if current cell is empty, we need to calculate a value to put there
    if (sudoku[row][col] === ".") {

        //so we loop over possible values, that is, 1 to 9
        for (let i = 1; i <= 9; i++) {

            //we convert it to string, as our sudoku var is of type string[][]
            let n: string = i.toString();

            //if this is a safe spot
            if (canPlaceNumberHere(n, row, col, sudoku)) {
                //then set it to n
                sudoku[row][col] = n;

                //calculate next row and column. if we are at last column, we need to move to next row. else, 
                //  just move to next column
                let nextCol = col === 8 ? 0 : col + 1;
                let nextRow = col === 8 ? row + 1 : row;

                //then recursively call the solve sudoku function for new row and column, and check if true is
                //  returned. if true is returned it means that settings n in this cell was a good choice and
                //  it leads to a solution, so return true.
                //  if false was returned, then set it back to an empty cell.
                if (!solveSudoku(sudoku, nextRow, nextCol)) { //false was returned
                    sudoku[row][col] = "."; //make the cell empty
                } else {
                    return true; //else a solution was found on this path so return true, as we dont need to
                    //  continue the search
                }
            }
        }
        return false; //return false at the end. this will only happen if the entire loop finished and true
        //  wasnt returned. this means that the current path is not a path that will lead to the solution

    } else { //if current spot already has a number (puzzle already has some filled cells so this cell is one of
        //  those which are part of the puzzle itself)
        let nextCol = col === 8 ? 0 : col + 1;
        let nextRow = col === 8 ? row + 1 : row;
        return solveSudoku(sudoku, nextRow, nextCol); //then move to next cell by calculating next row and cell,
        //  and recursively calling solve sudoku function
    }
}

//TC: O(9(N*N)), For every unassigned index, there are 9 possible options so the time complexity is O(9^(n*n)). 
//SC: O(n) call stack


//Try the function-
let SUDOKO_GRID = [["7", "4", "5", "2", "1", "9", "8", "6", "3"],
["3", "8", "9", "6", "2", "5", "4", "7", "1"],
["2", "6", "1", "4", "7", "3", "9", "8", "5"],
["6", "5", "8", "1", "4", "7", "3", "9", "2"],
["1", "9", "4", "5", "3", "8", "7", "2", "6"],
["8", "3", "7", "9", "6", "2", "1", "5", "4"],
["9", "2", "6", "3", "8", "4", "5", "1", "7"],
["5", "1", "3", "7", "9", "6", "2", "4", "8"],
["4", "7", "2", "8", "5", "1", "6", "3", "9"]];

solveSudoku(SUDOKO_GRID);
for (let i = 0; i < 9; i++) {
    console.log(SUDOKO_GRID[i]); //you can directly print the grid, but this will print it row-wise for better
    //  readability.
}