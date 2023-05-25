//Q:Given a string as input, find all its subsets and print them.
//Subsets are groups of any 2 or more letters of the string, WHERE ITEMS WITH SAME INDEX OCCUR ONLY ONCE.
//Eg: "abc"
//     console logs: "a", "b", "c", "ab", "ac", "bc", "abc", "" (empty set)
//
//Now, there is a small detail that could be helpful, for a given set with n elements, there can be at most
//  2^n subsets. in the case of "abc", which has length 3, there were 8 subsets, which is 2^3.

//We will keep track of 3 vars- the input string, an index, and an ans string which does all the magic

//Our base case will be if i is equal to length of str, then print ans and return.

//In this question, we basically have choices. Each character has a choice- to be, or not to be, part of ans.
//  So, we will take care of both cases.

//create function, which takes string input, and has 2 default params- ans as "" and i as 0.
function findSubsets(str: string, ans = "", i = 0) {
    //if index is equal to str.length, then console log the ans, or output it, as it means that the entire string
    //  has made a choice
    if (i === str.length) {
        console.log(ans);
        return;
    }

    //Yes choice: assume the character at current element chooses yes, and add it to answer
    //This way you can see that in one case, all characters whould choose yet, so we would just get the input
    //  string as the result
    findSubsets(str, ans + str.charAt(i), i + 1);

    //No choice: assume the character has chosen no, so move on to the next character.
    //In this case, there will also be an output of an empty string, assuming all characters choose no.
    findSubsets(str, ans, i + 1);
}

//TC: O(2^n), for each character, there are 2 function calls, which each lead to 2 more function calls and so on.
//  It goes in the power of 2.
//SC: O(n) call stack

//Try the function out-
let FIND_SUBSETS_INPUT = "abc";
findSubsets(FIND_SUBSETS_INPUT); //this will console.log all the possible subsets.