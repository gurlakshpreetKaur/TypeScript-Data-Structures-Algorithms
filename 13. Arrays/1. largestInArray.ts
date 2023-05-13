function largestInArray(arr: number[] | string[]) {
    if (arr.length === 0) return null;
    let max = arr[1];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

//TC: O(n)
//SC: O(1)