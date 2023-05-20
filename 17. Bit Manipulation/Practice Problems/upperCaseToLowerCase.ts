//Q:Given a lowercase character, convert it to uppercase using bitwise operators.

//For this, look at a binary values table, and ASCII values table.
//      https://www.asciitable.com/
// Obsserve that between uppercase letters and lowercase letters, there is a difference of 32 in the ASCII values.
//
//So we know that if we have the ASCII value of an uppercase letter, we can subtract 32 from it to get the
//      ASCII value of the lowercase character.
//
//But how do we do this with bitwise operators?
//If we take the ASCII value, and do ^ 32, we get the lowercase letter. Then we can simply convert the ASCII
//      value to a character.
//
//
function lowerCaseToUpperCase(char: string): string {
    let ASCIIValue = char.charCodeAt(0);   //get ASCII value
    let lowerCaseASCIIValue = ASCIIValue ^ 32;   //use ^ to get the lowercase ASCII value
    return String.fromCharCode(lowerCaseASCIIValue); //convert the ASCII value to a string and return it
}