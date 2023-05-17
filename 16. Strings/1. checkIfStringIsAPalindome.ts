//Q:Write a function that returns true is a string is a palindrome, and false if a string is not a palindrome.
//
//Palindromes are strings (or arrays, etc) which read the same back to front.
//Eg: "1221", if you reverse it, you get "1221" which is same as original string. as, it is a palindrome.
//    "racecar" if you reverse it, you also get "racecar", so its a palindrome too.
//    "palindrome" if you reverse this, you get "emordnilap", which does not equal the original string, so "palidrome"
//          is not a palindrome.
//
//How can we approach this question? Well, by definition, palindromes read the same back to front. So, one approach
//    could be to reverse the string, and compare it with the original string. if reverse string and original
//    string are equal, then we know its a palidrome, else not a palindrome.
//
//  How do we reverse a string?
//      We simply run a loop from last character to first character, and store each character at ith index in
//          a string. this is basically the same as reading the string from end to start.
//
//
function isPalidromeApproach1(str: string): boolean {
    //create a variable to store the reverse string, an initialize with an empty string
    let reverseStr = "";

    //run a loop from last char to first char, and add each char to reverse string
    //this way, we are basically reading the string in reverse
    for (let i = str.length; i >= 0; i--) {
        reverseStr += str.charAt(i);
    }

    //now return str === reverseStr.
    //str === reverseStr will evaluate to a boolean. if they are equal, it will evaluate to true, else false
    return str === reverseStr;
}

//TC: O(n)   the loop runs n times, where n is the length of string
//SC: O(n)   the length of the reverse string is dependent on length of input

//In the above approach, we had to create a separate string to store the reverse. But if we have the input string,
// do we really need to store it? We could just compare ith item from start with ith item from end. that would
// also tell us if a string is a palindrome. this is similar to the 2 pointer approach, except we are going to use
// it in a vastly different way.
// Example-
//  str = "123454321"
//  instead of reversing the string, we can just create a left pointer and a right point
//      "1 2 3 4 5 4 3 2 1"
//       ^               *
//      ^ = left pointer, * = right point
//   are ^ and * elements same? yes, so we continue checking
//      "1 2 3 4 5 4 3 2 1"
//         ^           *
//   are ^ and * elements same? yes, so we continue checking
//      "1 2 3 4 5 4 3 2 1"
//           ^       *
//   are ^ and * elements same? yes, so we continue checking
//      "1 2 3 4 5 4 3 2 1"
//             ^   *
//   are ^ and * elements same? yes, so we continue checking
//      Now if we increase the pointers, they will become equal. we want to avoid this.
//      In an odd lengthed string, this will means the center element would be compared with ITSELF, which we dont
//      need to do, so we stop before they become equal, that is, we run while start < end.
//      In an even lengthed string, all elements will be compared, as they will never become equal. start will either
//          be less than end, or equal to end. because in each iter, we increment start AND decrement end, so there
//          is a change of 2. so start < end is necessary, again, to avoid unecessary comparision.
//
// In this approach, we will run a while loop, which will run while start < end.

function isPalidromeApproach2(str: string) {
    //start will be the left-most index
    let start = 0;
    //right will be the right-most index
    let end = str.length - 1;

    while (start < end) {
        //if left side character and right side character are equal
        if (str.charAt(start) === str.charAt(end)) {
            //then we continue the loop, and move start towards the right, and end towards the left
            start++; //next element
            end--; //previous element (towards the left)
        } else {
            //else if they are not equal, that means the string cannot be a palindrome, as is isnt reading the same
            //from left and right. so we return false
            return false
        }
    }

    //if we made it out the loop, that means all elements were compared, and false wasnt returned. it means
    //the string must be a palindrome, so we return true
    return true
}

//TC: O(n)  it will run n/2 times, but we ignore the numerical multiples, so its O(n)
//SC: O(1)  memory taken does not depend on length of input