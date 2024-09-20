const fs  = require('fs');

const a = 10;

setImmediate(() => {
  console.log('setImmediate');
});

Promise.resolve().then(() => {
  console.log('Promise 1');
});

fs.readFile('./file.txt', () => {
  console.log('File reading completed');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

process.nextTick(() => {
  console.log('process.nextTick');
});

function printA() {
  console.log(a);
}

printA();

console.log("Last line of the script");

/**
 * Output:
 * 10
 * Last line of the script
 * process.nextTick
 * Promise 1
 * setTimeout
 * setImmediate
 * File reading completed
 */