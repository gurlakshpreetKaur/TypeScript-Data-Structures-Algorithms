//Q: Given a number n and another number i, clear the last i bits of n and return it.
//
//Eg: 111011, i = 2
//      so we clear 2 bits from the end, and we get-
//          111000
//              ^^ cleared these 2
//
//Since this involves getting rid of bits, 3 operations come to mind- AND, left-shift, and right shift.
//
//So for this, we could just get rid of 2 bits from the length by right shifting.
//      Eg: 111011
// RS:        111011
//                ^^ excess bits will be removed, so we are left with-
//            1110
//                  but in this case, the bits have been removed, not cleared. they need to be replaced by 0s,
//                      not completely removed. so what should we do?
//      we simple left shift it by 2
//                  No you might be thinking that this would get rid of the first 2 bits, but because they are
//                      actually stored as 16-BITS, with 0s at the starting, that will not happen, they will just
//                      be shifted forward.
//            1110
//                  shift to right by 2
//          111000
//                  and this number is the same as clearing the bits.
//
//
function clearLastIBits(n: number, i: number): number {
    let shiftingToTheRight = n >> i;       //shift to the right by 1 so the last 2 bits are deleted
    let shiftingToTheLeft = shiftingToTheRight << i;   //now shift it to the left by 1 so the last 2 places have 0s
    //remember that left shift adds trailing 0s (Read basicBitwiseOperations.ts).

    //return the resultant numebr
    return shiftingToTheLeft;
}

//we can do this in a single line
function clearLastIBitsShort(n: number, i: number): number {
    return (n >> i) << i;
}

//There is another noteable method to do this.
//For this, look at this table:
//            https://www.exploringbinary.com/decimal-binary-conversion-table/
//Observe that there are some binary numbers, which consist of only the digit '1'. Try to find a pattern between them.
//They are all one less than a power of 2.
//      2^1 - 1 = 1, in binary it is 1
//      2^2 - 1 = 3, in binary it is 11
//      2^3 - 1 = 7, in binary it is 111
//      2^4 - 1 = 15, in binary it is 1111
//    so on and so forth.
//  If we take these binary numbers and flip them using the ~ operator, we will get a binary number who last
//      k digits are 0, where k is the power.
//      so ~1 = 1111111111111110
//              same with the rest
//      now if we take & of this bitMask with the input number, the last k digits become 0, due to the AND operation
//
//
function clearLastBitsUsingPowers(n: number, i: number): number {
    let thePowerOf2 = Math.pow(2, i);  //take ith power of 2
    let thePowerOf2Minus1 = thePowerOf2 - 1;    //subtract 1 so that the binary representation consists of i
    //consecutive ones at the end
    let bitMask = ~thePowerOf2Minus1;  //flip the bits using not operator so we i consecutive zeros at the end

    return n & bitMask;   //take and of the input and the bitmask, so the last i digits of n turn to 0.
}

//we can do this in a single line
function clearLastIBitsUsingPowersShort(n: number, i: number): number {
    return (~(Math.pow(2, i) - 1)) & n;
}