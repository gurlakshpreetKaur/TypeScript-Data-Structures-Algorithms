//leetCode link: https://leetcode.com/problems/matrix-diagonal-sum/
//
//Q:Given a square matrix mat, return the sum of the matrix diagonals.
//  Only include the sum of all the elements on the primary diagonal and all the elements on the secondary
//  diagonal that are not part of the primary diagonal.
//
//Okay, first of all, what's a primary diagonal and what's a seconday diagonal?
// Here's a reference image: https://assets.leetcode.com/uploads/2020/08/14/sample_1911.png
//OR, here's basically the same thing as the image-
//  in
//    a b c       ^ b c         a b *
//    d e f       d ^ f         d * f
//    g h i       g h ^         * h i
//          The diagonal formed by ^ is the primary diagonal
//          The diagonal formed by * is the secondary diagonal
//    Observe that because in this diagonal the number of rows and number of columns is 3, the center element
//      is common in both element
//
//BUT IN AN EVEN LENGTHED MATRIX
//    a b c d       ^ b c * 
//    e f g h       e ^ * h
//    i j k l       i * ^ l
//    m n o p       * n o ^
//          The diagonals do not intersect. So we know that the diagonals only intersect in odd lengthed matrices.
//
//So, basically, the question is to find the sum of both diagonals of the given 2D array. the given matrix is a
// square matrix. The sum should not have the intersection elements twice. For example, if we added the primary
// diagonal sum to the secondary diagonal sum in an odd lengthed matrix, the middle element would be repeated due
// to the intersection. we want to ensure that the middle element is added only once.
//
//Now, lets think of how we can find the diagonals.
//For the primary diagonal, this is simple. in row 0, the 0th element is part of the PD, in row 1, the 1th element,
//  so on and so forth.
//
//    *
// *  D    2    3   0,0 is part of the primary diagonal
//    4    5    6
//    7    8    9
//
//         *
//    1    2    3   
// *  4    D    6   1,1 is part of the primary diagonal
//    7    8    9
//
//              *
//    1    2    3   
//    4    5    6  
// *  7    8    D   2,2 is part of the primary diagonal
//
//For the secondary diagonal, lets take a look the matrix.
//
//    1    2    *   in row 0, the 2th item is part of secondary diagonal.
//    4    5    6   for row 0, the (length-1-0)th item is part of secondary diagonal
//    7    8    9   
//
//    1    2    3   in row 1, the 1th item is part of secondary diagonal.
//    4    *    6   for row 1, the (length-1-1)th item is part of secondary diagonal
//    7    8    9
//
//    1    2    3   in row 2, the 0th item is part of secondary diagonal.
//    4    5    6   for row 2, the (length-1-2)th item is part of secondary diagonal
//    *    8    9
//Here, a pattern emerges. In row i, the (length-1-i)th element will be part of the secondary diagonal.
//
//Now we know how to find the primary and secondary diagonal, so we can just sum them up using a loop.
//To eliminate the dupilcate middle, at the end we will write an if condition. If the length of matrix is odd,
// we will subtract the middle element from the sum, to eliminate the duplicate.

function diagonalSum(mat: number[][]) {
    //declare a variable to store the primary diagonal sum
    let primaryDiagonalSum = 0;
    //use a loop to find elements of the primary diagonal, and add them to the primaryDiagonalSum
    for (let i = 0; i < mat.length; i++) {
        //using the method to find primary diagonal that we discussed before to add PD to PDsum
        primaryDiagonalSum += mat[i][i];
    }

    let secondaryDiagonalSum = 0;
    for (let i = 0; i < mat.length; i++) {
        //using the method to find primary diagonal that we discussed before to add SD to SDsum
        secondaryDiagonalSum += mat[i][mat.length - 1 - i];
    }

    //sum up both diagonal sums in a variable called diagonalSum
    let diagonalSum = secondaryDiagonalSum + primaryDiagonalSum;

    //add if condition to check if length of matrix is odd
    if (mat.length % 2 === 1) {
        //if mat.length is odd
        //calculate middle index by flooring the length/2. eg. length = 3, Math.floor(length/2) = 1 = middle index
        let middleIndex = Math.floor(mat.length / 2);
        //then subtract the middle element from the diagonal sum to prevent duplicacy
        //the middle element is in the the row of the matrix, at the middle column
        //for eg. length = 3, middle index = 1, so the middle item will be at 1,1
        diagonalSum -= mat[middleIndex][middleIndex];
    }

    //return the sum
    return diagonalSum;
}

//TC: O(n)   we ran 2 loops, both which go from O to n, so we 2n, but in TC we ignore the numerical multiple, so
//              we get n; O(n) is the TC
//SC: O(1)   the amount of space taken up in memory is constant, as we didn't declare any aux arrays or object which
//              depend on the length of input