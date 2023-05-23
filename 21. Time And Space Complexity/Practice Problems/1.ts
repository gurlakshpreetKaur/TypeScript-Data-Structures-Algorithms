//Q:Find the time complexity of the following program-

// let i: number, j: number, k = 0;
// for (let i = N / 2; i <= N; i++) {
//     for (j = 2; j <= N; j *= 2) {
//         k = k + n / 2;
//     }
// }

//lets analyise line by line

const N = Math.floor(Math.random() * 100); //ignore this line, this is just there to get rid of errors

let i: number, j: number, k = 0;  ///This takes constant time
for (let i = N / 2; i <= N; i++) {  //we have a loop here that runs from N/2 to N and each time i in incremented by
    //  1, so the total times it runs will be N-(N/2) = (N/2). We get rid of the constant, so this is linear TC.

    for (j = 2; j <= N; j *= 2) { //this loop runs from 2 to N, and each time j is multiplied by 2, to the total
        //  times this runs, will be a number x, which when raised to power 2, becomes N. x = log base 2 of N, 
        //  so this loop will run in logarithmic TC

        k = k + N / 2; //this operation takes constant time

    }
}

//So total TC becomes TC of outer loop * TC of inner loop, which is O(N * logN), or O(NlogN).