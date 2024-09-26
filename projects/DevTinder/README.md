## PROJECT - DEVTINDER ##

# To Do

- Create an account 
- Login 
- Add your Profile
- Feed Page - Explore Dev
- Send Connection Request / Ignore
- See our matches
- See the request we have sent / received
- Edit your Profile

# MicroServices
- FrontEnd Microservice (React)
- BackEnd  Micro service (NodeJS, Mongodb, Mongoose, ExpressJS)

# DB Design
- User collection (All user info)
- Connection Request Collection (From, To, Status)

# API Design
- POST (/signup, /login, /profile, /sendRequest(ignore/interested), /reviewRequest(accept, reject))
- PATCH/PUT (/profile)
- GET (/profile, /requests, /connections)
- DELETE (/profile)

# ExpressJS
- Install ExpressJS using **npm i express**.
    ```javascript
        const express = require("express");
        const app = express();

        app.use("/", (req, res) => {
            res.send("Hello, Express.js");
        });

        app.use("/test", (req, res) => {
            res.send("Hello from the test route");
        });

        app.listen(7777, () => {
            console.log("Server is running on http://localhost:7777");
        });
        /**
         * app.use() is typically used for middleware, and it matches any route that starts with the specified path. 
         * So when you use app.use("/", ...), it will match any path, including "/hello" and "/test", because both these routes start with /.
         * This means that when you hit /hello or /test, the "/" route will be triggered because "/" matches all paths.
         * If we write app.use("/") after app.use("/hello") and app.use("/test"), then all routes will worked as expected. Sequence of routes is important.
         * 
         * Fixed code: app.get() for Specific Routes
         */
    ```
- app.get(), app.post(), app.delete(), app.post() => we can use this for specific route for specific purpose.

- app.get("/ab?c") => ? define optional so b is optional here
    o/p => **/ab , /abc** both route give same output and both will work
    eg.- ("/a(bc)?d") => bc is optional 
        o/p => **/abcd, ac**

- app.get("/ab+c") o/p => **/abc, /abbc, /abbbc, abbb...c** (Any count of b in between a and c)

- app.get("/ab*cd") o/p => **/abNIKHILcd** (Any keyword in between ab and cd)
