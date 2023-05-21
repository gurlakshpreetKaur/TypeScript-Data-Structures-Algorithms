//Q:Given a string str as input, return the string after removing all duplicates.
//
//We have solved something similar in the shortest distance question, in the strings chapter. That question
//  was *similar* to remocing duplicates, but not exactly the same.
//
//Let's think of how we can remove duplicate (without recursion).
//We could just nested loops. But's that slow, and we know an alternative for that- objects.
//We'll create an object to keep track of letters. If the currentLetter is already part of the object, it means
//  the letter is a dupilcate. Then we will remove that character by slicing the string into 2 parts- before the
//  character, and after the character, then joining the 2 substrings. This will result in the removal of the 
//  character.
//
//Now how do we do this using recursion? Well first lets think of the params we would need. The first param
//  would of course be the string. The next param would an index keeper, to keep track of the index of characters
//  in the string. the last param would be the object, which would keep track of the letters are duplicate.
//
//Base case: when index becomes equal to the length of input string, the we will return the input string, as it
//  means all letters have been checked, so the input string must be the resulting string after removing the
//  dupilcates.
//
//Work: we will check if the letter at current index is included in the object. if it is, that means the current
//  character is a duplicate, so we will get rid of it by using subtrings. else, it means that the letter hasnt
//  been encountered before, so we add it to the object.
//
//Recursion: call the function at the end, and pass the string, pass index after increasing it by one, and pass
//  the object to keep track of letters.

//we will give default values to the currentIndex and letters param, so that if they arent specified, it assumes
//  values. this is just so that if hypotechically someone else used the function, they wouldnt have to specify
//  0 as currentIndex and {} as letters each time, it would be assumed by the function.
function removeDupicates(str: string, currentIndex = 0, letters = {}): string {
    if (currentIndex === str.length) return str; //base case

    let currentLetter = str.charAt(currentIndex); //store current letter in a var

    if (letters[currentIndex] !== undefined) { //if it is part of the letters object
        //then we remove current letter
        let stringBeforeLetter = str.substring(0, currentIndex);
        let stringAfterLetter = str.substring(currentIndex + 1, 0);
        str = stringBeforeLetter + stringAfterLetter;
    } else { //else it means the letter isnt included in the letters object, it is new, so we add it to letters
        letters[currentLetter] = true;
    }

    //recursion
    return removeDupicates(str, currentIndex + 1, letters);
}

//TC: O(n)    we are basically looping through the string.
//SC: O(n)    each function call has constant vars, and the function will be called max n times, so n*1 = 1 and
//              SC becomes O(n).

//To call the function:
let INPUT_STRING = "aacdebbeeuuauusrf";

console.log(removeDupicates(INPUT_STRING)); //as we set default value for currentIndex and letters param, we dont
//  need to specify them while calling.