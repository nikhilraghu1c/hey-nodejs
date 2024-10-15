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
  setTimeout(() => {
    console.log("setTimeout inside readFile");
  },0);

  process.nextTick(() => {
    console.log("process.nextTick inside readFile");
  });

  setImmediate(() => {
    console.log("setImmediate inside readFile");
  });
  console.log("File reading completed");
});

process.nextTick(() => {
  console.log("process.nextTick");
});

console.log("Last line of the script");

/**
 * Output:
 * Last line of the script
 * process.nextTick
 * Promise 1
 * setTimeout
 * setImmediate
 * File reading completed
 * process.nextTick inside readFile
 * setImmediate inside readFile
 * setTimeout inside readFile
 */

/**
 * why setimmediate inside readFile is executed before setTimeout inside readFile?
 * 
 * The reason is that the setImmediate callback is executed in the check phase of the event loop, which is executed after the poll phase.
 * 
 * Because Event loops wait at Poll phase when nothing is there to execute and
 * then when it finds the callback of readFile, it executes it and then goes to
 * check the setImmediate callbacks and then goes to check the setTimeout callbacks)
 */
