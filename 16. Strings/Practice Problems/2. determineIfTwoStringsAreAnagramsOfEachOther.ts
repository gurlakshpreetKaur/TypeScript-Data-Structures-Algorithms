//leetCode link: https://leetcode.com/problems/valid-anagram/description/
//
//Q:Given two strings s and t, return true if t is an anagram of s, and false otherwise.
//  An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically 
//  using all the original letters exactly once.
//Example- "abcdefg" and "gefdabc" are anagrams, "abcdef" and "afdcea" are not anagrams.
//
//To solve this question, rather than thinking about what anagrams are, we need to think about what they aren't.
//  For example, if 2 strings have different lengths, they CANNOT be anagrams, as they wouldnt have the same count
//                  of letters.
//      Also, non anagrams by defintion contain different letters.
//
//We could easily run nested loops, and compare each letter of the 2 string, but that would make our TC O(n^2), 
//  which is pretty slow.
//
//By now, you should be familiar with the concept of transferring weight from TC to SC. Before looking at how
//  to solve the question, try using the hint to solve it on your own.
//
//Now, lets look at another property of anangrams, which may sound like common sense by now, but is actually
//  crucial to solving this problem.
//   If two strings are anangrams, the number of times that a given character appears in them will be equal.
//      "ABCDEEEF" and "EFEEDCBA" are anagrams because in both "A" appears once, "B" appears once, "C" appears
//              once, "D" appears once, "E" appears thrice, and finally "F" appears once.
//
//Our approach will be as follows-
//first of all, cover a direct case, that is, if length of strings is not equal they CANNOT be anagrams, so return
//      false.
//Next, if we make it to this part, then the strings must have equal lengths. Now we will create an object to
//      store letter counts of string1.
//We will loop over string1, and for each letter, we will increase its letter count by 1.
//Then we will loop over string2, and each time we will compare letter counts to determine if they are anagrams.
//This will we cleared in the code
//
//
function areAnagrams(string1: string, string2: string) {
    //check if their lengths are different. if they are different, the 2 strings CANNOT be anagrams
    if (string1.length !== string2.length) return;

    //create an object to store letter count
    let letterCounts = {};

    //loop over string1
    for (let i = 0; i < string1.length; i++) {

        //store current letter in a variable
        let currentLetter = string1.charAt(i);

        //for each character, if it already exists in letterCounts as a key, incremement the count by 1
        if (letterCounts[currentLetter] !== undefined) letterCounts[currentLetter]++;

        //else it means that the letter does not yet exist in letterCounts, so we init letterCounts[i] as 1
        else letterCounts[currentLetter] = 1;

    }

    //loop over string2
    for (let i = 0; i < string2.length; i++) {

        //store current letter in a variable
        let currentLetter = string2.charAt(i);

        //if currentLetter does not exist as a key in letterCount, it means that string1 does not include this
        //  letter, so string2 and string1 cannot be anagrams.
        if (letterCounts[currentLetter] === undefined) return false;

        //also, if letterCount[currentLetter] is less than or equal to 0, than it means the letter counts of the
        //  the two strings cannot be equal so return false
        if (letterCounts[currentLetter] <= 0) return false;

        //if we made it to this line then it means that false wasnt returned, in this case, we decremement
        //  letterCounts[currentLetter] by 1
        letterCounts[currentLetter]--;

    }

    //if we made it this far, then false wasnt returned at any point before, so the 2 strings must be anagrams
    //  so we return true
    return true;
}

//TC: O(n)   (the loops depend on length of input)
//SC: O(n)   (the space taken by letterCount object depends on length of input)