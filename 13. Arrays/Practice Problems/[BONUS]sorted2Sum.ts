//leetCode link: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/

//Q:Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers 
//such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] 
//where 1 <= index1 < index2 <= numbers.length. Return the indices of the two numbers, index1 and index2, added by 
//one as an integer array [index1, index2] of length 2. The tests are generated such that there is exactly one 
//solution. You may not use the same element twice. Your solution must use only constant extra space.
//
//Let's first understand the question. We will be given an array of integers, which is 1-INDEXED, which means, we
// start indexing from 1 and not 0. We are tasked with returning the indices of a pair of two numbers from the array
// which add up to a given target BUT we can only use constant extra space.
//
//Intuitively, you might have thought of using a nested loop, which i as outer loop and j as inner loop. You could
// code it out, but we will not be using that approach, as it has a TC of O(n^2), which is very slow.
//
//Instead, we are going to the a 2-pointer approach. 2-pointer approach is a pretty popular way of handling
// 2 variables in a single loop. As the name suggests, we create 2 pointers, which point to different indices, and
// use them with a loop to solve the problem. 
//
//First, loop at this simple observation-
// Since the question says is is GUARANTEED that there exists a solution, and also that the array is sorted, we
// know that if the smaller number is at index i, the other number will be at an index greater than i.
//
//Now, to understand the 2-pointer approach, look at the following example solved using the
// 2-pointer approach-
//          arr = [1, 2, 3, 4, 5, 6, 7, 8], target = 10
//  The first step is to create the pointers
//          we will create 2 variables- start and end
//          start will be set to 0, and end will be set to arr.length - 1.
//      In case of this array,
//          start = 0
//          end = arr.length-1 = 7-1 = 6
//  Now, we create a while loop, which runs while start < end  (this is important, since we want both variables to
//    have a value. and as seen in the observation, one of the indexes will always be greater than the other if there
//    exists a valid solution)
//  In this while loop, we calculate the sum of the items at the start and end index.
//
//           s = start, e = end
//          [1, 3, 4, 5, 6, 7, 8]
//           s                 e
//         sum = nums[s]+nums[e] = 1+8 = 9
//
//     Now, we compare the sum with the target
//          if sum===target, return [start + 1, end + 1] as answer. Why do we add 1? because the array is 1-INDEXED,
//                                              but we solved the problem from a 0 index point of view, so we add 1
//          else if sum>target, end--    Why? Because the end element is the greatest out of our pair, so if the sum
//                                        is greater than the target, we decrease the greater index. Why not
//                                        decrease start instead? 
//                                        1. start is initialized with 0, so if we decrease it, start will become 
//                                           negative, which will lead to an error when we try to reference that 
//                                           index from the array. 
//                                        2. as you will later see, we do increase start, but that is if sum IS 
//                                           GREATER than target. if we decrease start when sum IS LESS than target, 
//                                           we are essentially going back to a case we have already seen, since we
//                                           already came from the left direction, going back there and expecting a 
//                                           different outcome is illogical.
//          else start++;     if this else statement was executed, that means that sum<target. since start element
//                                        is the smaller member of our pair, we increase it, so that sum will also
//                                        increase. Why not increase end instead? 
//                                        1. end is initialized with length-1, so if we decrease it, start will 
//                                           become out of bound, which will lead to an error when we try to  
//                                           reference that index from the array. 
//                                        2. as you have seen we do increase end, but that is if sum IS LESSER than 
//                                           target. if we increase end when sum IS GREATER than target, we are 
//                                           essentially going back to a case we have already seen, since we already
//                                           came from the right direction, going back there and expecting a  
//                                           different outcome is illogical.
//
//          In our case, 9<10, which means sum<target, so we do start++.
//          [1, 3, 4, 5, 6, 7, 8]
//           s                 e      BEFORE
//              s              e      AFTER
//
//      Now we repeat this process over and over again until we either find start and end such that arr[start]+arr[end]
//          equals target, or start becomes >= end in which case the loop breaks.
//
//          [1, 3, 4, 5, 6, 7, 8]
//              s              e      CURRENT
//          sums = nums[s]+nums[e] = 3+8 = 11
//              11>10, which means sum>target, so we do end--
//          [1, 3, 4, 5, 6, 7, 8]
//              s              e      BEFORE
//              s           e         AFTER
//              
//          [1, 3, 4, 5, 6, 7, 8]
//              s           e      CURRENT
//          sums = nums[s]+nums[e] = 3+7 = 10
//              10===10, so we return [start + 1, end + 1]. start = 1, end = 5, so [start + 1, end + 1] equals
//                  [1 + 1, 5 + 1] = [2, 6]. Remember, we added 1 because the question specifies that this array
//                  is 1-INDEXED. Hence, [2, 6] is our answer.
//
function twoSum(numbers: number[], target: number): number[] {
    //declare start var and initialize with 0
    let start = 0;
    //declare end var and initialize with numsber.length-1
    let end = numbers.length - 1;

    //create a loop that will run while start < end
    while (start < end) {
        //calculate sum of numbers at indices start and end
        let sum = numbers[start] + numbers[end];

        //if sum===target, it means we found the target, so we return [start + 1, end + 1]. we return this because
        //the question specified that we had to return an array containing the indices of the 2 numbers, and we
        //add 1 because the question specified we had to return the indices assuming they were from a 1-INDEXED
        //array. we wrote the solution according to a 0-INDEXED array, so need to adjust it accordingly by adding 1.
        if (sum === target) return ([start + 1, end + 1]);

        //if sum<target, we decrease end by 1. since the array is non decreasingly sorted, this means the next 
        //iteration will have a smaller sum, which is what we need since sum>target.
        if (sum > target) end--;

        //if sum>target, we increase start by 1. since the array is non decreasingly sorted, this means the next 
        //iteration will have a greater sum, which is what we need since sum<target.
        else start++;
    }
    //if we break out of loop, it means no result was found. in this case we return [-1, -1] since this is an error
    //case, as the question GUARANTEED that there would be a solution.
    return [-1, -1]
};

//TC: O(n)   (the while loop depends on length of input)
//SC: O(1)   (the amount of space taken up does not depend on length of input)