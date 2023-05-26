//leetCode link: https://leetcode.com/problems/container-with-most-water/
//Q:You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints
//  of the ith line are (i, 0) and (i, height[i]).
//  Find two lines that together with the x-axis form a container, such that the container contains the most water.
//  Return the maximum amount of water a container can store.
//Notice that you may not slant the container.
//
//Reference image: https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg
//
//Eg: heights = [1,8,6,2,5,4,8,3,7]
//  In this case, our set of lines will be-
//      |
//      |        ||                       ||
//      |        ||                       ||        ||
//      |        ||   ||                  ||        ||
//      |        ||   ||        ||        ||        ||
//      |        ||   ||        ||   ||   ||        ||
//      |        ||   ||        ||   ||   ||   ||   ||
//      |        ||   ||   ||   ||   ||   ||   ||   ||
//      |___||___||___||___||___||___||___||___||___||____________
//          1    8    6    2    5    4    8    3    7
//The most water will be stores between the 1th and 8th index (0-indexed), as follows-
//      |
//      |        ||                       ||
//      |        || =    =  = =    = =  = || = =  = ||
//      |        || = || =  = =    = =  = || = =  = ||
//      |        || = || =  = = || = =  = || = =  = ||
//      |        || = || =  = = || = || = || = =  = ||
//      |        || = || =  = = || = || = || = || = ||
//      |        || = || = || = || = || = || = || = ||
//      |___||___||_=_||_=_||_=_||_=_||_=_||_=_||_=_||____________
//          1    8    6    2    5    4    8    3    7
//  The total amount of water will be 49 squares, which is 7*7, that is the smaller bar*difference between bars.

import { textChangeRangeIsUnchanged } from "typescript";

//The most simple solution is the brute force approach, where 2 loops are used to calcalate the amount of water
//  in between each constainer.
//
//BUT FIRST, lets look at how this will be calculated. The amount of water in that area is the same as area of
//  a the largest possible rectaingle in that area. Similar to the trapping rainwater question, the amount of
//  water stored will depend on the SHORTER bar. So the area of this rectangle will be length*breadth. The length
//  is the height of the shorted bar, and the width will be the difference between the 2 bars.
//  So, amount of water = Math.min(rightBar, leftBar) * (rightBarIndex - leftBarIndex).
//
//Now lets code the brute force approach with this.
function containerWithMostWaterBruteForce(heights: number[]): number {
    let maxWater = 0; //create maxWater variable, and initialize with 0.

    //the outer loop will track the left bar. the left bar CANNOT be the last bar, since then there would be no
    //  right bar. so stop the left bar at 2nd last bar.
    for (let leftBarIndex = 0; leftBarIndex < heights.length - 1; leftBarIndex++) {

        //inner loop will track right bar, and rightbar must be ATLEAST 1 more than rightbar. So init the vars
        //  with that in mind
        for (let rightBarIndex = leftBarIndex + 1; rightBarIndex < heights.length - 1; rightBarIndex++) {

            //store right and left bars in vars
            let leftBar = heights[leftBarIndex];
            let rightBar = heights[rightBarIndex];

            //calculate water in current container with the formula
            let currentWater = Math.min(leftBar, rightBar) * (rightBar - leftBar);

            //if it is greater than maxWater, make it the new maxWater
            if (currentWater > maxWater) maxWater = currentWater;
        }
    }

    //return the max water
    return maxWater;
}

//TC: O(n^2) due to the nested loop
//SC: O(1)

//Optimized approach: 2-pointer
//Okay, lets think of how the water can be maximized, with this-
//      |
//      |        ||                       ||
//      |        ||                       ||        ||
//      |        ||   ||                  ||        ||
//      |        ||   ||        ||        ||        ||
//      |        ||   ||        ||   ||   ||        ||
//      |        ||   ||        ||   ||   ||   ||   ||
//      |        ||   ||   ||   ||   ||   ||   ||   ||
//      |___||___||___||___||___||___||___||___||___||____________
//          1    8    6    2    5    4    8    3    7
// To get the most water, we need to highest right bar, AND the highest left bar, WITH the highest gap possible
//  in between. So what we will do it start with 2 pointers- one at right most bar and one at left most bar
//  We will keep track of the maximum water stored in a variable.
//      |
//      |        ||                       ||
//      |        ||                       ||        ||
//      |        ||   ||                  ||        ||
//      |        ||   ||        ||        ||        ||
//      |        ||   ||        ||   ||   ||        ||
//      |        ||   ||        ||   ||   ||   ||   ||
//      |        ||   ||   ||   ||   ||   ||   ||   ||
//      |___||___||___||___||___||___||___||___||___||____________
//          1    8    6    2    5    4    8    3    7
//          ^left-pointer                           ^right-pointer
//Now, we will calculate the water in that container. If it is greater than the current maximum water, set maximum
//  water to current water.
//Next MOST IMPORTANT STEP. Since we want to maximize the height of both bars, we will write an if condition.
//  IF LEFT BAR IS SMALLER THAN RIGHT BAR,
//      THEN INCREASE THE LEFT BAR INDEX
//  ELSE DECREASE THE RIGHT BAR INDEX (move towards the left)
//This will ensure the heights are maximized, and as the maxWater variable will store the maimum water level,
//  we can simply return at.

function containerWithMostWater2Pointer(heights: number[]): number {
    let maxWater = 0; //create a max water variable
    let leftPointer = 0; //start the left pointer at 0th index
    let rightPointer = heights.length - 1; //start right pointer at rightmost index.

    //now, run a loop while left pointer < right pointer. why this condition? because if they become the same,
    //  then there would be no point in calculating the water level, and if left becomes greater than right,
    //  then we are basically moving BACK TO WHERE WE STARTED, so no point in that too (right will move towards
    //  left when left pointer has already covered that distance and same with left pointer)
    while (leftPointer < rightPointer) {
        //get the left bar and right bar, and store in a variable
        let leftBar = heights[leftPointer];
        let rightBar = heights[rightPointer];

        //now calculate the water stored in this container
        let waterLevel = Math.min(leftBar, rightBar) * (rightPointer - leftPointer);

        //if it is greater than max water level, make it the new max water level
        if (waterLevel > maxWater) maxWater = waterLevel;

        //now use the if condition to check while pointer should be moved
        if (leftBar < rightBar) {
            leftPointer++;
        } else {
            rightPointer--;
        }
    }

    //at the end, return max water
    return maxWater;
}

//TC: O(n)  using the pointer, we only visit each bar only and exactly once, so we get O(n) TC
//SC: O(1)  the amount of memory taken will be constant regardless of input