//Q:Given an integer as input, return it as a string in english. Eg. 2019 will be converted to "two zero
//  one nine". You must use a recursive function to do this, 0 will be converted to "zero", etc.
//
//For this question, we first of all will obviously need to store the numbers in english somewhere. For this,
//  we will use an array, the ith index of which will store the number i in english. Eg. 0th index will store "zero".
//  1th index will store "one", etc. We only need to store the numbers upto 0.
//
//Then we will use a recursive function. In each iteration, we will go to last digit, using %10, and add the name
//  of that number to the string, BUT remember to add it BEFORE the rest of the string. This is because using %10
//  will mean working in reverse. After that, we will pass the new string and Math.floor(num/10) as input, so that
//  the 2nd last digit keeps becoming the new last digit. Once the input number becomes 0, it means the entire
//  number has been converted.
//
//Base case: input number is 0, this means the entire number has been converted, so we will return the input
//  string as the output.
//
//Work: in each iteration, calculate last digit and add it BEFORE the rest of the string.
//
//Recursion: call the same function with the new updated string and input number after removing its last digit. 
//          This way the digits keep updating.

//Further logic is explained later.

//we are giving a default value to str so that it doesnt need to be specified while calling the function

//create letters array that stores number names index-wise
let letterArray = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function numberToString(n: number, str = "", isNegative?: boolean): string {
    //for the base case, i know i previously said it will be if n===0, but this will not account for if the
    //  input itself is 0. so in that case, to ensure that we dont return an empty string, we will check and ensure
    //  that the string is not empty. This way if zero is the input, we will be able to use the array to add
    //  "zero" to the string. We also trim the string to remove any extra spaces from the end or start.
    if ((n === 0) && (str !== "")) return (isNegative ? "negative " + str : str).trim();

    if (n < 0) { //if number is less than 0 (this can only occur in the initial function call)
        isNegative = true; //this will happen in the initial call, an transfer until the end call. basically it
        //  ensures that if the number is negative, then "negative " is added to its start. we can't add it right
        //  now because our digits are looped in reverse, so if we add it right now, "negative" would appear at
        //  the end of the string

        n = Math.abs(n); //make n positive, so that we basically are converting the positive version to the string,
        //  then at the end we just add "negative" to the start of the string.
    }

    let currentLastDigit = n % 10; //calculate last digit

    let currentWord = letterArray[currentLastDigit]; //use last digit to get current letter name

    let newNumberWithoutLastDigit = Math.floor(n / 10); //remove the last digit

    //recursion: call function with new number and add the currentWord to string
    return numberToString(newNumberWithoutLastDigit, currentWord + " " + str, isNegative);
}

//TC: O(n)    we are looping over the array
//SC: O(n)    the vars we declare take constant space in 1 function call, with n function calls, O(n) becomes SC.

//to call the function-
console.log(numberToString(-21022)); //no need to specify other params as they are given default values