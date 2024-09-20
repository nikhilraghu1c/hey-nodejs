const fs = require("fs");

setImmediate(() => {
  console.log("setImmediate");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

fs.readFile("./file.txt", "utf-8", () => {
    console.log("File reading completed");
});

process.nextTick(() => {
    process.nextTick(() => { console.log("inner nextTick 1"); });
    console.log("process.nextTick");
});

console.log("Last line of the script");

/**
 * Output:
 * Last line of the script
 * process.nextTick
 * inner nextTick 1
 * Promise 1
 * setTimeout
 * setImmediate
 * File reading completed
 */

/**
 * why inner nextTick 1 is executed before Promise 1?
 * 
 * Because process.nextTick is executed before the microtask queue (which contains Promise callbacks) is processed. And it is higher priority than the other queues.
 */