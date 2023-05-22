//Q:Apply merge sort on an array of lowercase strings.
//
//To sort a string in ascending order, we know that the <, >, === operators work the same. So merge sort will be
//  applied the same

function mergeSortOnStringArray(arr: string[]): string[] {
    //if length of arr is less than 2, it is either 1 or 0, so no point in splitting further, just return arr
    if (arr.length < 2) return arr;

    //calculate half index
    let half = Math.floor(arr.length / 2);

    //use splice with half to store firstHalf in one variable, and arr is modified to store the second half
    let firstHalf = arr.splice(0, half);

    function merge(firstArray: string[], secondArray: string[]): string[] {
        //create solution string
        let sol: string[] = [];

        //use while loop
        while (firstArray.length && secondArray.length) {
            //compare elements and push accordingly
            if (firstArray[0] < secondArray[0]) {
                //get rid of 0th element so that the next element becomes 0th element
                sol.push(firstArray.shift() as string);
            } else {
                sol.push(secondArray.shift() as string);
            }
        }

        //return like this so that excess elements are also added
        return [...sol, ...firstArray, ...secondArray];
    }

    //return merged version of recursive merge sort
    return merge(mergeSortOnStringArray(firstHalf), mergeSortOnStringArray(arr));
}

//TC and SC are same as number merge sort

//Call it the same way
let STRING_ARRAY_TO_SORT = ["bcdes", "akrecea", "asdceca", "bgrscac", "xererar"];
console.log(mergeSortOnStringArray(STRING_ARRAY_TO_SORT));