//Q:Write an algorithm to return true if input number is even else false
//
//You might be reading that and thinking "HAHAHAHHAHAH SO EASY JUST USE MODULO OPERATOR" NO! WE MUST SOLVE IT USING
//      BITWISE OPERATORS ONLY
//
//For this, you will first need to loook at this table: 
//      https://www.exploringbinary.com/decimal-binary-conversion-table/
//
//Look at it and try to find patterns that odd numbers exhibit, and how you could use them to identify if a number
//      is odd or even
//
//The answer is, look at the representation of each odd number. The last digit is always 1, but in an even number,
//      the last digit is always 0. There is a logical reason for this.
//
//In the stuffYouShouldReadBefore.txt file, there is a GeeksForGeeks article about binary to decimal and decimal
//      to binary conversion.
//      To convert from decimal to binary, we keep dividing the number by 2, and keep track of the remainder.
//          Then we read the remainders from last remainder to first remainder and that is binary representation.
//  Eg:
//          21
//              21/2 = 10, remainder = 1
//              10/2 = 5, remainder = 0
//              5/2 = 2, remainder = 1
//              2/2 = 1, remainder = 0
//              1/2 = 0, remainder = 1
//                  binary number will read from BOTTOM TO TOP
//                      so it will be 10101
//                  For odd numbers, the FIRST remainder will always be 1 (same as module).
//                  For even numbers, as they neatly divide with 2, the first remainder will be 0.
//          So there is a logical reason for this too.
//
//From this we know that to find if a number is even or odd, we just need the last digit. How do we get the last
//      digit of the binary representation of a number? Think about it for a moment, and remember all the
//      operators for binary numbers.
//
//We know how numbers are converted from binary to decimal, and decimal to binary. Let's look at the process
//      of binary to decimal again.
//          If we have 110 as a binary number, and we want to convert it to decimal, we will follow the following
//              process-
//              1. write the number in reverse- 011.
//              2. now write this from top to bottom as such-
//                      0
//                      1
//                      1
//              3. now go to each line, and start counting from 0. multiply the number in the 0th line with
//                  2^0, the number in 1th line with 2^1, the number in 2th line with 2^2, and so on.
//                  for the kth line, multiply the number with 2^k.
//                      0 * 2^0  =  0 * 1  = 0
//                      1 * 2^1  =  1 * 2  = 2
//                      1 * 2^2  =  1 * 4  = 4
//              4. now add all the numbers that we got after multiplying
//                      0+2+4 = 6.
//                  So now we know that decimal represenation of 110 is 6.
//          Now, lets think what would happen if we performed the same process with 0000000110. As the 0s at the
//                  start will simply multiply to 0 no matter what, it doesnt matter how many 0s we put,
//                  we will always get 6. REMEMBER THIS ONLY APPLIES FOR 0S THAT ARE ADDED TO THE LEFT SIDE,
//                  NOT RIGHT SIDE. This is same as how in decimal, 0000000056 is equal to 56.
//          
//          if we want the last digit, we need some way to eliminate all the other digits.
//                  when we're eliminating digits, theres 3 operations that come to mind- left shift, right shift,
//                  and BITWISE AND.
//
//For this solution, we will use BITWISE AND. Previously we discussed that 00000110 is equal to 110 in binary.
//          similarly, 0000000001 and 1 are the same. Using this information along with the BITWISE AND,
//          we can develop a new idea- if we take BITWISE AND of a number with 1, we will get its last bit.
//       Eg.
//              to get last bit of 111100011101
//                  1 1 1 1 0 0 0 1 1 1 0 1
//              &&  0 0 0 0 0 0 0 0 0 0 0 1
//              =   0 0 0 0 0 0 0 0 0 0 0 1, which is equal to 1.
//          so we now know that the last bit of this binary number is 1.
//
//              to get last bit of 111100011100
//                  1 1 1 1 0 0 0 1 1 1 0 0
//              &&  0 0 0 0 0 0 0 0 0 0 0 1
//              =   0 0 0 0 0 0 0 0 0 0 0 0, which is equal to 0.
//          so we know the last bit of this number is 0.
//
//We will use this process to get the last digit of the binary represenation of that number, then we will return
//          true if it is equal to 0 (even), else false (odd).
//
function isEven(n: number): boolean {
    let lastDigitOfBinaryRepresentation = n & 1; //using AND to calculate last bit, and storing in var

    //if last digit is 0, it means number is even, so return true
    //else it means then number is odd so return false
    //this expression evaluates to true if the last digit is 0, and false is it is 1, so we can easily just
    //  return that boolean
    return (lastDigitOfBinaryRepresentation === 0);
}

//we can shorten it to to this-
function isEvenShort(n: number): boolean {
    //if last bit is 1, then Boolean constructor will return true
    //  as when we do Boolean(1) we get true
    //if last bit is 0, the Boolean constructor return false
    //  as when we do Boolean(0) we get false
    //We will reverse it, as we want to return true is number is even and false if number is odd
    return !Boolean(n & 1);
}