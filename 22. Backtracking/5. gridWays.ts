//Q:Given the M*N grid of horizontal and vertical roads, find the different number of ways to go from point A (0,0)
//  to B (M-1, N-1) with 2 allowed moves- right or down.
//Note: A and B point are fixed i.e A is at top left corner and B at bottom right corner as shown in the below image
//
//  ________________
// | A |   |   |   |
// |___|___|___|___|
// |   |   |   |   |
// |___|___|___|___|
// |   |   |   |   |
// |___|___|___|_B_|   3*4 grid

//For a 3*4 grid, a few of the possible paths are-
//  ________________
// | A |   |   |   |
// |_v_|___|___|___|
// |   |   |   |   |
// |_v_|___|___|___|
// |   |   |   |   |
// |_>_|_>_|_>_|_B_|
//
//  ________________
// | A | > | > | v |
// |___|___|___|___|
// |   |   |   | v |
// |___|___|___|___|
// |   |   |   | v |
// |___|___|___|_B_|
//
//  ________________
// | A | > | v |   |
// |___|___|___|___|
// |   |   | v |   |
// |___|___|___|___|
// |   |   | > | v |
// |___|___|___|_B_|
//
//There are more possible ways too. We need to count the total ways.
//
//IMPORTANT: this question can actually be solved using a formula, which involes permutations. Number of paths
//  will always equal (((m-1)+(n-1))!)/((n-1)!(m-1)!). I won't explain it, google it. basically for each path, 
//  there will be max (m - 1) downs, and (n - 1) rights. So what we're doing is basically finding different combin-
//  ations of these rights and downs, which is the same as finding their permutations. So given (m-1) downs and 
//  (n-1) rights, the total number of ways will equal total number of permutations, so we use the permutations
//  formula, which will give us ((m+n)!)/(n!m!). If we use a loop to calculate the factorial, our algorithm could
//  run in O(m + n) TC, but we will also cover the other approach for the sake of understanding.

//For this, we will go row wise. In each row, we will loop over the columns, and we will check if it is possible
//  to go down (in the last row, it wont be possible to go down) and also if it is possible to go to the right
//  (it wont be possible in the right most column). If so, then we will go in that direction.
//We will write out base case that if the current row and column are [M-1, N-1], if so, we will return 1.
//We will write our code in such a way that is 1 is returned, it will be added to the count.

//first lets check if it is safe to do down
function isSafeToGoDown(row: number, column: number, m: number, n: number) {
    if (row === m - 1) //if it is last row
        return false; //return false
    return true; //else true will be returned
}

//function to check if it is safe to go right
function isSafeToGoRight(row: number, column: number, m: number, n: number) {
    if (column === n - 1) //if it is last column
        return false; //return false
    return true; //else true will be returned
}

function gridWays(m: number, n: number, row = 0, column = 0): number {
    if ((row === m - 1) && (column === n - 1)) { //if we are at (m-1, n-1) square, return 1 as a way has been found
        return 1;
    }

    let count = 0;

    if (isSafeToGoDown(row, column, m, n)) { //if it is safe to go down
        count += gridWays(m, n, row + 1, column); //then we allow ourselves to go and explore what happens when
        //  we go down. if we found a valid path and reached the destination, then 1 would be returned (base case),
        //  so 1 would be added to our count.
    }

    if (isSafeToGoRight(row, column, m, n)) { //if it is safe to go the right
        count += gridWays(m, n, row, column + 1); //then we allow ourselves to go and explore what happens when
        //  we go right. if we found a valid path and reached the destination, then 1 would be returned (base case),
        //  so 1 would be added to our count.
    }

    return count; //at the end, return the count
}

//TC: O(2^(m + n)) since we can go either to the right, or down, each path consists of (m + n) cells. you can try
//  it too. for each cell in the path, we call 2 function recursively, these 2 functions lead to 4 more function
//  calls recursively, so on and so forth. so if there are m+n cells to consider, and each leads to 2 function
//  RECURSIVELY, we will get a total of 2^(m+n) calls, which leads to a O(2^(m + n)) TC.
//SC: O(2^(m + n)) call stack