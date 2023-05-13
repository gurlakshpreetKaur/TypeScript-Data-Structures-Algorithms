function binarySearch<T extends string | number>(arr: T[], key: T): number {
    if (arr.length === 0) return -1;
    let start = 0;
    let end = arr.length - 1;
    while (start >= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === key) return mid;
        if (arr[mid] > key) end = mid - 1;
        else start = mid + 1;
    }
    return -1;
}

//TC: O(logn)
//SC: O(1)