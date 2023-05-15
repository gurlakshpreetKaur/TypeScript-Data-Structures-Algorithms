//leetCode link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

//Q: You are given an array prices where prices[i] is the price of a given stock on the ith day.
//   You want to maximize your profit by choosing a single day to buy one stock and choosing a different day
//   in the future to sell that stock.
//   Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

//Stocks are basically items you buy and sell at specific times to maximize profit, so, in this question, we are
//  given an array of length n, containing the price of xyz stock on the ith day. And we have to calculate the
//  maximum possible profit.
//To do this, we basically have to minimize our buying cost, and maximize out selling price. To generate a profit
//  we have so sell the stock at a price greater than the buying cost.
//
//This can easily be done using nested loops, we can compare the costs on ith and jth day, calculate profit, and
//  store it in a max variable. But this is slow, and has O(n^2) TC, so we want to find a faster way to calculate
//  max profit.
//
//You may be thinking, why not just take max item of array, and minimum item of array, and use them to calculate
//  profit? Well, this won't work for reasons such as the following-
//    In some arrays, the minimum item may occur after maximum item, in which case, the result will we wrong.
//      Example-
//              [7, 2, 3, 8, 9, 1]
//          Max item = 7
//          Min item = 1
//              7 - 1 = 6, so 6 should be our max profit, right? NO! Because 7 occurs before 1
//              so it is impossible to buy a stock on day 6 for a price of 1, and sell it on day 1
//
//So, we need a different strategy.
//
//Approach-
//1. If we keep track of the buying price, then we know that on day 1 our buying price will be cost of
//      stock on day 1. We want to minimze out buying price, so for each day, we will compare the price of stocks
//      and change the buying price to keep it minumum. This will be done using a loop.
//2. At the same time, we will have a maximum variable, which will store max profit. So each day, we calculate
//      the profit, and if it is greater than max, we set max to day's profit. This will only happen if the
//      today's stock price > buying price.
//3. BUT, if today's stock price < buying price, then we will set buying price to selling price. Because this means
//      that we have found a cheaper day to buy stocks. This way, our selling price, buying price, max, and profit
//      all stay updated.

function bestTimeToBuyAndSellStocks(stocks: number[]): number {
    //declare max variable and initialize with 0 because 0 is is the minimum profit, we wont buy or sell stocks
    //if it generates a loss, 0 is lower bound.
    let max = 0;
    //declare buying price variable and initialize it with Infinity, so that all numbers are lesser than it
    let buyingPrice = Infinity;

    //iterating through stock prices
    for (let i = 0; i < stocks.length; i++) {
        //if stocks[i] > buying price, that means a profit is possible, so we calculate profit and compare with max
        if (stocks[i] > buyingPrice) {
            let TODAYS_PROFIT = stocks[i] - buyingPrice;
            if (TODAYS_PROFIT > max) max = TODAYS_PROFIT;
        }
        //if stocks[i] < buying price, then we have found a cheaper price for stocks, and a better day to buy
        //the stocks, we we set buying price = stocks[i]
        else {
            buyingPrice = stocks[i]; //since BP was initialized with Infinity, this condition will always
            //be true in the first iteration, and BP will always = stocks[0]
        }
    }
    return max;
}

//TC: O(n)  (due to the loop)
//SC: O(1)  (we dont have arrays or objects, just numbers that we use to store max and buying price)