//Binary search is a search algorithm used when searching for a key in a SORTED array.
//Binary means related to 2, and binary search works on a very simple observation-
//  In a sorted array which is sorted in an ascending array, each number is bigger than the previous. So, to find
//  a key in that array, we can compare if the key is greater than or less than the middle item, and accordingly
//  shift our area of focus.
//This is similar to searching for a word in a dictionary, since dictionaries are alphabetically sorted. 
//  When searching for the word "polynomial", we could open the middle page. If the letter on the middle page 
//  comes before 'p', we know that polynomial will be part of the later half, else we know we half to search in the
//  earlier half. We can repeat this process over and over again and soon our area of focus will be very narrow.
//This algorithm is useful when searching in large arrays. In small arrays, this algorithm would take around as many
//  commands as a linear search, but it is in large arrays that the difference becomes clear.
//
//Example-
//  arr = [2, 3, 4, 5, 6, 9, 13]
//  key = 9
//  First, we will look at where our area of focus starts and where it end.
//  Currently, it starts at 0th index, and ends at length - 1.
//      So, start = 0
//          end = length - 1 = 7 - 1 = 6
//  Now, we look at where the middle will lie at the average of the start and end.
//          mid = (start + end) / 2
//              = (0 + 6) / 2
//              = 6 / 2
//              = 3      //if mid would have decimal, then we would round it down using Math.floor();
//  Let's look at the middle item of the array, at index mid.
//          [2, 3, 4, 5, 6, 9, 13]
//                    ^           
//        it is 5. now, we compare it with key.
//                      is 5 === 9? no
//                      is 5 > 9? no
//                      is 5 < 9? yes
//        this means we need to look in the latter half
//          we have shifted our area of focus to the latter half, which means the start = (mid + 1) = 3 + 1 = 4
//          and end stays the same.
//
// Next, repeat the process again.
//       Currently, start = 3
//                  end = 6
//       So, mid = (start + end) / 2
//               = (3 + 6) / 2
//               = 9 / 2
//               = 4.5 (it has a decimal so we round down)
//               = 4
//       Let's look at it in the array.
//              [2, 3, 4, 5, 6, 9, 13]
//                           ^
//          is 6 === 9? no
//          is 6 > 9? no
//          is 6 < 9? yes
//              so once again, we shift our area of focus to the latter half
//          start = (mid + 1) = 4 + 1 = 5
//
// start = 4, end = 6
//        mid = (start + end) / 2
//            = (6 + 4) / 2
//            = 10 / 2
//            = 5
//              [2, 3, 4, 5, 6, 9, 13]
//                              ^
//         is 9 === 9? yes, so we return mid, that is, 5
//  Now we know that 9 is in the array at the 5th index.
//
//We will code this using a while loop, which which run while start >= end.
//Why? Because if the start becomes greater than end, it means the item does not exist in the array.

function binarySearch(arr: number[], key: number): number {
    //if length of array is 0, then no item can exist in the array, so we straight up return -1 which means the
    //item does not exist in array. Also, later in the code we initialize end variable with value arr.length - 1,
    //and if the length is 0, the index would become negative. So it is better to just return -1;
    if (arr.length === 0) return -1;

    //declare start variable and initialize with 0, because we start our search with 0 as start of area of focus.
    let start = 0;
    //declare end variable and initialize with length - 1, because we start our search with length - 1 as end of 
    //area of focus.
    let end = arr.length - 1;

    //write the loop, which will run while start >= end.
    while (start >= end) {
        //calculate mid, and use floor function so that it is always an integer.
        let mid = Math.floor((start + end) / 2);

        //comparing
        //is mid item === key? if yes, return mid as the index, exit the function.
        if (arr[mid] === key) return mid;
        //if mid item > key, that means we need to search in the first half, so we shorten our area of focus such
        //that it ends at mid - 1, because we already know that mid item !== key.
        if (arr[mid] > key) end = mid - 1;
        //if none of above conditions are true, that means arr[mid] < key. in this case, we move our area of focus
        //to the 2nd half. to do this, we simple shift the start point to mid + 1, as we already know mid !== key.
        else start = mid + 1;
    }
    //if at any point, the key would have been found (basically if the mid item === key), then we would have had
    //returned mid as the index, and exited the function. If that didn't happen and we actually exitted the loop,
    //then that means the key does not exist in the array. In this case, we return -1 to show that the key does
    //not exist in the array.
    return -1;
}

//TC: O(logn)  (this is because each time, the number of commands needed is divided by 2. basically, the number
//             of times that it runs is therefore proportional to log base 2 of n, we just annotate it as logn)
//SC: O(1)  (the amount of space taken up is constant, it does not depend on the length of the array, hence
//          space complexity is constant.)