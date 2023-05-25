//Given a string n as input, print all its permutations.
//Permutations are basically a re-arrangement of the letters of a given string.
//Eg: "abc"
//      output: "abc", "acb", "bac", "bca", "cab", "cba"

//It is noteworthy that when given a string or set of size n, there can be maximum n! (n factorial) permutations.

//for this function, we need 2 params- and input string, and a variable to store permutation, which we can
//  give a default value of ""
function findPermutations(str: string, ans = "") {
    if (str.length === 0) { //our approach will be to one by one remove characters from str, so when str becomes
        //  empty, there will be no more characters to remove, so we log the ans which stores current 
        //  permutation and return
        console.log(ans);
        return;
    }

    for (let i = 0; i < str.length; i++) {
        let currentChar = str.charAt(i); //store current character in a variable

        //then create a string which DOESNT contain the current character. this way, we have removed a characterm
        //  and so, we are tending towards the base case.
        let stringWithoutCurrentCharacter = str.substring(0, i) + str.substring(i + 1, str.length);

        //pass the new string to the find permutations function and add currentCharacter to and 
        findPermutations(stringWithoutCurrentCharacter, ans + currentChar)
    }

}

//TC: O(n*n!) where n is length of string. this is directly related to the fact that for a given string of length n,
//  there will we n! permutations, and for 1 permutation, we use a loop of TC n, so it becomes n*n!
//SC: O(n)  stack size