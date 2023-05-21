//Q:Write a program to recursively return length of string.
//
//For this, we cannot use the string.length property. First lets think about what the length really means.
//Other than the fact that it is the amount of characters in a string, how know how we use length commonly as the
//  end limit when looping over an entire string? That's because the length-1th character will be valid, but
//  the character wont exist at length index. We will use this at the core.
//
//Our recursive function will keep track of an index, and ofc the input string. starting from 0, we know that
//  when charAt(index) becomes undefined, then we have exceeded the last character. so this index must be our
//  length.

function lengthOfString(str: string, i = 0): number {
    if (str.charAt(i) === "") return i; //if the letter at current index doesnt exist, we have exceeded
    //  the last character. so our current index is the length, and we return it.

    //if we made it here, that means i is not length of string, so we move onto the next index to check if the
    //  next index is the length of string
    return lengthOfString(str, i + 1);
}

//TC: O(n)   the function will need to be called str.length times
//SC: O(1)   no vars created by us, so space taken is constant

//to call the function-
console.log(lengthOfString("BCDEDEDEDE")); //no need to specify index, as it has a default value of 0.