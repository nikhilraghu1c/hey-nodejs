console.log("Sum Module Executed");

var x = "Hello Node JS";

function calculateSum(a, b) {
  return a + b;
}

module.exports = {
    calculateSum,
    x
};