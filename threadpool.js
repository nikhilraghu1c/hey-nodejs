const fs = require("fs");
const crypto = require("crypto");

process.env.UV_THREADPOOL_SIZE = 10;

fs.readFile("./file.txt", "utf-8", () => {
  console.log("1- File reading completed");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", () => {
    console.log("1- Crypto pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", () => {
  console.log("2- Crypto pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", () => {
  console.log("3- Crypto pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", () => {
  console.log("4- Crypto pbkdf2 done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", () => {
  console.log("5- Crypto pbkdf2 done");
});


/** 4 crypto execute first once because default size of thread pool is 4 thats why first 4 async task will be executed 
 * and then 5th task will be executed after completion of any of the first 4 task
 * 
 * we can increase the size of thread pool by setting the environment variable UV_THREADPOOL_SIZE
 * process.env.UV_THREADPOOL_SIZE = 10;
 */
