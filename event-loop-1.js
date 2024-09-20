const fs  = require('fs');

const a = 10;

setImmediate(() => {
  console.log('setImmediate');
});

fs.readFile('./file.txt', () => {
  console.log('File reading completed');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

function printA() {
  console.log(a);
}

printA();

console.log("Last line of the script");

/**
 * Output:
 * 10
 * Last line of the script
 * setTimeout
 * setImmediate
 * File reading completed
 */