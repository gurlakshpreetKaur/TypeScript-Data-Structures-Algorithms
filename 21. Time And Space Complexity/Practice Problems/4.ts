//Find the TC and SC of the following function which calculates the square root of a number-

// function floorSqrt(x: number): number {
//     if(x === 0 || x === 1) return x;

//     let i = 1;
//     let result = 1;

//     while(result <= x) {
//         i++;
//         result = i*i;
//     }

//     return i - 1;
// }

//Let's analyze line by line-
function floorSqrt(x: number): number {
    if (x === 0 || x === 1) return x; //this will take constant time and space

    let i = 1; //we are declaring a primitive type, it takes constant space in memory and time
    let result = 1; //constant TC and SC

    while (result <= x) { //this while loop will have a TC that depends on RESULT variable, so lets look how result
        //                  changes through the loop
        i++; //i is incremented each time
        result = i * i; //and result it set to i^2. so this means that the while loop will run while result <= x,
        //              which can be written as, it will run while i^2 < x. now we solve the equation for i.
        //              i = sqrt(x). so the TC of this while loop is sqrt(x)
    }

    return i - 1; //this takes constant time
}

//So overall, the while loop is the defining element of our TC, which is O(sqrt(x)) (as the while loop will
//  run sqrt(x) times).
//The SC is constant, as auxiliary space taken consists of just the i variable and result variable, both of
//  which are primitive, and so take up constant space.

//TC: O(sqrt(x))
//SC: O(1)