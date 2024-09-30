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

**Note:** Difference between **PATCH** and **PUT** in REST APIs is that **PATCH** is used to apply partial updates to a resource, while **PUT** is used to replace the entire resource

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

**https://mongoosejs.com/docs/api/model.html**

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

- **Delete API** - to delete the user by userId

  ```javascript
  app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
      // const user = await User.findByIdAndDelete({ _id: userId }); Both are correct
      const user = await User.findByIdAndDelete(userId); // ({_id: userId}) === (userId)
      if (!user) {
        res.status(404).send("No user found with the given user id");
      } else {
        res.send("User deleted successfully");
      }
    } catch (err) {
      res.status(400).send("Error while deleting user:" + err.message);
    }
  });
  ```

- **Update API** - to update the user data by userId
  ```javascript
  app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
      // First parameter is the id of the document to be updated and the second parameter is the data to be updated
      // If in the data any extra field is added which is not in the schema then it will not be added to the document , It will be ignored
      // returnDocument: "before" returns the document before the update is applied, optional but useful
      const dataBefore = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "before",
      });
      console.log(dataBefore);
      res.send("User updated successfully");
    } catch (err) {
      res.status(400).send("Error while updating user:" + err.message);
    }
  });
  ```

# Data Validation & Schema Sanitization

- We can define some data validation like **required, minlength, maxlength** etc. inside the schema.
- If the data is not provided as per the schema validation during insert/update, it will throw an error.
- Example:-

```javascript
  "emailId": {
    type: String,
    required: true, // Ensures that the email is provided
    unique: true, // Ensures that the email is unique
    lowercase: true, // Converts the email to lowercase before saving it
    trim: true, // Removes the extra spaces from the email
  }
```

- We can also add validate function to the fields which validates the data but validates only works when the new data is added to the database and if we try to update the data then it will not validate the data so we need to use the middleware for that and need to send runValidators to be true to the options in the models method where the api definitions defines.

```javascript
  "gender": {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is invalid!!");
      }
    }
  }
```

```javascript
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true, // run the validators on the update operation
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error while updating user:" + err.message);
  }
});
```

- If we can add timestamps to be true inside the schema then mongodb will automatically add createdAt and updatedAt timestamp into the documents / database.

```javascript
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);
```

- We can also add API level data sanitization. eg:-

```javascript
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    // only updates of below fields allowed else it will throw error
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates provided!!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const dataAfterUpdate = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!dataAfterUpdate) {
      throw new Error("No user found with the given user id");
    }
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error while updating user:" + err.message);
  }
});
```

- **We can also use external library (validator) to validate the incoming data from user, which we can add either at schema level validation or API level validation**

  - **npm install validator**

  ```javascript
    const validator = require("validator");

    "emailId": {
      type: String,
      required: true, // Ensures that the email is provided
      unique: true, // Ensures that the email is unique
      lowercase: true, // Converts the email to lowercase before saving it
      trim: true, // Removes the extra spaces from the email
      validate(value) {
        // Use to validate the email provided by the user is valid or not, using validator
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!!");
        }
      }
    },
  ```

**NOTE: NEVER TRUST REQ.BODY**

# Password Encryption & Decryption

- Cannot store signup password directly in the document db so need to store in the encrypted form.
- Before Encrypting the data, first we have to validate the signup data

  - Create Separate file validation.js inside utils folder for req.body data validation

    ```javascript
    const validator = require("validator");
    const validateSignUpData = (req) => {
      const { firstName, lastName, emailId, password } = req.body;

      if (!firstName || !lastName) {
        throw new Error("First Name and Last Name are mandatory fields");
      } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is invalid!!");
      } else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong!!");
      }
    };
    module.exports = {
      validateSignUpData,
    };
    ```

  - We can import this function in app.js and use in the **/signup** api definition and after validation, we have to encrypt the password using the external library npm package **bcrypt**.

    - **npm install bcrypt**

    ```javascript
    app.post("/signup", async (req, res) => {
      try {
        // Validate the request body
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          firstName,
          lastName,
          emailId,
          password: hashedPassword,
        });
        await user.save();
        res.send("User added successfully");
      } catch (err) {
        res.status(400).send("ERROR:" + err.message);
      }
    });
    ```

- **Login API:** Create a login api in which we will compare the password using bcrypt
  1. Validate the login user data if invalid data found then throw error
  2. If login data is valid then get the user by emailId using **User.findOne** methodand check user exists or not, if not exists then throw the error
  3. If user exists then check the password which client enter is correct or not. We can check this by using **bcrypt.compare** method
  4. **bcrypt.compare(myPlainTextPassword , userHashPasswordStoredInDB)**
  5. **Always throw Invalid credentials error if any validation not match in case of invalid emailId or password. Don't throw Email and Password not found error for security reasons.**
     **Example:-**
  ```javascript
  app.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      validateLoginData(req); // function validate data and throw error if invalid function found
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      } else {
        res.send("User logged in successfully");
      }
    } catch (err) {
      res.status(400).send("ERROR:" + err.message);
    }
  });
  ```

# JSON Web Token (JWT) , Authentication & Cookies

- **JWT:-**

  - An open industry standard (RFC 7519) method for representing claims securely between two parties.
  - JWT token consists of three parts: Header, Payload, and Signature.
  - Header: Contains the type of token and the hashing algorithm used.
  - Payload: Contains the claims. Claims are statements about an entity (typically, the user) and additional data.
  - Signature: Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.
  - JWT.IO allows you to decode, verify and generate JWT.
  - **npm i jsonwebtoken**

- After login, For every api call, we need to check every api call which is coming from the user is authenticated or not.

- For that we will use JWT token to authenticate the user. So Everytime we call the api then we will get the token from the user and then we will verify the token and then we will allow the user to access the api.

- Browser stores the token in the cookies and then we will get the token from the cookies and then we will verify the token and then we will allow the user to access the api. we can also set the expiry time for the token.

- We need to create a JWT token using another package called **jsonwebtoken** using **jwt.sign({ \_id: user.\_id }, "SecretKey")**.

- After that we need to set the token in the cookie using **res.cookie("token", token)**.

- After token set in cookie, When we hit another api then first we get the cookie from the request **req.cookies**, then cookies is not parsed so we need to parse it using **cookie-parser** middleware.

  ```javascript
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  ```

- After cookie parsing , we will get the token in the request object as req.cookies.token and then we will verify this token using jwt.verify method.

- **jwt.verify(token, "SecretKey")** will return the decoded message if the token is valid.

- If the token is valid, we will get the decoded message and then we will find the user using the \_id from the decoded message. If the user is found, we will send the user data in the response.

- Example:-

  ```javascript
    app.post("/login", async (req, res) => {
      try {
        // ........
        if (isPasswordValid) {
          const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$7777");
          res.cookie("token", token);
          res.send("User logged in successfully");
        }
        // ........
      }
    });

    app.get("/profile", async (req, res) => {
      try {
        const { token } = req.cookies;
        if(!token) {
          throw new Error("Invalid token");
        }
        // Check if the token is valid
        const decodedMessage = jwt.verify(token, "DEV@Tinder$7777");
        const { _id } = decodedMessage;
        const user = await User.findById(_id);
        if(!user) {
          throw new Error("User not found");
        }
        res.send(user);
      }
    });
  ```

- In above we have to write user authentication logic to every api, so instead of this we can create one middleware **auth.js** and use it in every api. In that middleware it will get the JWT token from the cookies and validate the JWT token and then we will allow the user to access the api
  - **Example:-**
    ```javascript
      // Middleware auth.js
      const userAuth = async (req, res, next) => {
      try {
        const { token } = req.cookies;
        if (!token) {
          throw new Error("Invalid token");
        }
        // Check if the token is valid
        const decodedObj = await jwt.verify(token, "DEV@Tinder$7777");
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User not found");
        } else {
          req.user = user; //Set the user object in the request object
          next();
        }
      } catch (err) {
        res.status(400).send("ERROR:" + err.message);
      }
    };
    ```
- **To set the expire of JWT token and cookies , we can use the expiresIn option in jwt.sign() method and expires option in res.cookie() method**.
