console.log("Hello World");

let a = 100;
let b = 200;

setTimeout(() => {
    console.log("Call me asap");
}, 0);

setTimeout(() => {
    console.log("Call me after 5 seconds");
}, 5000);

function multiplyFn(a, b) {
    return a * b;
}

let c = multiplyFn(a, b);
console.log("Multiplication Result : ", c);