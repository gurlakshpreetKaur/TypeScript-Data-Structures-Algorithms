//Q:Given a string as input, convert all its letters to uppercase
//
//pretty straightforward.
//
//in JS/TS, we actually have an inbuilt function for this- string.toUpperCase(). so first lets use that to write
// the convertLettersToUpperCaseStraightForward function
//
function convertLettersToUpperCaseStraightForward(toConvert: string): string {
    return toConvert.toUpperCase();
}
//TC: O(n)     we are using inbuilt function, and the JS string.toUpperCase() function is actually of O(n) TC.
//SC: ???      I couldnt find it anywhere I searched on the internet, but it is probably O(n), as strings are
//                  immutable, so a 2nd string was probably used to store the uppercase letters under the hood.

//Now that we sort of know how the string.toUpperCase() function PROBABLY works, let's implement it ourselves
//BUT how do we convert a single letter to uppercase without the inbuilt function? we will use objects
//first, create an object toUpperCaseLetters, and in it, store all lowercase characters as keys, and their
//respective uppercase characters as value
//then run a loop through the string, and each time, check if toUpperCaseLetters[str.charAt(i)] !== undefined. if
// this is true, that means the current character exists as a key somewhere in our object, and since we only have
// lowercase keys, this must mean that our current letter is lowercase.
//Very efficiently, we have stored the uppercase counterparts too, so we can just get 
// toUpperCaseLetters[str.charAt(i)] and add it so a solution string where we will store the uppercase string

function convertLettersToUpperCaseCopyingFromStraightForward(toConvert: string): string {
    //store lowercase and uppercase letters in an object
    let toUpperCaseLetters = {
        a: "A",
        b: "B",
        c: "C",
        d: "D",
        e: "E",
        f: "F",
        g: "G",
        h: "H",
        i: "I",
        j: "J",
        k: "K",
        l: "L",
        m: "M",
        n: "N",
        o: "O",
        p: "P",
        q: "Q",
        r: "R",
        s: "S",
        t: "T",
        u: "U",
        v: "V",
        w: "W",
        x: "X",
        y: "Y",
        z: "Z"
    }

    //create a variable "sol" to store the solution uppercase string, and initialize with an empty string
    let sol = ""

    //loop through the string
    for (let i = 0; i < toConvert.length; i++) {
        //check if current char exists as key in lowercase to uppercase object, then that means our current
        //character is lowercase
        if (toUpperCaseLetters[toConvert.charAt(i)] !== undefined) {
            //if this happens, add the uppercase version of our character to solution
            //which is stored at toUpperCaseLetters[toConvert.charAt(i)] 
            sol += toUpperCaseLetters[toConvert.charAt(i)];
        } else {
            //else it means that the current character is not lowercase, so we just add it directly to the sol
            sol += toConvert.charAt(i);
        }
    }

    //return sol as the uppercase string
    return sol;
}

//TC: O(n)  due to the loop
//SC: O(n)  the string we used will have the same length as input, and hence will take up that much space in
//                  memory. do remember that this is not because of the object that we created, the length of
//                  that object, or the space it takes up in memory, does not depend on the size of input, hence
//                  if we hadnt declared the string, then the function would be O(1) as the object's size stays
//                  constant.