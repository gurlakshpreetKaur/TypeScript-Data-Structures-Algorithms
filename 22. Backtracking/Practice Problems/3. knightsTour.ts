//Q:Given a N*N board with the Knight placed on the first block of an empty board. Moving according to the rules 
//  of chess knight must visit each square exactly once. Print the order of each cell in which they are visited.
//
//In chess, the way a knight moves it it moves 2 steps in one direction, then a 90deg turn and one step.
//  At most, a knight can have 8 possible moves, as follows-
//  ________________________________
// |___|___|___|___|___|___|___|___|
// |___|___|___|___|___|___|___|___|
// |___|___|_*_|___|_*_|___|___|___|
// |___|_*_|___|___|___|_*_|___|___|
// |___|___|___|_K_|___|___|___|___|
// |___|_*_|___|___|___|_*_|___|___|
// |___|___|_*_|___|_*_|___|___|___|
// |___|___|___|___|___|___|___|___|
//
//Our problem is that a knight will be placed on the FIRST square. that is, [0, 0]. the board will be n*n, given
//  as input to us. We need to move in a way such that ALL SQUARES OF THE BOARD ARE COVERED, and replace each
//  cell with the order in which it will be visited. so [0, 0] will have 0, since its the first square, next square
//  we visit will have 1, so on.
//Eg: N = 8
//  Output: 
//0  59  38  33  30  17   8  63
//37  34  31  60   9  62  29  16
//58   1  36  39  32  27  18   7
//35  48  41  26  61  10  15  28
//42  57   2  49  40  23   6  19
//47  50  45  54  25  20  11  14
//56  43  52   3  22  13  24   5
//51  46  55  44  53   4  21  12
//If you take a chessboard, and move the knight in this order, you will have visited the ENTIRE chessboard,
//  and each square would be visited EXACTLY ONCE.
//
//So, how do we write the algorithm for this?
//First, lets think of a way to calculate all possible moves of the knight on a given square.
//
//For this, we will need board as input, and also the current row and column of the knight. We will return the
//  possible squares as a combination of row and column indices, in form of a 2D array.
function possibleMoves(board: number[][], row: number, column: number): { down: number, right: number }[] {
    //now, we know there can be atmost 8 moves. so we will check for all eight combinations, but that happens
    //  when we are at the CENTER of the board. at the corner, only 2 moves are possible, so to chech how
    //  many moves are even possible, we will check how close or far we are from the center first.

    let possibleMoves: { down: number, right: number }[] = []; //this will store the possible moves
    //The way the possible moves array will store the moves will be in form of object or arrays. so if a possible
    //move is 2 right 1 down, then we will push {down: 1, right: 2} to the array. if a possible move is 2 LEFT
    //1 DOWN, then we will add {down: -1, right -2} to the array.

    if (row <= board.length - 1 - 2) {//check if we are ATLEAST 2 squares away from the last row.
        //if this is true, it means we can move 2 to the down

        if ((column >= 1) && (board[row + 2][column - 1] === 0)) { //if column is greater than or equal to one, 
            //then we can make 1 move left. so our combination is 2 down 1 left, and we can add that to solutions.
            //BUT we need to check if that square has already been visited. if it hasnt been visited, then it would
            //be 0, else it would be some other number.
            possibleMoves.push({ down: 2, right: -1 });
        }

        if ((column <= board.length - 1 - 1) && (board[row + 2][column + 1] === 0)) { //if the column is less 
            //than or equal to the 2nd last column, then we can move to the right, but we also need to check
            //if it already has been visited. if it hasnt been visited, then add it to possible moves.
            possibleMoves.push({ down: 2, right: 1 });
        }
    }

    if (row >= 2) { //check if we are ATLEAST 2 squares away from the top.
        //if this is true, it means we can move 2 to the top

        if ((column >= 1) && (board[row - 2][column - 1] === 0) && (row - 2 !== 0) && (column - 1 !== 0)) {
            //if column is greater than or equal to one,
            // then we can make 1 move left. so our combination is 2 up 1 left, and we can add that to solutions
            //Here we also need to ensure that we do not go back to square 0, so add a conditions for those indices
            possibleMoves.push({ down: -2, right: -1 });
        }

        if ((column <= board.length - 1 - 1) && (board[row - 2][column + 1] === 0)) { //if the column is less than or 
            // equal to the 2nd last column, then we can move to the right.
            possibleMoves.push({ down: -2, right: 1 });
        }
    }

    if (column >= 2) {  //check is we are ATLEAST 2 squares from the left
        //if this it true, then we can move 2 to the right

        if ((row >= 1) && (board[row - 1][column - 2] === 0) && (row - 1 !== 0) && (column - 2 !== 0)) {
            //if row is greater than equal to 1, then we can
            // move up so our combination is 1 up 2 left
            //Here we also need to ensure that we do not go back to square 0, so add a conditions for those indices
            possibleMoves.push({ down: -1, right: -2 });
        }

        if ((row <= board.length - 1 - 1) && (board[row + 1][column - 2] === 0)) {  //if row is less than the 
            // 2nd last row, than we can move one down so our combination is 1 down 2 left
            possibleMoves.push({ down: 1, right: -2 });
        }
    }

    if (column <= board.length - 1 - 2) {  //check is we are ATLEAST 2 squares from the right
        //if this it true, then we can move 2 to the right

        if ((row >= 1) && (board[row - 1][column + 2] === 0)) {  //if row is greater than equal to 1, then we can move one up.
            //so our combination is 1 up 2 right
            possibleMoves.push({ down: -1, right: 2 });
        }

        if ((row <= board.length - 1 - 1) && (board[row + 1][column + 2] === 0)) {  //if row is less than the 
            // 2nd last row, than we can move one down so our combination is 1 down 2 right
            possibleMoves.push({ down: 1, right: 2 });
        }
    }

    return possibleMoves;
}

function knightsTour(n: number,
    board = new Array(n).fill(false).map(() => new Array(n).fill(0)),
    row = 0,
    column = 0,
    count = 0) {

    if (count === n * n) { //if count is equal to n*n (due to being 0-indexed)
        for (let i = 0; i < n; i++) console.log(board[i] + "\n"); //i used a loop to print it in a more readable
        //  way, but you can just print the board directly

        return; //that means all numbers have been added to the board, and hence all squares have been
        //  visited, so simply return the board.
    }

    //check the current possible moves
    let currentPossibleMoves = possibleMoves(board, row, column);
    if (currentPossibleMoves.length === 0) { //if there are no possible oves left
        return; //then this is not the path to the correct answer, so return from here.
    }

    //loop through the current moves
    for (var i = 0; i < currentPossibleMoves.length; i++) {
        var currentMoveSet = currentPossibleMoves[i];
        var currentDown = currentMoveSet.down;
        var currentRight = currentMoveSet.right;
        board[row + currentDown][column + currentRight] = count; //set it to count
        knightsTour(n, board, row + currentDown, column + currentRight, count + 1); //allow the possibility to
        //  sprout
        board[row + currentDown][column + currentRight] = 0; //upon returning, backtrack, and set again to 0.
    }
}

knightsTour(6);

//O(8^(n^2)) There are n^2 Cells and for each, we have a maximum of 8 possible moves to choose from, so the worst 
//  running time is O(8^(n^2))
//SC: O(n^2)  due to the chess grid we created

//This algorithm is EXTREMELY slow. I have a hexa-core laptop, and running the code for n=6 take more than just
//  a few seconds. this is also because we print all solutions, so it takes longer. so here is the code for
//  print 1 solution-

function knightsTourSingleSolution(n: number,
    board = new Array(n).fill(false).map(() => new Array(n).fill(0)),
    row = 0,
    column = 0,
    count = 0): boolean { //return a boolean so we can track if a solution was found

    if (count === n * n) { //if count is equal to n*n (due to being 0-indexed)
        for (let i = 0; i < n; i++) console.log(board[i] + "\n"); //i used a loop to print it in a more readable
        //  way, but you can just print the board directly

        return true; //that means all numbers have been added to the board, and hence all squares have been
        //  visited, so simply return the board. return true, as a solution has been found.
    }

    //check the current possible moves
    let currentPossibleMoves = possibleMoves(board, row, column);
    if (currentPossibleMoves.length === 0) { //if there are no possible oves left
        return false; //then this is not the path to the correct answer, so return from here. and return false,
        //  as this was not a solution.
    }

    //loop through the current moves
    for (var i = 0; i < currentPossibleMoves.length; i++) {
        var currentMoveSet = currentPossibleMoves[i];
        var currentDown = currentMoveSet.down;
        var currentRight = currentMoveSet.right;
        board[row + currentDown][column + currentRight] = count; //set it to count
        if (knightsTourSingleSolution(n, board, row + currentDown, column + currentRight, count + 1)) return true;
        //allow the possibility to sprout, if true was returned from this path, a solution was printed, so we
        //  exit from here. by returning true.
        board[row + currentDown][column + currentRight] = 0; //upon returning, backtrack, and set again to 0.
    }

    //if the loop was over, no solution was found, so return false
    return false;
}

knightsTourSingleSolution(6);