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

//We need to write an algorithm, that, when given an array containing altitudes of water, returns the total amount
//of water trapped.

//Example with better visuals- https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png

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

//          3|                           |||
//          2|                     |||===|||
//          1|                     |||||||||
//          0|_____________________|||||||||_

////2. The height of the rainwater trapped will depend on the shorted bar.
//
//          3|                           |||
//          2|                     |||===|||
//          1|                     |||||||||
//          0|_____________________|||||||||_
//          As you can see, the altitude of water equals the height of the shorter surrounding bar.
//          From this, we can also derive that the amount of water will be as follows-
//                  amount of water = (altitude of water - height of bar below) * width
//                                  = (height of shorter surrounding bar - height of bar below) * width

//
function trappingRainwater(height: number[]): number {
    return 1;
}