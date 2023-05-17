//Q:Print the number of 7’s that are in a given 2d array of dimensions m * n;
//
//For this, we will have to check every item in the 2D array. We will keep a count of the number of 7s in a variable,
//      an increment it every time we encounter a 7.
//
//

//I have modified the function and added target param, which has a default value of 7. so if it is specified, this
//  function can be used to count the occurences of other numbers too.
function countTarget(arr: number[][], target = 7): number {
    //create a variable to keep track of the count of occurences
    let countOfTarget = 0;

    //loop over the 2D array using nested loops
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            //if item equal target, then increment countOfTarget
            if (arr[i][j] === target) countOfTarget++;
        }
    }

    //print countOfTarget and return it
    console.log(countOfTarget);
    return countOfTarget;
}

//TC: O(m*n)  The inner loop will iterate in total m*n times, where m is row count, and m is column count.
//SC: O(1)    The memory taken up by this function is not dependent on the length of the input array.