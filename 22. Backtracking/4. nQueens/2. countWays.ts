//leetCode link: https://leetcode.com/problems/n-queens-ii/
//
//Q:Count the number of solutions that exist for the n queens problem for a given number n.
//Eg: 4
//  output: 2, as 2 solutions exist for n=4
//
//To solve this, we write the n-queens code to print all solution, and instead of printing the solutions, we add
//  a counter and increment it each time the base case is hit.

//You could just copy paste the code from the previous question, but I suggest writing it down as a test for
//  whether or not you actually understood it.

//same ifSafe code to check if a given square is safe to place queen
function isCurrentSpotSafe(row: number, column: number, board: string[][]): boolean {
    function isColumnSafe(r: number, c: number): boolean {
        for (let i = 0; i < r; i++) {
            if (board[i][c] === "Q" && i !== r) return false;
        }
        return true;
    }

    function isPrimaryDiagonalSafe(r: number, c: number): boolean {
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === "Q") return false;
        }
        return true;
    }

    function isSecondaryDiagonalSafe(r: number, c: number): boolean {
        for (let i = r - 1, j = c + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] === "Q") return false;
        }
        return true;
    }

    return isColumnSafe(row, column) && isPrimaryDiagonalSafe(row, column) && isSecondaryDiagonalSafe(row, column);
}


//create function the same, except give it a return type of number, to return the count
function nQueensCountWays(n: number, board: string[][] = new Array(n).fill(false).map(() => new Array(n).fill(".")),
    row = 0): number {
    //if n<=3, there will be no solutions, so return 0
    if (n <= 3) return 0;

    //this is base case, if row === n, in this case, return 1, as 1 new solution has been found
    if (row === n) {
        return 1;
    }

    //we will keep track of count in a count variable
    let count = 0;

    for (let i = 0; i < n; i++) {
        if (isCurrentSpotSafe(row, i, board)) {
            board[row][i] = "Q";
            //rather than just calling the function, add its return to count. if 1 was return, count will be
            //  incremented, else it just means that the solution wasnt found with this setup, so we go to next index
            count += nQueensCountWays(n, board, row + 1);
            board[row][i] = ".";
        }
    }

    //at the end, return count
    return count;
}

//TC: same (O(n!))
//SC: same (O(n^2))

//to call the function-
let N_FOR_N_QUEENS_COUNT_WAYS = 4;
console.log(nQueensCountWays(N_FOR_N_QUEENS_COUNT_WAYS));