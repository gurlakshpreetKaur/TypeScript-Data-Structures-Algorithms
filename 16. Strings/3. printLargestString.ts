//Q:For a given set of string, print the largest string.
//
//You might be looking at that question thinking "largest string means longest string, right?" NO! Largest string
//  means the string that comes lexicographically the last. We looked at what lexicographical sorting is in the
//  previous question too, but if you forgot, it means that the strings whose letters from start to end occur
//  earlier in the english alphabet, will be sorted higher.
// Eg. "apple", "banana", "mango", "bottle"
//      "apple"'s first letter comes before the first letter of "banana" and before 1st letter of "bottle"
//          so, when sorted lexicographically, apple will be place higher than banana
//      "mango"'s first letter comes before the first letter of all other words, so it will be placed last
//      "banana" and "bottle" have the same 1st letter, so we compare 2nd letter. if the second letter were the same
//              too, then we would have compared the third letter. so on and so forth. in "banana" and "bottle",
//              the 2nd letter of "banana" comes alphabetically before the 2nd letter of "bottle", so "banana" will
//              be sorted higher.
//
//We want to write an algorithm that return the lexicographically LOWEST string. so if "mange", "apple", "banana",
//      and "bottle" were the input, "mange" would be the output.
//
//To compare strings this way, we can use the > operator. YES, IT WORKS ON STRINGS TOO. if you're interested, you
//      could read about it here: 
//          https://stackoverflow.com/questions/15001829/javascript-use-of-greaterthan-with-strings
//      But basically, string1 > string2 will return true if string1 is lexicographically larger than string2,
//          that means, it will return true if string1 will be sorted lower than string2 lexicographically.
//              Eg: "mango" > "apple"       true
//                  "apple" > "apple"       false, as string1 === string2, string1 is not > string2
//                  "apple" > "banana"      false, as "banana" is lexicographically lower than "apple"
//
//This way, if we think about it, this question is basically the same finding the largest number in an array
//
function printLargestString(strings: string[]): string {
    //if length of input array is 0, then we return an empty string. if the input has no strings, then we cant
    // compare any strings, so right off the bat, we need to return back to prevent errors;
    if (strings.length === 0) return "";

    let largestString = strings[0] //start out with the first string as the largest string

    //loop through the strings array input
    for (let i = 1; i < strings.length; i++) {

        //compare each string with largest string, if its greater than the largest string, then make it the new
        //largest string
        if (strings[i] > largestString) largestString = strings[i];

    }

    console.log(largestString); //print the largest string
    return largestString; //then return it
}

//as you can see, this is basically exactly the same as finding the largest number.
//TC: O(n)    the loop will always run strings.length times, so thats O(n) TC
//SC: O(1)    the space taken up in memory does not depend on length of input array