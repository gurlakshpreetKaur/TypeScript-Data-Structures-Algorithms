//Q:count how many times lowercase vowels occurred in a given string
//
//there are only 5 lowercase vowels, so the most simple solution would be keep track of count in a variable,
//and use a loop to loop over string characters, and use if condition to check if its a lowercase vowel
//there is also some sort of law that the simplest solution is the best solution, so im just going to code this out
//you're free to let your imagination wander and come up with solutions using arrays (create an array containing
//lowercase vowels and each time check if the array contains the character to find if its a lowercase vowel) or 
//objects (create an object with lowercase vowel keys and any non-undefined value and fetch from it to identify
//if the character is a vowel) but they wont get any faster than this, so why write compilcated code if its less
//readable AND not any faster?
//
function vowelCount(str: string) {
    //create a count variable to store count of the number of vowels
    let count = 0;

    //loop over the string
    for (let i = 0; i < str.length; i++) {
        //store current letter in a variable
        let currentLetter = str.charAt(i);

        //check if current letter is a lowercase vowel, if it is, increment count
        if (currentLetter === "a"
            || currentLetter === "e"
            || currentLetter === "i"
            || currentLetter === "o"
            || currentLetter === "u") count++;
    }

    //return count
    return count;
}

//see? you probably didnt even need comments to understand that