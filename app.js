require("./xyz");
const { x, calculateSum } = require("./sum");

var a = 10;
var b = 20;

console.log(x);
console.log(calculateSum(a, b));
console.log(globalThis === global); // true
