//leetCode link: https://leetcode.com/problems/maximum-subarray/

//Observe-
////Positive Number + Positive Number = Greater Positive Number (good situation for us)
////Big Positive Number + Small Negative Number = Slightly Smaller Positive Number (eh situation for us)
////Big Negative Number + Small Positive Number = Big Negative Number (bad situation for us)
///////A 0 is better for us than a negative number, so Kadane thought, why take the negative number? take a 0.

//Approach-
////Kadane's algorithm says to loop though the array and calculate current sum (running sum), and keep a maximum sum
////What we want to do is, if the current sum becomes less than 0, we make it 0. We change the value
////because 0 is better than a negative number. basically if curr sum < 0, then drop the curr sum and make it 0.
////at the same time, we keep the max value as it is, so we know that even if the curr sum is dropped, the max value
////with stay authentic

//Example-
////                        [1, -4, 7, -9, 6]
////max = -Infinity (for reasons discussed in previous approaches)
////curr = 0 (because we dont have a current sum yet)

////First iter
////////curr = curr + arrayIndexValue = 0 + 1 = 1;
////////1 > 0, so max becomes 1
////////hence, curr = 1, max = 1

////Second iter
////////curr = curr + arrayIndexValue = 1 + -4 = -3
//////// -3 < 0, negative is worse than 0, so we reset value of curr to 0
////////0 < 1, so no changes in max
////////hence, curr = 0, max = 1

////Third iter
////////curr = curr + arrayIndexValue = 0 + 7 = 7
////////7 > 1, so max becomes 7
////////hence, curr = 7, max = 7

////Fourth iter
////////curr = curr + arrayIndexValue = 7 + -9 = -2
//////// -2 < 0, negative is worse than 0, so we reset value of curr to 0
////////0 < 7, so no changes in max
////////hence, curr = 0, max = 7

////Fifth iter
////////curr = curr + arrayIndexValue = 0 + 6 = 6
////////6 < 7, so no changes in max
////////hence, curr = 7, max = 7

////max = 7, so our max subarray sum is 7

//BUT, there is a corner case that we need to cover, that is, this doesn't work if all numbers are negative.
////in that case, zero will be returned as we change curr to 0 if curr < 0.
////0 > -Infinity, so max will become 0.
////this wont work.
////So, in the end we need to check if max is 0. if max is 0, we will find the greatest number in the array
////using a for loop and return this. more on this in the code comments further down.

function maxSubarraySumKadanesAlgorithm(arr: number[]): number {
    //initialize max with -Infinity
    let max = -Infinity;
    //initialize curr with 0
    let curr = 0;
    for (let i = 0; i < arr.length; i++) {
        //add arr's ith element to curr
        curr += arr[i];
        //if this results in curr being < 0, drop curr's value and make it 0
        if (curr < 0) curr = 0;
        //if curr > max, we set max to curr
        //else if curr > max (we use if else because the 2 possibilities are exclusive) we set max to curr
        if (curr > max) max = curr;
    }
    //in the event that all numbers are negative, max will be 0
    //because the minimum value that we allow for curr is 0 (we set it to 0 if the value goes below 0)
    //and 0 is greater than 0. which means when comparing a negative number and 0, 0 will be greater so max
    //will be 0.
    //in this case, we cant directly print max, as it will be incorrect. in this even, we use an if condition
    //to check if max === 0.
    //if max === 0, we use a for loop to find out the greatest number among the negative numbers.
    //we will return this number, as it will be the max sum. adding any other number of the array to it will
    //only decrease the sum as all numbers are negative.
    if (max === 0) {
        max = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
    }
    return max;
}

//TC: O(n) (due to the loop)
//SC: O(1) (we use constant number of vars, no arrays or objects)