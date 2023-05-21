//leetCode link: https://leetcode.com/problems/powx-n/
//
//Q:Write a function pow(n, i) which returns n^i.
//
//Previously, we used the naive approach to solve this question. This time we will use the optimized approach.
//
//This approach uses properties of exponenents to bring down the function to O(logn) complexity YEAH ITS THAT
//  OPTIMIZED.
//
//Okay so imagine we have 5^7. 5^7 = (5^3 * 5^3* 5), right? Yes. We have brought down the 7 operations
//  to 3 operations. Similarly, 5^6 = (5^3 * 5^3) so this time to number of operations has reduced.
//We will implement the same in our function

function powFast(n: number, i: number) {
    if (i === 1) return n; //base case

    if (i % 2 === 0) { //if i is even
        //then we can simply split it into 2 operations
        //calculate n to the power i/2
        let iToTheHalf = powFast(n, i / 2);
        return iToTheHalf * iToTheHalf;
    } else {
        let floorIndex = Math.floor(i / 2); //odd numbers cant be evenly divided, so we will always have a greater
        //  index and a smaller index. eg 7/2 = 3.5, 3.5 is not integer, so Math.floor(2.5) gives us an integer.
        //  for we will do 7*(7^3)*(7^3).
        return powFast(n, floorIndex) * powFast(n, (n - floorIndex));
    }

}

//TC: O(logn)
//SC: O(n)

//if you're confused about how it works, this is a visual representation of our work-
//                     5^7
//                 /   \    \
//              5^3    5^3 * 5
//             /  \   /  \
//          5^2   5  5^2  5
//          / \      / \
//         5  5     5   5
// Now, look at the height of the graph. the height is 4 levels. that is our TC. The height of a graph like this
//  will always be O(logn).

//This approach does not work for negative indices

function powFastInclusive(x: number, n: number): number {
    if (n == 0) return 1; //base case 0
    if (n == 1) return x; //base case 1
    let absoluteN = Math.abs(n); //first we calculate absolute value of n
    let a: number,
        b: number,
        c = (x > 0 || n % 2 == 0) ? 1 : -1; //create 2 vars, and make c as basically a sign storing var
    //  law of exponents state that given an EVEN INDEX or a POSITIVE BASE, the result will we POSITIVE.
    //  this statement basically stores that.

    a = powFastInclusive(x, Math.floor(absoluteN / 2)); //recursive operation
    if (absoluteN % 2 == 0) { //if absolute value of n is even
        b = 1; //make b = 1, you will see why later
    } else {
        b = Math.abs(x); //else make it equal to absolute value of x
    }
    if (n < 0) { //IF INDEX IS POSITIVE
        return c / (a * a * b); //return sign / (powRecursiveVar * powRecursiveVar * b)
        //lets break that down
        //sign variable (c) stores either 1 or -1 one. basically this helps ensure that this function also
        //  works when x < 0. a stores the value of the recursive operation, and b stores either x or 1.
        //  this is important because when n is even, b becomes 1, as a stores x^(n/2), so multiplying by itself
        //  gives up x^n, then *b gives us *1, which wont change anything. But it makes a difference when n is
        //  odd, x^(Math.floor(n / 2)) * x^(Math.floor(n / 2)) does NOT give us x^n, it gives is x^(n - 1) (as
        // 0.5 is lost in each floor function), so we mutliply this by b, which in case of odd numbers, will be
        //  equal to x. This is basically used to restore the "lost" power.
        //Here, we are returning c / (a*a*b), as negative indices result in 1/y situations
    } else {
        return c * (a * a * b);
        //this is the same as negative index, except instead of dividing we MULTIPLY because this does not
        //  result in inverse result, we just want to maintain the sign that is stored in c.
    }

};

//TC: O(logn)
//SC: O(nlogn)  due to n vars max created in each function call