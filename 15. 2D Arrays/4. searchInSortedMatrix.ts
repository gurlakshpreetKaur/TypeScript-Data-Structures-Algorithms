//leetCode link: https://leetcode.com/problems/search-a-2d-matrix-ii/
//
//Q:Write an efficient algorithm that searches for a value target in an m x n integer matrix matrix.
//  This matrix has the following properties:
//      Integers in each row are sorted in ascending from left to right.
//      Integers in each column are sorted in ascending from top to bottom.
//
//Lets look at the different approaches we can take-
//Naive- Use nested loops to search cell of matrix, if it equals target, return true.
//       If the item does not exist in the matrix, return false
//          TC: O(n^2) due to the nested loops, SC: O(1) as the amount of memory used does not depends on the length
//                                                          of array
function searchInSortedMatrixNaive(arr: number[][], target: number): boolean {
    //first calculate m and n, where m is row count, and n is column count
    let m = arr.length;
    let n = arr[0].length;

    //write outer loop which runs row-wise
    for (let i = 0; i < m; i++) {

        //write inner loop with run column wise
        for (let j = 0; j < n; j++) {

            //if arr's current row array's current column cell is equal to target, return the row and columm in 
            //an array, with row coming first, followed by column, and exit the function
            if (arr[i][j] === target) true;
        }
    }

    //if this statement is executed, it means we checked every cell, and no cell was equal to target
    //so we return false, as it means item was not in the array.
    return false;
}

//Binary Search- since the array is sorted both row-wise and column-wise, we can first go to each row and check
//                  if target is in range between first element of row and last element of row. if it is in that
//                  range, then we can perform binary search, as the row is sorted.
//                  TC of going to each row and checking will be O(rowCount), which is O(m), and TC of binary search
//                  column-wise will be O(logn). so we multiply and get O(mlogn) TC.
//                  this same algorithm can also be perform by first checking column wise, then performing row
//                  wise binary search. in that case, TC is O(nlogm);
//                  SC is O(1) as we are simple traversing the 2D array, with just some auxiliary vars whose
//                  space is memory is not dependent on length of 2D array.
//
// Example-
//      matrix = [[1, 2, 3],
//                [4, 5, 6],
//                [7, 8, 9]]
//      target = 5
//      this matrix is sorted both column-wise and row-wise, so first we will go to each row and check if the
//          target is in range of the first and last elements of that row
//      [[1, 2, 3],     row = 0, target = 5
//       [4, 5, 6],
//       [7, 8, 9]]
//                      first element = 1, last element = 3
//                      is 5 >= 1 and 5 <= 3? no, as 5 > 3, so we move to the next row
//      [[1, 2, 3],     row = 1, target = 5
//       [4, 5, 6],
//       [7, 8, 9]]
//                      first element = 4, last element = 6
//                      is 5 >= 3 and 5 <= 6? yes, so we will perform binary search in this row
//
//      [4, 5, 6]       start = 0, end = 2
//      0th iter
//             mid = (0+2)/2 = 1
//              is 1th element === target?
//                  1th element = 5, target = 5, 5 === 5,
//                  so we return [row, mid] as our answer, which is [1, 1]
//
//  We will code this using an outer for loop row-wise to check if item is in range, then an inner while loop for
//      binary search
//  worst case is that our target is in range of all rows, so we will perform binary search n times where n is 
//      number of rows. our TC is O(mlogn)
//
function searchInSortedArrayBinarySearch(arr: number[][], target: number): boolean {
    //m and n variables to store rows and columns count
    let totalRows = arr.length; //row count
    let totalColumns = arr[0].length; //col count

    //for loop to iterate row-wise and check if target is in range of that row
    for (let currentRow = 0; currentRow < totalRows; currentRow++) {

        //if target is greater than or equal to first element of that row, and lesser than or equal to the last
        //element of that array, that means target is in range of that row (this works because rows and cols are
        //both sorted)
        if (target >= arr[currentRow][0] && target <= arr[currentRow][totalColumns - 1]) {
            //if this is true, perform binary search

            //declare start and variables
            let start = 0;
            let end = totalColumns - 1;

            //while loop for binary search
            while (start <= end) {
                //calculate mid and store current mid element in a variable
                let mid = Math.floor((start + end) / 2);
                let midElement = arr[currentRow][mid];

                //if mid element is target, return true, because element exists in 2D array
                if (midElement === target) return true;

                //if mid is greater than target it means we need to search in the first half,
                //so we make the end variable = mid-1, to end searching before mid
                if (midElement > target) {
                    end = mid - 1;
                }

                //else it means we need to search in the second half, so we make the start variable = mid+1,
                //to start the search after mid
                else {
                    start = mid + 1;
                }
            }
        }
    }

    //if this statement is executed, it means we've performed binary search everywhere possible, and still havent
    //found the element and returned. this means the element does not exist in array, so we return true.
    return false;
}

//Using the top-right or bottom-left corners- I do not now if this approach has a name, so I shall call it "using
//  the top-right or bottom-left corners". Since the 2D array is both row-wise and column-wise sorted, observe
//  an interesting property-
//
//      1   4   5   9
//      3   7   10  12
//      6   13  15  17
//      22  23  24  27
//
//  In the top right corner, the element is the largests in its row and smallest in its column. This means
//      that if we start there, and compare if target is greater than or smaller than it, we can determine a
//      direction to take. Same with the bottom left corner, where the element is largests in its row, and
//      smallest in its corner.
//  If I choose the top right corner, and take 7 as my target, here is how I can solve it-
//      1   4   5   9*
//      3   7   10  12
//      6   13  15  17
//      22  23  24  27
// The element to the left of the * is my current focus.
//      First I'll check if the star item is equal to the target, if is it equal to the target, i simply return
//          true.
//      Is * > target? 9 > 7, so yes target is greater than *. In this case, I want to move in the direction
//          where the elements are smaller than *. Since * is currently greatest in its row, we can move towards
//          the left, as all the elements in that direction are smaller than *.
//
//      1   4   5*  9
//      3   7   10  12
//      6   13  15  17
//      22  23  24  27
//      Is * === target? No
//      Is * > target? Yes, So in this case, we move to the direction where elements are greater than *.
//                      There are to such directions, to the right of *, and below the *.
//                      Since we already came from the right, there is not point going back there, so we move
//                      in the bottom direction.
//
//      1   4   5   9
//      3   7   10* 12
//      6   13  15  17
//      22  23  24  27
//      Is * === target? No
//      Is * > target? Yes, so we move in a direction where items are lesser than *. There are 2 such directions,
//                      The top and the left. Since we already came from the top, there isn't a point going back
//                      up there, so we move to the left
//
//      1   4   5   9
//      3   7*  10  12
//      6   13  15  17
//      22  23  24  27
//      Is * === target? Yes, so we return true.
//
//In this approach, if the * > target, we move to the bottom
//If target > *, we move to the left
//This works, again, because the 2D array is sorted both row-wise and column-wise in ascending order.
//This approach seems logical, but tricky to code, so do pay attention to the comments.
//
function searchInSortedMatrixUsingTheTopRightCorner(arr: number[][], target: number): boolean {
    //store row count and column count in variables
    let rowCount = arr.length;
    let colCount = arr[0].length;

    //set the current row and column variables to the index where the top right element will be
    let currentRow = 0;
    let currentCol = colCount - 1;

    //the loop should run while current row is in range of 0 and rowCount-1 and current col is in range of 0 and
    //colCount-1
    while ((currentRow >= 0) && (currentRow < rowCount) && (currentCol >= 0) && (currentCol < colCount)) {

        //store current element in a variable
        let currentElement = arr[currentRow][currentCol];

        //if current element is equal to target, them simply return true
        if (currentElement === target) return true;

        //if current element is greater than target, then there are 2 options. we can either move towards the top
        //or towards the left (as the matrix is sorted both row-wise and col-wise in ascending order). BUT since
        //we're starting from the top right corner, if the * > target, then we move to the left, and if * < target
        //then we move to the right. If we'd started from the bottom left corner, we would do the opposite.
        if (target < currentElement) {
            currentCol--;
        } else {
            currentRow++;
        }

    }

    //if we exited the loop, that means we have visited all possible cells and haven't found the target, so we 
    //return false.
    return false;
}

//TC: O(m + n)      in the worst case, the col will go from right most to 0 AND the row will go from
//                  topmost to bottommost, that is, it will go from top right corner to bottom left corner.
//                  In this case, the col will change totalColumns time, and the row with change totaLRow times.
//                  Hence, the total number of times that the loop will run totalColumns+totalRow times. In the
//                  question it is specified that the dimensions of matrix are m*n, so we can say the TC of this
//                  algorithm is O(m + n);
//SC: O(1)          the storage taken up by the algorithm in the memory and does not depend on the length of the
//                  input.