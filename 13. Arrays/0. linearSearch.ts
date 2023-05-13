function linearSearch<T extends string | number>(arr: T[], key: T): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === key) {
            return i;
        }
    }
    return -1;
}

//TC: O(n)
//SC: O(1)