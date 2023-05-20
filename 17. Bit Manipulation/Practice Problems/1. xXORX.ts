//Q:What is the value of x^x for any value of x?
//
//You might have that read that question and thought it meant x to the power x, but no IT MEANS X XOR X
//
//We're asked to think of what would happen if we take XOR of a number with itself.
//
//When we take XOR of a number with itself, it means that for each digit 1, we're taking XOR with 1, and for each
//  digit 0, we're taking XOR with 0.
//
//  1^1 = 0
//  0^0 = 0
//
//  When the bits are the same, we get 0 from XOR, so the result with be 0.
//
//You can use the following function to try it with different values, the result will always be zero
//

function printXxorX(a: number) {
    console.log(a ^ a);
}