//Statement: Algorithm A and B have a TC of O(n) and O(logn) respectively, therefore B always runs faster than
//  A.
//  Is this statement true or false?

//False. A better TC does not guarantee a faster runtime, runtime depends on a lot of other factors too, one of
//  which is the size of input. For example, even though Merge Sort has better TC than quick sort, quick sort
//  tends to run faster as no time is wasted in allocating and managing space in memory, in cases of arrays.