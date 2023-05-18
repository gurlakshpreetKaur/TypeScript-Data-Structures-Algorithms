//this question was asked at amazon
//
//Q:Given a string s, return a compressed version of it such that when there are k consecutive letters l, it is
//  replace by lk, but if the letter l does not consecutively appear more than once, add it without any changes
//Example- "rrr", as there are 3 consecutive "r"s, it will be replaced by "3r", so the output will be "3r".
//         "aaaabbbbcccc", output = "a4b4c4"
//         "xxxyyyxxxa", output = "x3y3x3a"   here, we dont add 1 at the end, because a appears only once, so by 
//                                              adding 1, we would actually be INCREASING the length rather than
//                                              DECREASING it
//
//since the algorithm replaces consecutive letters, lets look at how naturaaly we would solve this with pen and paper
//      "xxxyyyxxxa"
//      we start at 0th index, and we look on while character at 0th index is equal to charAt next index.
//      at the same time, we keep track of the count
//      so, we stop looking when the character changes as follows-
//      "xxxyyyxxxa"
//          ^
//      at this point, count is equal to 3
//      we will keep a solution string, to which we will add previous character (as current character is not equal
//          to prev character), and then we add the count. so our current sol becomes "x3".
//      we will repeat this over the entire string, BUT if the count is 1, then we will not add the count at after
//          the string, we will only add the character
//Take the above information, and try to code it yourself, if you want, look that the code below.
//
//
function compressString(str: string): string {
    //create a variable where we will store the solution string, and initialize with an empty string.
    let sol = "";

    //create a loop, to loop over characters in string
    for (let i = 0; i < str.length; i++) {
        //create count variable and init with 1, as the current element is the current element
        let count = 1;

        //create a while loop that will run while next element === current element, this means that these elements
        //are consecutive equal elements
        while (str.charAt(i) === str.charAt(i + 1)) {
            i++;
            count++;
        }

        //when the while loop ends, it means that we have found a different char. but we stored the count of the
        //number of times the consecutive elements appeared in the count variable, now we will use that to add to
        //the sol string.
        //but first, we need to actually find the letter that we were using for the above loop, because if the loop
        //has broken, it means that our current index is that of an element which is NOT equal to that starting
        //letter.
        //we can simply do this by looking at the character before the current letter, but remember, we only need
        //to do this when count is greater than 1. if the count is 1, then we are still at the starting out letter
        //as the while loop never ran, and the index never increased.

        //we init the letter with i
        let theStartingOutLettersIndex = i;
        //then check if count is greater than 1
        if (count > 1) {
            //and decrease the increase if true
            theStartingOutLettersIndex--;
        }

        //add the starting out letter to the string
        sol += str[theStartingOutLettersIndex];
        //and we want to add the count only if is greater than 1, the reasons as to why were previously covered
        if (count > 1) sol += (count as any as string);
    }

    //return the sol string at the end
    return sol;
}

//TC: O(n)   you might be looking at the code thinking its O(n^2) due to the 2 loops, but observe that even in
//              the inner loop, we increment i, so the total number of iterations will be the same. in face,
//              you could probably also write using just 1 for loop, its just that this approach is more readable,
//              at least for me.
//SC: O(n)   the length of the sol string depends on the length of the input string