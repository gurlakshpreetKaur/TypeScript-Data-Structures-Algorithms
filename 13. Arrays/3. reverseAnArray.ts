function reverseArray<T>(arr: T[]): T[] {
    for (let i = 0; i < Math.floor(arr.length); i++) {
        //save current index's value
        let leftHandValue = arr[i];
        //calculate the index from the right hand (basically like mirroring)
        let rightHandIndex = arr.length - i - 1;
        //swap values
        arr[i] = arr[rightHandIndex];
        arr[rightHandIndex] = leftHandValue;
    }
    return arr;
}
//[0, 1, 3, 4, 5]
//[1, 2, 3, 4]