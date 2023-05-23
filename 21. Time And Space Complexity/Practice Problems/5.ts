//find the TC and SC of the following code-

// let a = 0;
// for(let i = 0; i < N; i++) {
//     for(let j = N; j > i; j--) {
//         a = a + i + j;
//     }
// }

//Lets analyse line by line.

let a = 0;  //this takes constant time and because it is primitive type, constant space as well.
for (let i = 0; i < N; i++) { //this is a loop that goes from 0 to N, so it runs N times.
    for (let j = N; j > i; j--) { //this is a loop that goes from N to i+1 (j > i), so this will run worst case
        //      N times (first iter). Take n = 100 as an example. j's initial value is N, and in first iter
        //      our OUTER loop, i will be 0, so it will run while it is greater than 0, which makes 100 times, which
        //      is N.
        a = a + i + j; //this takes constant time and space
    }
}

//Both outer loop and inner loop run N times, so our TC becomes O(outerLoopTC * innerLoopTC) = O(N * N) = O(N^2).
//SC is constant, so O(1).