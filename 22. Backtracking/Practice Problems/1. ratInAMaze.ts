//Q:Consider a rat placed at (0, 0) in a square matrix of order N * N. It has to reach the destination at (N – 1, 
//  N – 1). Find all possible paths that the rat can take to reach from source to destination. The directions in 
//  which the rat can move are ‘U'(up), ‘D'(down), ‘L’ (left), ‘R’ (right). Value 0 at a cell in the matrix 
//  represents that it is blocked and the rat cannot move to it while value 1 at a cell in the matrix represents 
//  that rat can travel through it.
//       ____________
//      |🐀 |   |   |
//      |___|___|___|
//      |   | X |   |
//      |___|___|___|
//      | X |   |   |
//      |___|___|___|  N = 3
//  Possible paths-
//       ____________
//      |🐀 | > | v |
//      |___|___|___|
//      |   | X | v |
//      |___|___|___|
//      | X |   |:) |
//      |___|___|___|
//          In this case there is only 1 path. Output: "RRDD".
//
//Output will string with R=right, L=left, D=down, U=up

//This quesiton is similar to grid ways, except we are given an input maze with 0s and 1s, and we can move
//  in all directions.

//So we will write 4 functions- isUpSafe, isDownSafe, isLeftSafe, isRightSafe, which will be used to check which
//  directions are safe.
function isUpSafe(maze: number[][], row: number, column: number): boolean {
    if (row <= 0) return false; //in the first row, we want move upwards so return false.
    if (maze[row - 1][column] === 0) return false; //if the block obove current index is an obstacle return false.
    return true; //if it is neither of those 2, then we are safe to move above so return true.
}

//now, lets write the isLeftSafe function.
function isLeftSafe(maze: number[][], row: number, column: number): boolean {
    if (column <= 0) return false; //if we are at the 0th column, we cant move left (end of maze).
    if (maze[row][column - 1] === 0) return false; //if the block to the left is an obstacle return false.
    return true; //if neither, return true.
}

//writing the isDownSafe function
function isDownSafe(maze: number[][], row: number, column: number): boolean {
    if (row === maze.length - 1) return false; //we if are in last row, we cant move down (end of maze)
    if (maze[row + 1][column] === 0) return false; //if the block below is an obstacle, return false.
    return true; //if neither, return true.
}

//write the isRightSafe function
function isRightSafe(maze: number[][], row: number, column: number): boolean {
    if (column === maze[0].length - 1) return false; //if we are at last column, we cant move left (end of maze).
    if (maze[row][column + 1] === 0) return false; //if the right block is an obstacle, return false.
    return true;
}

//main function. we will need to take the maze as an input, and keep track of row, column, and answer string, for
//which we will use params with default values of 0, 0, and "" respectively.
function ratInAMaze(maze: number[][], row = 0, column = 0, ans = "") {
    if (row === (maze.length - 1) && column === (maze.length - 1)) {
        console.log(ans);
    }

    //create duplicate of maze
    let newMaze = new Array(maze.length).fill(0).map((a, i) => [...maze[i]]);
    // console.log(newMaze);
    // console.log(row, column);
    newMaze[row][column] = 0; //set the current position to 0 (so that we dont come back to it later)

    //check if cell above is safe
    if (isUpSafe(maze, row, column)) {
        ratInAMaze(newMaze, row - 1, column, ans + "U"); //recursively call function with up cell and add "U" to
        //  ans string

    }

    //if left cell is safe
    if (isLeftSafe(maze, row, column)) {
        ratInAMaze(newMaze, row, column - 1, ans + "L"); //recursively call function with left cell and add "L"
        //  to ans string
    }

    //if down cell is safe
    if (isDownSafe(maze, row, column)) {
        ratInAMaze(newMaze, row + 1, column, ans + "D"); //recursively call function with down cell and add "D"
        //  to down string
    }

    //if right cell is safe
    if (isRightSafe(maze, row, column)) {
        ratInAMaze(newMaze, row, column + 1, ans + "R"); //recursively call function with right cell and add "R"
        //  to right cell
    }
}

//Now even though we wrote it for all 4 directions the answer will mostly consist of only "R" and "D".
//  This is because our destination is location to the right and down of source.

//TC: O(4^n)  we can go in 4 directions, so worst case is 4^n. in each function call, at max, 4 more function calls
//          will be made, and same for these 4 functon calls. so we worst case 4^n.
//SC: O(n^2 * 4^n). in each call, we make a copy of the maze, called newMaze. multiply that by worst case TC, and
//      we get n^2 * 4^n.

//Try the function-
let MAZE_FOR_RAT = [[1, 0, 0, 0],
[1, 1, 0, 1],
[1, 1, 0, 0],
[0, 1, 1, 1]];
ratInAMaze(MAZE_FOR_RAT);