//Q:Write a recursive function to calculate the GCD (greater common divisior) or HCF (highest common factor)
//  of 2 numbers.
//
//What is Euclid's algorithm?
//If we subtract a smaller number from a larger one (we reduce a larger number), GCD doesn’t change.
//  So if we keep subtracting repeatedly the larger of two, we end up with GCD.
//Now instead of subtraction, if we divide the smaller number, the algorithm stops when we find the remainder 0.
//
//The basic idea is to divide the larger number by the smaller number, if remainder is 0, return the smaller number
//  as answer, else take the remainder and make it the new smaller number, and take the old smaller number and
//  make it the new greater number.
//
//Eg: 10, 15
// 15 = 10*1 + 5
// 10 = 5*2 + 0
//  so here we return 5
//
//if you find this confusing, here is another notation-
////Eg: 10, 15
//  15 / 10 = 1, R = 5
//  10 / 5 = 2, R = 0
//  so here we return 5, the smaller number
//
//Base: if the smaller number is 0, return the greater number. we will simply make the remainders the smaller
//  numbers, so this works ALSO this ensure that if case such as GCD(0, 10) or GCD(0, 7) happens, 7 is returned
//  and not 0.
//
//Base and recursion: make the remainder the new smaller number, and the old smalled number the new greater number,
//      and call the same function recursively.
//
//Mathematically, our approach is a little different-
//  15 / 10 = 1, R = 5
//  10 / 5 = 2, R = 0
//  5 / 0, HERE 0 IS THE SMALLER NUMBER, BASE CASE HIT, SO *HERE* WE RETURN 5 (greater number)

function GCD(greaterNumber: number, smallerNumber: number) {
    //lets perform a check here for if the smaller number is 0
    if (smallerNumber === 0) return greaterNumber;

    return GCD(smallerNumber, greaterNumber % smallerNumber); //call the function again but with smaller number
    //  as new greater number, and remainder of greater/smaller as the new smaller number
}

//TC: O(Log min(a, b))      I have no idea how this happened (or maybe i sort of do) but i got this from geeksForGeeks
//SC: O(Log (min(a,b))      we have constant memory taken up in each call, with Log min(a, b), the SC becomes
//                              same as SC.