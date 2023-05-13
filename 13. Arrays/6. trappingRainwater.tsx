//Q: Given n non-negative integers representing an elevation map where the width of each bar is 1, compute 
////how much water it can trap after raining.

//Example:
//heights = [0,1,0,1,2,0,1,3,2,1,2,1]
//
//         4|
//         3|
//         2|                     |||
//         1|            |||      ||||||   |||
//         0|___|||___||||||___||||||||||||||||||__
//  heights    0  1  0  1  2  0  1  3  2  1  2  1
// Here, 3 consecutive vertical bars make up a building.
// If it rains, the water will be trapped between these buildings as such-
//
//         4|
//         3|
//         2|                     |||
//         1|            |||======||||||===|||
//         0|___|||===||||||===||||||||||||||||||___
//  heights   0  1  0  1  2  0  1  3  2  1  2  1
//Here, 3 consecutive = make up one unit of water, so if we count it, we will have 5 units of water.

//We need to write an algorithm, that, when given an array containing heights of buildings, returns the total amount
//of water trapped.

//Example with better visuals- https://lh5.googleusercontent.com/proxy/cclLB972aFGwq1iGo2F9KANxL7Rpq3wAxcsaMtQ1-0MT2TW4ZmEjr3B0Yos4nEiBiPUOpvvQLfT9OHAWpoiixv3J659-64iYLFsp6ybc=w1200-h630-p-k-no-nu

//Observations-
////1. Rainwater will only be trapped on a bar when there are 2 bigger bars beside it.
//
//          4|
//          3|
//          2|                     |||
//          1|                     |||
//          0|_____________________|||_______
//      In this case, because there is only 1 bar, no water will be trapped, since the water will fall beside it.
//
//          4|
//          3|                           |||
//          2|                     |||   |||
//          1|                     |||||||||
//          0|_____________________|||||||||_
//      In this case, since the middle bar is surrounded by 2 bigger bars, a container will be formed and water
//      be trapped like so-
//
//          3|                           |||
//          2|                     |||===|||
//          1|                     |||||||||
//          0|_____________________|||||||||_
//
//      From this we can also derive that if the heights are sorted in asceding or desceding order, the total water
//      stored will be 0. Since 

////2. The height of the rainwater trapped will depend on the shorter bar.
//
//          3|                           |||
//          2|                     |||===|||
//          1|                     |||||||||
//          0|_____________________|||||||||_
//          As you can see, the altitude of water equals the height of the shorter surrounding bar.
//          From this, we can also derive that the amount of water will be as follows-
//
//                  amount of water = (altitude of water - height of bar below) * width
//                                  = (height of shorter surrounding bar - height of bar below) * width
//
//              in the question, it is specified that width of each bar is 1 unit, so width = 1, and now
//              the formula becomes-
//
//                  amount of water = (altitude of water - height of bar at given index) * width
//                                  = (height of shorter surrounding bar - height of bar at given index) * width
//                                  = (height of shorter surrounding bar - height of bar at given index) * 1
//                                  = (height of shorter surrounding bar - height of bar at given index)
//
//      To find the shorter bar, we need heights of the greatest bars on both side of a given bar. In the above
//          case, we were able to find the shorter bar because we knew the maximum height on both the right and
//          the left side.
//      So from this, we can now derive, that whatever the solution will be, it must contain and use some method
//          to know the maximum heights of either side of ANY given bar.
//
//                  Hence, water altitude = Math.max(leftHighestBar, rightHighestBar).
//
//3. The process will involve using observation 2 for each item of array, which will require a loop.
//
//Approach-
//We know that we need to know the right highest bar and left highest bar for each item of array. This can either
//  be done by looping through the entire array each time and finding the maximums, OR, we can do another thing,
//  that is, that at the very beginning of the function, we first find the right max boundary and left max boundary
//  for each item of the array, and store each in an array. Here, the array is being used a supportive structure for
//  our algorith, and hence, we can call it an 'auxiliary' array.
//
//The above step can be achieved by the following steps-
//Step 1- Declare 2 arrays, each with a length same as the heigh array. One will store left max, the other will
//          store right max.
//Step 2- The left max array will basically be sorted in ascending order (we will start comparision from the left
//          so each item will only be greater than the item before, hence ascending), and the right max array will
//          be sorted in descending order (same reason as left max array except we start from the right and go the
//          to the left so it is sorted in descending order).
//          We will create both these arrays using loops, from the left, we will first add the first item of the 
//          height array to the left max array. Then while looping through the height array from 0 to length - 1,
//          and compare the previous left max with the current height. if previous left max > current height,
//          add current height to left max array, else add previous left max to left max array again. Repeat same
//          procedure with right max array, except go from length - 1 to 0 (end to start).
//Step 3- Loop through the height array, and calculate the water amount for each block, and add it to a total count
//         variable, using the following process-
//      - We know that the amount of water depends on shorter of the right max and the left max. So, calculate their
//          minumum (using the Math.min(a, b) or the > operator). Store this value in lowerBound variable.
//      - Subtract current height from lowerBound variable. This is the amount of water, save it in amountOfWater
//          variable.
//      - Add amountOfWater to the total count.
//Step 4- Return amountOfWater.
//
//
function trappingRainwater(height: number[]): number {
    //Declare rightMax and leftMax arrays with same length as height array
    let rightMax: number[] = new Array(height.length);
    let leftMax: number[] = new Array(height.length);

    //first add first item of height to the left max array (because no item exists before it, so it is max
    //for the 0th index)
    leftMax[0] = height[0];
    //calculate left max boundary for each item using a for loop from 1st index (we already added 0th index)
    for (let i = 1; i < height.length; i++) {
        //compare previous item of left max with current height to determine which is greater
        if (leftMax[i - 1] > height[i]) {
            leftMax[i] = leftMax[i - 1]; //if prevous item is greater, add previous item again for current index
        } else {
            leftMax[i] = height[i]; //else add the current height as it is greater
        }
    }

    //first add last item of height to the right max array (because no item exists after it, so it is max
    //for the last index)
    let LAST_INDEX = height.length - 1;
    rightMax[LAST_INDEX] = height[LAST_INDEX];
    //calculate right max boundary for each item using a for loop from last - 1 index (we already added last index)
    //keep in mind that we will add items to this array from right to left, not left to right
    for (let i = height.length - 2; i >= 0; i--) {
        //compare next item of right max with current height to determine which is greater
        if (rightMax[i + 1] > height[i]) {
            rightMax[i] = rightMax[i + 1]; //if next item is greater, add previous item again for current index
        } else {
            rightMax[i] = height[i]; //else add the current height as it is greater
        }
    }

    //declare count variable
    let count = 0;
    //use for loop to loop through height array, and calculate amount of water at each block
    for (let i = 0; i < height.length; i++) {
        //altitude of water = height of shorter maximum on either side
        let CURRENT_WATER_LEVEL = Math.min(leftMax[i], rightMax[i]);

        //amount of water = altitude of water - height of current index
        let WATER_AMOUNT = CURRENT_WATER_LEVEL - height[i];

        //add it to count
        count += WATER_AMOUNT;
    }

    return count;
}

//TC: O(n)   (due to the loops)
//SC: O(n)   (due to the auxiliary arrays)