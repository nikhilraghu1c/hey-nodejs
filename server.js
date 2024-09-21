const http = require("http");

const server = http.createServer((req, res) => {
    if(req.url === "/getSecretData") {
        res.end("Secret Data!!!");
    } else {
        res.end("Hello World!!!");
    }
});

server.listen(7777);