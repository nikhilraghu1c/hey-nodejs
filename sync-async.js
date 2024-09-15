const fs = require('fs');
const https = require('https');

console.log("Hello World");

let a = 100;
let b = 200;

// Blocking code or Synchronous code (Not recommended)
fs.readFileSync('./file.text', 'utf8');
console.log("This will run only after file is read");

setTimeout(() => {
    console.log("Set timeout completed after 5 seconds");
}, 0); // it will only be called once the call stack of the main thread is empty // only run after file is read

// Non-blocking code or Asynchronous code (Recommended)
https.get("https://dummyjson.com/products/1", (res) => {
    console.log("Fetched data from the server");
});

setTimeout(() => {
    console.log("Set timeout completed after 5 seconds");
}, 5000);

fs.readFile('./file.text', 'utf8', (err, data) => {
    console.log("File Data :", data);
});

function multiplyFn(a, b) {
    return a * b;
}

let c = multiplyFn(a, b);
console.log("Multiplication Result : ", c);