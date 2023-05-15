//We previously covered linear search, now we want an algorithm the find the largest item of the array.
//Now, lets think of how we would approach this in real life.
//Imagine having a menu, where all food is of the same price. As a stringy person, we want to find the food with
//  the most weight (yes, this menu includes that), so that we get the most out of our money.
//
//       ____________________
//      |        MENU        |
//      | 1. Bread       ₹10 |
//      |      1kg           |
//      | 2. Cake        ₹10 |
//      |      0.5kg         |
//      | 3. Rice        ₹10 |
//      |      1.2kg         |
//      | 4. Kaju Katli  ₹10 |
//      |      0.25kg        |
//      |____________________|
//
//  Since we'll compare the weight, we can ignore the prices entirely. The way we'd approach this IRL would be that
//      we first look at the first item. The weight is 1kg. We could write it down or just remember it.
//      We compare the weight of the first item with the second item. The second item is 0.5kg, first item was 1kg,
//          1kg > 0.5kg, so our maximum is 1kg.
//      Then we look at the 3rd item. The weight is 1.2kg. We compare it with out current maximum, 1kg. 1.2kg > 1kg,
//          so now our maximum becomes 1.2kg.
//      Lastly, we compare the current maximum with the weight of the 4th item- 0.25kg. 1.2kg > 0.25kg, so our
//          maximum stays 1.2kg.
//  Now, we know that if we buy the item weighin 1.2kgs, that is rice, we'll get the most out of our money.
//
//  Observe how in this approach, we went to each item, and compared it with our maximum to determine the largest
//      item. We'll code it similarly.
//
//  We first create a max variable, and initialize it with the first item. Then we loop through the array from
//      index 1 to length - 1, and compare max with each item. if an item > max, then we set max = item.

function largestInArray(arr: number[]): number {
    //if length of array is 0, there is no point in finiding the maximum, so we return NaN. Also in the next
    //  step we initialize max variable with first item, but if the length of array is 0, we will get a reference
    //  error.
    if (arr.length === 0) return NaN as number;
    //declare max variable and intialize with first element of array.
    let max = arr[1];
    //loop through the array from index 1 to length - 1;
    for (let i = 1; i < arr.length; i++) {
        //if current item > max, set max = arr[i]
        if (arr[i] > max) max = arr[i];
    }
    //return the maximum
    return max;
}

//TC: O(n) (in this case, we have to loop through the entire array, even if the first element is largest,
//              we still have to compare it with the other elements to know for sure. so the time complexity is O(n)
//              due to the loop, but even in the best case, the TC will still be Ω(n). It needs to run n times
//              in any and all cases.)
//SC: O(1) (no auxiliary array or object variables that depend on arr)