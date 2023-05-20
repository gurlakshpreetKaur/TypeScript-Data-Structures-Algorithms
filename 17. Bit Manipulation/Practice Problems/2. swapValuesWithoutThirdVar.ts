//Q:Swap two numbers without using any third variable.
//
//The idea is to use XOR operators to swap two numbers by their property x^x=0.
//
//if the two items are x and y, then we will follow the following process-
//      x = x^y    (basically this is like a bitMask or stencil. it stores the bits by which x and y are different
//                      as XOR returns 1 when bits are different)
//      y = x^y    now we apply that stencil to y. since the value of x is x^y, then when we use the stencil
//                  on y, then it will flip the bits in those places where they are different, basically, it will
//                  make the 2 equal.
//
//      x = x^y    finally, since x is currently still the stencil, when we use it on y, we will get the original
//                  x value.
//
//So with this process we can swap the 2 items without a third variable

function swapItems(a: number, b: number): [number, number] {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    return [a, b];
}