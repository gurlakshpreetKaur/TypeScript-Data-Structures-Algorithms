//geeksForGeeks link: https://practice.geeksforgeeks.org/problems/shortest-direction4201/1 (not available in TS/JS)
//
//Q:A person wants to go from origin to a particular location, he can move in only 4 directions(i.e East, West,
//  North, South) but his friend gave him a long route, help a person to find minimum Moves so that he can reach to 
//  the destination.
//  Note: You need to print the lexicographically sorted string. Assume the string will have only ‘E’ ‘N’ ‘S’ ‘W’ 
//  characters.
//
//Example-
//  directions = "EWE"
//  If a person goes 1 step to the east, then 1 step to the west, he is back at his original position. Then, going
//  one step to the east means simply that- one step to the east. so, the shortest route is "E".
//
//PS. lexicographically sorted means sorted according to order of appearence in the english alphabet. So, a comes
//      before b, b comes before g, etc. We are working with only 4 letters- "E", "N", "S", "W", so in the solution
//      all the "E"s should come first, then "N"s, then "S", then finally the "W"s.
//
//Okay so lets think about it.
//If we are given a route "NWES", that means 1 step to north, then 1 step to west, then 1 step to east, then
//      finally one step to south. But here, notice, that if we take 1 step to north, then 1 step to south, then
//      we will be back where we started. similarly, 1 step to the west, then 1 step to the east will lead us
//      back to where we started. So the solution to this is "", as we dont need to go anywhere.
//      Basically from this, we derive that if the string has k number of "N" AND k number of "S", then we dont
//      need to move to the north or the south, as they will cancel. Same with west and east.
//
//If we are given "NNSEWW", then we move to the north 2 times, then 1 time to the south. 2 steps to the north then
//      one step to the south just means 1 step to the north, because it is 2-1. Same logic can be applied with
//      east and west.
//From both these cases, we now know that if the number of "N" === number of "S" then our solution will include
//      neighter "N" not "S", as they simple cancel, and same with "E" and "W". If number of "N" > number of "S",
//      then solution with contain (number of "N" - number of "S") "N"s. This same observation can be applied to
//      ("S", "N"), ("E", "W"), ("W", "E") too.
//          This also blends in with our first observation, as if N===S, then N-S becomes 0, so our sol will have
//          0 Ns or Ss, same with E and W.
//
//So from this we know that for our solution to work, we first have to store the counts of letters in variables.
//  For this, we will loop the string at the very start and accordingly increase counts.
//Then, we substract northCount from southCount. If this is negative, it means southCount > northCount, by
//  Math.abs(subtraction). So our solution will contain Math.abs(subtraction) "S"s. If it is positive, it means
//  northCount > southCount by subtraction. so our solution will contain difference "N"s. If subtraction is 0, then
//  the solution will contain neither "S"s nor "N"s. Same login can be applied to "E" and "W".
//Finally, about the sorting, we can convert string to array then sort it and then convert it back to string, or
//  add the chars to the solution in a sorted manner. so adding the "E"s first, then "N"s, then "S"s, and finally
//  "W"s. I will be using the 2nd method, to save some space in memory, plus I find it neater.
//
function shortestDistance(directions: string): string {
    //create variables to store count of occurences of each direction in the string, and initialize all with 0.
    let northCount = 0;
    let southCount = 0;
    let eastCount = 0;
    let westCount = 0;

    //loop over the string, and check which direction it is. then increase respective variable.
    for (let i = 0; i < directions.length; i++) {
        if (directions.charAt(i) === "N") northCount++; //if it is N, then increase north count
        else if (directions.charAt(i) === "S") southCount++; //if it is S, then increase south count
        else if (directions.charAt(i) === "E") eastCount++; //if it is E, then increase east count
        else westCount++; //if its none of the above, then it must be west, so increase west count
    }

    let northSouthNet = northCount - southCount; //calculate difference of north count and south count
    let eastWestNet = eastCount - westCount; //calculate difference of east count and west count

    let sol = ""; //declare string to store solution

    //adding the items to sol in lexicographical order
    //first checking is east west difference > 0, if it is > 0 it means east count is more than west count
    //  in which case, we will add "E" to the solution eastWestNet times
    //  it is note worthy that this condition wont be true if eastWestNet === 0, so no letters will be added in
    //  that case. which also works with our observation that when opposite direction counts are equal,
    //  neither of those letters will be part of the solution.
    if (eastWestNet > 0) for (let i = 0; i < eastWestNet; i++) sol += "E";

    //next in lexicographical order is "N", so we check if northSouthNet > 0. if northSouthNet < 0, that means
    //  north count > south count, so we add "N" to the sol northSouthNet times
    if (northSouthNet > 0) for (let i = 0; i < northSouthNet; i++) sol += "N";

    //next in lexicographical order is "S", so we check if northSouthNet < 0. if northSouthNet < 0, that means
    //  south count > north count, so we add "S" to the sol Math.abs(northSouthNet) times. We must take abs
    //  to ensure a positive value, to work with our loop
    if (northSouthNet < 0) for (let i = 0; i < Math.abs(northSouthNet); i++) sol += "S";

    //lastly, we check if eastWestNet < 0. this would mean that westCount > eastCount, in which case we add
    //  "S" to the sol Math.abs(eastWestNet) times. Here too, we must take absolute value.
    if (eastWestNet < 0) for (let i = 0; i < Math.abs(eastWestNet); i++) sol += "W";

    //lastly return sol
    return sol;
}