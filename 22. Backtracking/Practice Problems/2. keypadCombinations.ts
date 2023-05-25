//leetCode link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
//
//Q:Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number 
//  could represent. Return the answer in any order.
//Letter combinations refers to the way the numebers and letters worked on those old nokia phones.
//This is what a nokia keyboard looked liked-
//       __________________
//      |  1  |  2  |  3  |
//      |_____|_abc_|_def_|
//      |  4  |  5  |  6  |
//      |_ghi_|_jkl_|_mno_|
//      |  7  |  8  |  9  |
//      |pqrs_|_tuv_|wxyx_|
//
//Input: digits = "23"
//Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
//  we basically print all combinations of 2 letters and 3 letters

//So for this, first of all, we will need to store the letters with their number.
//  For this, you can use either a number or an object, I'll be using an object simply because I find it neater.
//We will also keep track of the solutions in an array. You could just print them, so you get the understanding
//  without the hassle of another array, but I'll still keep track of it.
//
//For other information, look at the comments

function keypadCombinations(digits: string, currentAns = ""): string[] {
    //the way our algorithm will work is by one-by-one adding letters of a number to currentAns, and removing that
    //  number from digits
    if (digits.length === 0) { //BASE CASE: if no digits are left, it means all possible letters have been added
        if (currentAns.length === 0) { //if length of currentAns is 0, it means there were no input digits
            return []; //so we need to check and return empty array, rather than array with empty string
        }
        return [currentAns]; //in this case, return the currentAns in form of an array with only one item-
        //  currentAns
    }

    //store digits
    let letterNumberCombination = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    }

    //now, go to FIRST LETTER of digits and store in a variable
    let currentDigit = digits.charAt(0);

    //now fetch the letter of the number and store them in a var
    let currentLetters = letterNumberCombination[currentDigit];

    //now, remove the currentDigit (0th letter) from the digits string
    let digitsAfterRemoval = digits.substring(1, digits.length);

    //finally, create an array to store the solutions
    let sol: string[] = [];

    //now loop over the current letters
    for (let i = 0; i < currentLetters.length; i++) {
        //and add the returned array after recursively calling the function, to the sol array, by using
        //  concat method to concatenate the 2 arrays
        sol = sol.concat(keypadCombinations(digitsAfterRemoval, currentAns + currentLetters.charAt(i)));
    }

    //return array at the end
    return sol;
}

//TC: O(4^n)   this may sound absurd. but there is a reason for this. look at the keypad. for most numbers,
//      each number has 3 letters corresponding to it BUT for 7 and 9 THERE ARE 4 letters. so the TC is just bas-
//      cally the number of different letters that a given digit has, TO THE POWER of the number of digits AS
//      WE ARE FINDING THE COMBINATIONS. you can try it yourself, if you enter string of numbers which with 3 letters
//      (such as 2, 3, 4, 5), you will get 3^lengthofstring strings as output, if you enter "79" or "97" you
//      will get 16 outputs, which 4^(lengthofstring). In this case, since 4^n is worse than 3^n, that it our
//      worst case, and hence, our TC.
//SC: O(4^n)   the solution array used to store the solutions will be at most 4^n.

//To call the function-
let INPUT_STRING_FOR_KEYPAD_COMBINATIONS = "234";
console.log(keypadCombinations(INPUT_STRING_FOR_KEYPAD_COMBINATIONS));