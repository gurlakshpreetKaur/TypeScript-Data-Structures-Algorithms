//Q:Given three numbers x, y and p, compute (x^y) % p.
//      This question has been asked at Google.
//
//Since we already know how to compute powers using fast exponentiation, and also that % operator can be used
//      to find mod, lets write a solution using these both.
//
//
function modularExponentiation(x: number, y: number, p: number): number {
    //declare sol, same as fastExponentiation
    let sol = 1;

    while (y > 0) {
        let lastDigitOfY = y & 1;   //declare lastDigitOfY to compute and store last digit
        if (lastDigitOfY === 1) sol *= x;    //if last digit is 1, then multiply sol with x
        x *= x;   //multiply x with itself
        y = y >> 1;    //shift y to right by 1 to update last digit
    }

    //now return sol % p as the solution
    return sol % p;
}

//TC: O(logy)    same as fast exponentiation
//SC: O(1)     same as fast exponentiation

//There is also another way to solve this question, which uses a bit more maths.
//      it makes use of the following property of mod-
//          (ab) mod p = ( (a mod p) (b mod p) ) mod p 
//      for example-
//          (50) mod 2 = ( (25 mod 2) * (2 mod 2) ) mod 2
//                     = (1 * 0) * 0
//                     = 0
//Obviously this property isnt particularly useful for small numbers, but it is very useful for large numbers
//Now, we will use it to write the code
//It will be almost the same, except in each iteration, instead of doing x *= x, we will do x = (x*x) % p, and also
//  in the return statement, we will not have to use mod, we can just return sol.

function modularExponentiationBigBrain(x: number, y: number, p: number): number {
    let sol = 1;
    while (y > 0) {
        let lastDigitOfY = y & 1;
        if (lastDigitOfY === 1) sol *= x;
        x = (x * x) % p;  //instead of x *= x, we will calculate mod each time, here
        y = y >> 1;
    }
    return sol; //and we dont need to calculate mod here, we just return the solution
}

//TC: O(logy)   same TC
//SC: O(1)    same SC


//They're both nearly the same so you might be thinking of skipping the 2nd approach, but still understand how it
//  works for interviews.