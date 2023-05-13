function printPairsInArrays(arr: any[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            console.log("[" + arr[i] + ", " + arr[j] + "]");
        }
    }
}