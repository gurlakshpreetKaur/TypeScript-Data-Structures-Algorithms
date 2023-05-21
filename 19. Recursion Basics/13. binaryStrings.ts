//Q:Given a number n, print all binary strings of length n without consecutive 1s.
//  A binary string is a string consisting of only 0s and 1s. Our task is to print all strings of length n with only
//  0s and 1s, and no consecutive 1s.
//Eg: n = 2, in this case, 3 binary strings are possible with given conditions-
//  "000"
//  "010"
//  "001"
//  "100"
//  "101"

//To solve this question, observe the following-
//if ith place of string is 0, then the next number can be either 0 or 1.
//but if the ith place of string is 1, then the next number CANNOT be 1, as that would lead to consecutive string,
//  so the next place can only be 0.
//
//To solve this question, we will need 2 params- n (length), currentString

//we set default value of str to "" so that it doesnt have to be specified when calling initially
function printBinaryString(n: number, str = "") {
    if (str.length === n) {//when n (desired length) is equal to str, we print string and return
        console.log(str);
        return;
    }

    if (str.charAt(str.length - 1) === "0") { //if last character is zero
        printBinaryString(n, str + "1")  //in that case, we are allowed to add 1 to the string
    }
    //in either case (whether or not the last case is 0 or not) we are allowed to add zero to the end
    printBinaryString(n, str + "0");
}

//TC: O(2^n)    in each function call, we are performing 2 function calls, which leads to the O(2^n) TC
//SC: O(1)      we did not have ANY auxiliary variables, so it is constant

//To call the function:
let N = 10;
printBinaryString(10); //as we set a default value to str, we dont need to specify it.