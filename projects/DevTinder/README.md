## PROJECT - DEVTINDER

**https://github.com/akshaymarch7**

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
- BackEnd Micro service (NodeJS, Mongodb, Mongoose, ExpressJS)

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
  o/p => **/abcd, /ac**

- app.get("/ab+c") o/p => **/abc, /abbc, /abbbc, /abbb...c** (Any count of b in between a and c)

- app.get("/ab\*cd") o/p => **/abNIKHILcd** (Any keyword in between ab and cd)

- https://localhost:7777/user?firstName=Nikhil&lastName=Raghuwanshi =>

  ```javascript
  app.get("/user", (req, res) => {
    console.log(req.query);
    res.send("Query params");
  });
  ```

  **req.query will give us the query params**

- https://localhost:7777/user/123 https://localhost:7777/user/234

  ```javascript
  app.get("/user/:userid", (req, res) => {
    console.log(req.params);
    res.send("Query params");
  });
  ```

  **req.params will give us the params**

- ```javascript
  // We can add multiple request handlers to a single route
  // (req,res) => {} is a request handler

  app.use(
    "/user",
    (req, res, next) => {
      console.log("Handling the route user!!");

      // res.send("Hello User!!"); // next is called and error will be thrown
      // nextis use to pass the control to the next request handler

      next();
    },
    (req, res) => {
      console.log("Handling the route user 2!!");
      res.send("Hello User 2!!");
    }
  );

  // we can also define multiple app.get() for the same route and it will work same as array
  app.get("/user", (req, res, next) => {
    console.log("Handling the route user!!");
    next();
  });

  app.get("/user", (req, res, next) => {
    console.log("Handling the route 2 user!!");
    res.send("Hello from user!!");
  });

  res.status(401).send("Unauthorized Access");
  // res.status(401) use to send the status code 401
  ```

  **If we write the next and there is no next middleware then it will throw an error.**

  **All route handler can be written inside the array also [(req,res) => {}, (req,res) => {}]**

- **Middleware** is a request handler that allows you to intercept and manipulate requests and responses before they reach route handlers. They are the functions that are invoked by the Express.js routing layer. Middleware mainly use for logging and authentication purpose. **Route handlers** in Express.js are functions that handle requests when a matching route is found.

  ```javascript
  app.get(
    path,
    (req, res, next) => {},
    (req, res) => {}
  );
  ```

  **Example:-**

  ```javascript
  // Handle Auth Middleware for all the request to /admin (Get, Post, Put, Delete)
  app.use("/admin", (req, res, next) => {
    console.log("Admin auth getting checked");
    const token = "xyz";
    if (token === "xyz") {
      next();
    } else {
      res.status(401).send("Unauthorized Access");
      // res.status(401) use to send the status code 401
    }
  });

  // Middleware mainly use for logging and authentication purpose
  app.get("/admin/getAllData", (req, res) => {
    res.send("All Data Sent");
  });

  app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted User");
  });
  ```

- Always use **try-catch** block to handle errors inside the route handler.
  **Example:-**

  ```javascript
  app.get("/getUserData", (req, res) => {
    // Logic of DB call and get user data
    try {
      res.send("User Data Sent");
    } catch (err) {
      console.log("DB Connection Failed");
      res.status(500).send("DB Connection Failed");
    }
  });
  // Wild card Error Handling
  app.use("/", (err, req, res, next) => {
    if (err) {
      // Log the error
      res.status(500).send("Something went wrong");
    }
  });
  ```

  - (req, res) => Sequence if 2 parameters passed
  - (req, res, next) => Sequence if 3 parameters passed
  - (err, req, res, next) => Sequence if 4 parameter passed
  - **Note: Order is important of route**

# Database/Cluster connection using Mongoose

- https://mongoosejs.com/docs/index.html
- First Need to connect with the mongodb cluster using connection url
- Create a config file with database.js file inside it and then install npm package mongoose
  **npm install mongoose**
- Inside Database.js

  ```javascript
  const mongoose = require("mongoose");
  const connectDB = async () => {
    // connection url:- mongodb+srv://<user_id>:<db_password>@heynodejs.eig1v.mongodb.net/
    await mongoose.connect("<CONNECTION_URL> + '/' + <DATABASE_NAME>");
  };

  module.exports = { connectDB };
  ```

- Only after the successful database connection , we have to start the server using (**app.listen(7777)**)

  ```javascript
  // app.js
  const express = require("express");
  const { connectDB } = require("./config/database");
  const app = express();

  connectDB()
    .then(() => {
      console.log("Database cluster connected successfully");
      app.listen(7777, () => {
        console.log("Server is running on http://localhost:7777");
      });
    })
    .catch((err) => {
      console.log("Database cannot be connected!!");
    });
  ```

  # Schema & Models

  - Everything in Mongoose starts with a **Schema**. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
  - **Models** are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

  ```javascript
  // example creating a user schema & model,
  // /models/user.js
  const mongoose = require("mongoose");
  const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  });
  module.exports = mongoose.model("User", userSchema);

  // app.js
  // creating first signup API to signup a user
  app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model
    const userObj = {
      firstName: "Sachin",
      lastName: "Tendulkar",
      emailId: "sachin@tendulkar.com",
      password: "sachin@123",
    };
    try {
      const user = new User(userObj);
      await user.save();
      res.send("User added successfully");
    } catch (err) {
      res.status(400).send("Error while adding user:" + err.message);
    }
  });
  ```

  - **If the any key on userobj/request body is wrong, then it will be filter by the User model and it will not save into the DB**

  - Now if to take request body from the user for POST API then we will get the data in (req, res). But data is in form of JSON and JSON format is not supported/readable in the request handler then we can use one **Middleware** to convert that JSON Data into the Javascript object
  - To Convert JSON Data into JS object, Express given us one middleware **express.json()**

  ```javascript
  // Middleware to parse the request body
  app.use(express.json());

  // API to signup a user
  app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model
    const user = new User(req.body);
    try {
      await user.save();
      res.send("User added successfully");
    } catch (err) {
      res.status(400).send("Error while adding user:" + err.message);
    }
  });
  ```

  # API's

  - **FEED API:** Get API to get all the user
    - We can use mongoose model given functions to get or find the data from the database 
    ```javascript
      const User = require("./models/user");
      app.get("/feed", async (req, res) => {
        try {
          const users = await User.find({});
          res.send(users);
        } catch (err) {
          res.status(400).send("Error while fetching users:" + err.message);
        }
      });
    ```

    - To Get user by email 
    ```javascript
        const userEmail = req.body.email;
        const users = await User.find({ emailId: userEmail });
         res.send(users);
    ```
  - 
