//leetCode link: https://leetcode.com/problems/n-queens/ (slightly different as this requires you to return all
//  solutions in form of a 2D array)

//IMPORTANT QUESTION

//Q:The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each
//  other.
//  Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both
//  indicate a queen and an empty space, respectively.

//Queens, in chess, can attack in all directions- horizontally, vertically, and diagonally. So the task is
//  to place the queens in a manner that all of them are safe.
//  Eg: n = 4
//  ..Q.  .Q..
//  Q...  ...Q
//  ...Q  Q...   
//  .Q..  ..Q.
//      Here, Q represents a queen, and . represents and empty square. Notice that no 2 queens are attacking
//      each other.

//Before thinking about the backtracking stuff, lets consider how we'll ensure that 2 queens aren't attacking
//  each other.
//For horizontal checking, this is eazy. We will run a loop through the row, and check if there are more than
//  one queens, if so, then this positioning isn't safe.
//For vertical checking, we can check column wise.
//For diagonal checking, we will need 2 processes- for secondary diagonal, and primary diagonal. For the primary
//  diagonal, we will check the column and rows at same indices. For the secondary diagonal, we will check the
//  ith column from LAST for each ith row.
//
//Okay, now lets think about how we will add queens to the grid in the first space. To do this, we will go to
//  each row of the board, and at each index, we will add a queen. Then we will check if that spot is safe. If
//  it is safe, we will keep it there, else, we will change its spot.
//  Noteworthy, since we are adding row-wise, we actually dont need to check row-wise, since we will write the
//  code in a way such that there is only 1 queen in a given row at a time.

//first we will write a function to check if a given spot is safe. we need the coordinates of that spot, as
//  row and column index. and we also need the board, to check items at the indices.
//This function will return a boolean value, true if the spot is safe, and false if it is unsafe.
function isSpotSafe(row: number, column: number, board: string[][]): boolean {

    //to organise our code in a readable way, lets create seperate functions to check row-wise, column-wise,
    //  and diagonally.
    //we actually don't need to check row-wise, as we are ADDING row wise, so our function ENSURES that there
    //will never we 2 Qs in a the same row.

    //lets write column safe function to check column-wise
    function isColumnSafe(r: number, c: number): boolean {
        //lets check column wise. our column will stay constant, and the row will vary
        for (let i = 0; i < board.length; i++) {

            if ((board[i][c] === "Q") && (i !== r)) return false;
        } //if at any point, any member of the row WHICH
        //  IS NOT THE CURRENT POINT, then return false
        return true; //if the entire loop finished, it means false wasnt returned, so return true
    }

    //lets write a function for the primary diagonal
    function isPrimaryDiagonalSafe(r: number, c: number): boolean {
        //we dont need to check BELOW the cell, for the same reason that we dont need to check THE ROW
        //check primary diagonal above row
        //im not explaining this, get a pen and paper and try it on a chessboard
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] === "Q") return false;

        return true;
    }

    //lets write a function for secondary diagonal
    function isSecondaryDiagonalSafe(r: number, c: number): boolean {
        //we dont need to check BELOW the cell, for the same reason that we dont need to check THE ROW
        //check secondary diagonal above row
        //im not explaining this, get a pen and paper and try it on a chessboard
        for (let i = r - 1, j = c + 1; i >= 0 && j <= board.length; i--, j++)
            if (board[i][j] === "Q") return false;

        return true;
    }

    //call all functions and return the && (because if any one condition is false, then false should be returned)
    return isColumnSafe(row, column)
        && isPrimaryDiagonalSafe(row, column)
        && isSecondaryDiagonalSafe(row, column);
}

//You can easily shorten this function, but my goal was to make it as readable as possible for you.

//now write the main function, which takes only N as parameter, and it doesnt return anything because we just print
//  the solutiongs
//We will give board a default value of a board with no queens, this will only be used in initial call
function nQueensAllWays(n: number, board = new Array(n).fill(false).map((a) => new Array(n).fill(".")), row = 0) {
    if (n <= 3) {
        console.log(board); //if n <= 3, then there is no way to put queens in a way such that they dont attack each
        //                  other, so just print the board with dots, without any queens
        return; //and return
    }

    if (row === board.length) {
        for (let i = 0; i < board.length; i++) {
            console.log(board[i]); //you could just directly print the array, but I looped over the rows so it is
            //  easier to read
        }
        console.log("____________________"); //this is optional, this is just for us to be able to easily
        //      read the different outputs and differentiate between them
        return;
    }

    //we will recursively go row-wise, so in initial function call, row is 0, and we will loop over columns
    for (let i = 0; i < n; i++) {
        if (isSpotSafe(row, i, board)) { //we will check if the current spot is safe
            board[row][i] = "Q"; //if it is safe, we will add "Q" to the stop
            nQueensAllWays(n, board, row + 1); //then, recursively, move on to next row
            board[row][i] = "."; //upon returning from there, set current stop to ".".
            //Basically this is like "allowing the possibility to grow". So we set the column to "Q", then move
            //  on to next row, to check if settings the spot was a good choice (if the outcome is positive
            //  the base case would be hit and a solution would be printed, else, we would return from there
            //  and erase our mistake by settings it back to ".").
        }
    }
}

//TC: O(n!)  for each queen, there is 1 row. for the first queen, we can place it anywhere on the board, so there
//  are n choices. for the second queen, since the first queen would already have already been placed, so there
//  would be n-1 choices, for the third queen, n-2 choices, so on and so forth. so if you multiply them, you get
//  n!.
//SC: O(n^2)  due to the board

//to call it-
let N_QUEENS_PRINT_ALL_WAYS = 4;
nQueensAllWays(N_QUEENS_PRINT_ALL_WAYS);