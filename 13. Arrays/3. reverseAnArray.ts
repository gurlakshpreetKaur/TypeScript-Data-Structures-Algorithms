//To reverse an array is to move the 0th item to the last index, 1th item to the 2nd last index, and so on
//For example-
//  arr = [1, 2, 3, 4]
//      reverse = [4, 3, 2, 1]
//
//You may be thinking that we could just run a loop, from the last item to first item, and push the items into a new
//  array, like so-
//
//  let sol = []
//  for(let i = arr.length - 1; i >= 0; i--) {
//      sol.push(arr[i]);
//}
//
//  Since the loop runs from last item to first item, this would add the items in reverse, but this is not what we
//  want.
//We want to rverse the array IN PLACE, that means, we want to do it without creating a new array. We need to make
// edits to the original array.
//
//To do this, observe-
//1. When an array of length n is reversed, we change the positions like so-
//     we move item 0 to n-1 index, and item n-1 to 0 index
//     we move item 1 to n-2 index, and item n-2 to 1 index
//     we move item 2 to n-3 index, and item n-3 to 2 index
//  Observe the pattern that forms
//      a. if we take item at index x, and move it to index y, then take item at index y and move it to index x,
//          we are just SWAPPING the values.
//      b. item 0 is swapped with n-1, item 1 is swapped with n-2, so on and so forth, until we reach half of the 
//          array, as we were mirroring. so we can say that for an item at index i<(n/2) where n is length of arr,
//          we will swap it with item at index n-1-i, as n-1 is last index of arr. We can actually verify this with
//          an example.
//
//                      arr = [1, 2, 3, 4], length = 4
//                      length/2 = 4/2 = 2
//
//                      i = 0, i < length/2.   so, we will swap 0th item with (length - 1 - 0) index, which is 
//                                                      (3-1-0) = 3
//                      after swapping 0th index and 3th index, we get [4, 2, 3, 1]
//
//                      i = 1, i < length/2.   so, we will swap 1th item with (length - 1 - 1) index, which is
//                                                      (4-1-1) = (4 - 2) = 2
//                      after swapping 1th index and 2th index, we get [4, 3, 2, 1]
//
//                      i = 2, i === length/2, so we stop the process. [4, 3, 2, 1] is the reversed array.

//          Here, we basically iterated over indexes of the array, until the index became length/2. This can be
//                  done using a for loop, which goes from 0 to length/2.
//
//      c. how do we swap two items or array? to solve this, let us simplify the problem. how do we swap values of
//              variables?
//                  Example- a = 10, b = 20
//                      to swap them, first lets store value of a in a dummy variable
//                              dummy = a = 10
//                      now, set value of a to b, so a becomes b
//                              a = b = 20
//                      finally, set value of b to the dummy variable which stores the value of a
//                              b = dummy = 10
//                      so now the value of a is 20, and value of b is 10, which is the swapped version of what we
//                      started with.
//              we will follow the same procedure with the array items to swap them.


function reverseArray<T>(arr: T[]): T[] {
    //start a for loop, which goes from 0 to arr.length / 2. you can optionally floor it, but it actually wont matter
    //  since we increase i by 1, so i stays integer. which means if i < some number x, then i must also be less then
    //  x + 0.5. So it doesn't matter.
    for (let currentIndex = 0; currentIndex < arr.length / 2; currentIndex++) {
        //save current index's value in a dummy variable
        const CURRENT_INDEX_VALUE = arr[currentIndex];
        //calculate the index from the right hand (basically mirroring)
        const RIGHT_HAND_INDEX = arr.length - 1 - currentIndex;
        //swap current index's value with the value of the calculated right hand value.
        arr[currentIndex] = arr[RIGHT_HAND_INDEX];
        arr[RIGHT_HAND_INDEX] = CURRENT_INDEX_VALUE;
    }
    return arr;
}