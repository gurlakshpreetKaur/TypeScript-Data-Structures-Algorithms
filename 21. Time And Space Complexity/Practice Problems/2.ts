//Q:Find the time complexity of the following program-
//
//for(let i = 0; i < n; i++) {
//  i *= k;
//}

//lets analyse line by line.

for (let i = 0; i < N; i++) { //this is a loop that goes from 0 to N, and increments by one each time, so it is of
    //                              O(N) TC
    i *= k; //But here, i is multiplied by k each time, so actually, it is not just incremement by 1 each time,
    //  it is being multiplied by k each time. so the number of times the loop will run will be equal to some
    //  number x, where k to the x will be equal to N. Here, x is equal to log base k of N, so that is the actual
    //  TC of this loop
}

//So our TC is O(log base k of N)