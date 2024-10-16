# hey-nodejs
Just to learn the nodejs all concepts

# Definition

- JS Runtime Environment built on V8 JS Engine
- Cross Platform / Open Source
- Event driven Architecture , Capable of Asynchronous I/O (Non Blocking I/O)
- Handled by OpenJS Foundation (First Developed by Ryan Dahl in 2009)
- Written in C++ (V8 --> C++ Program)
- An C++ application with V8 Engine embedded into it
- NodeJS (V8 Engine + Super powers like API on Server and many more)
- ECMAScript - Standard which is followed by JS and also by V8 Engine

# Starter

- Node version (Above 16 - V16.20.2)
- NPM Version (Above 8 - V8.19.4)
- Node REPL (Read, Evaluate, Print, Loop)
- 'node' - command to use to create JS runtime environment (Behind scene it will use V8 engine to execute JS)
           It is very similar to browser console

# Global Object

- In browser (this, self, frames ) referes to window (global object)
- In NodeJS - Global object is (global) and (this) refers to blank object
- globalThis - New Global object, Standard conviction for all browser and JS Run time Environment
- In NodeJS - globalThis === global (which is true). 

# Module & Require

- Node.js modules are reusable pieces of code that encapsulate related functionality and can be imported and used in other parts of a Node.js application
- They can be imported using the require() function, which allows access to the exported functionality.
- Modules can be created using the module.exports object to expose functions, objects, or values to other parts of the application.
- You can access other modules variable and function until unless they are exported
- By Default Modules are protected.
- To exports multiple function or variable then you have to wrap it in object
- Modules can be built-in Node.js modules, third-party modules installed via npm, or custom modules created by the developer.
- Modules help in separating concerns and promoting maintainability and scalability in Node.js applications.
- They promote code organization, modularity, and reusability.
- Require is used to load external modules or files in Node.js.
- Require provides a way to include external functionality into your application.
    * @requires module_name - The name of the module or file to be loaded.
    * @returns {Object} - The loaded module or file.
    * @throws {Error} - If the module or file cannot be found or loaded.
- We can also create a folder with an index.js file in it, which is responsible for exporting all the functions present in multiple files within the folder.

# How Module and Require Works Internally

- All the code of the module is wrapped inside a function called an IIFE (Immediately Invoked Function Expression), which is a self-executing anonymous function that is used to create a new scope for the module and prevent polluting the global scope.
  ```javascript
    (function (exports, require, module, __dirname, __filename) {
      // code of the module (js files) 
    })()  
  ```
- Different parameter like module, require passed to the function (IIFE) by nodejs & then pass to the V8 Engine.
- require(path)
  1. Resolving the path and module (json, js, node:module etc)
  2. Loads the module (Content according to the file type)
  3. Wraps inside the IIFE (Compile process)
  4. Evaluation (module.exports)
  5. Caching (If any module imports or require into multiple module then nodejs processed and cached it once & uses cached data into another module).

# CJS vs MJS

- **CJS (CommonJS)**
  - By default Used in Node.js or type in package.json will be commonjs.
  - Synchronous module loading.
  - Uses `require()` to import modules.
  - Uses `module.exports` to export modules.
  - Example:
    ```javascript
    // Importing a module
    const module = require('module_name');

    // Exporting a module
    module.exports = {
      functionName,
      variableName
    };
    ```

- **MJS (ES Modules)**
  - Used in modern JavaScript (ES6+) or type in package.json will be module.
  - Asynchronous module loading.
  - Uses `import` to import modules & Uses `export` to export modules.
  - Example:
    ```javascript
    // Importing a module
    import { functionName, variableName } from 'module_name';

    // Exporting a module
    export const functionName = () => { ... };
    export const variableName = 'value';
    ```

# Libuv & Async I/O (Non Blocking I/O)
  - JavaScript is a synchronous, single-threaded language, meaning there is only one thread in which the JavaScript engine (such as the V8 engine) runs. In JavaScript, code is executed line by line within this single thread.

  - So, if you're executing line 2 in JavaScript, it will only run after line 1 has finished executing. This is the essence of synchronous execution: each task is performed one after the other, without overlap.

  - So, JavaScript itself is synchronous, but with the power of Node.js, it can handle asynchronous operations, allowing JavaScript to perform multiple tasks
  concurrently.

  - The JS engine gains its superpowers from Node.js. Node.js grants these powers through a library named Libuv—our superhero.

  - The JS engine cannot directly access OS files, so it calls on Libuv. Libuv, communicates with the OS, performs all the necessary tasks, and then returns the response to the JS engine. He offloads the work and does wonders behind the scene.

  - Example:- 
    ```javascript
      let a = 10; let b = 20;
      
      https.get("https://api.fbi.com/", (res) => { console.log(res)}); // Handled By Libuv
      // (res) => { console.log(res)} => callback(A)

      setTimeout(()=> {console.log("timeout")}); // Handled By Libuv
      // ()=> {console.log("timeout")} => callback(B)

      fs.readFile("./abc.text", (data) => { console.log(data)}); // Handled By Libuv
      // (data) => { console.log(data)} => callback(C)

      function multiply(x,y) {return a*b;}
      let c  = multiply(a,b);
      console.log(c);
    ```
  - Steps:- 
    - The variables let a and let b are executed within the GEC (Global Execution Context) during the synchronous phase of the code execution process.

    - However, when the code encounters an API call, the V8 engine, while still operating within the GEC, recognizes that it's dealing with an asynchronous  operation. At this point, the V8 engine signals libuv to handle this API call.

    - What happens next is that libuv registers this API call, including its associated callback function (name - A), within its event loop, allowing the V8 engine to continue executing the rest of the code without waiting for the API call to complete.

    - Next, when the code encounters a setTimeout function, a similar process occurs.

    - The V8 engine identifies this as another asynchronous operation and once again notifies libuv.

    - Following this, when the code reaches a file operation (like reading orwriting a file), the process is similar. The V8 engine recognizes this as another asynchronous task and alerts libuv . libuv then registers the file operation and its callback (C) in the event loop.

    - Next, when the code executes let c = multiplyFn(a, b); , the JavaScript engine creates a new function context for multiplyFn and pushes it onto the call stack.

    - The JavaScript engine handles this operation as part of the synchronous code execution.

    - Once the multiplyFn completes its execution and returns the result, the function context is popped off the call stack, and the result is assigned to the variable c

  - Imp concept :
    - When the function execution context is popped off the call stack, the garbage collector may clear any memory allocated for that context in the memory heap, if it is no longer needed.

    - After console.log(c) is executed and the value of c is printed to the console,the global execution context will also eventually be removed from the call stack if the code execution is complete.

    - With the global context popped off the call stack, the JavaScript engine has finished processing, and the program ends.

    - Now the call stack becomes empty, the JavaScript engine can relax, as there is no more code to execute.

  - At this point, libuv takes over the major tasks. It handles operations such as processing timers, managing file system calls, and communicating with the operating system.
  - libuv performs these heavy tasks in the background, ensuring that asynchronous operations continue to be managed effectively. In summary, Node.js excels in handling asynchronous I/O operations, thanks to its non-blocking I/O model.

# Sync Async / Blocking Non Blocking Code

  - **fs.readFile("path", encoding, callback)**
    - Aysnc function which not Block the main thread and JS Engine's transfer it to Libuv to execute.
    - After reading the file libuv update the JS Engine and execute the callback.
  
  - **fs.readFileSync("path", encoding, callback)**
    - Sync function which Block the main thread until the file is completely read.
    - It is still transfer to Libuv by JS Engine's to execute because file system task can't be accessible by JS Engine V8.
    - They don't have callback function because it is blocking the main thread.
    - As a developer, it’s important to understand that while Node.js and the V8 engine give you the capability to block the main thread using synchronous methods, this is generally not recommended.
    - Example of sync function like fs.readFileSync(), crypto.pbkdf2Sync() etc.

  - **setTimeout(0)**
    - Trust Issues with setTimeout(0) : When you ask the code to run after 0 milliseconds, it doesn't necessarily run immediately after that time. It runs only when the call stack of the main thread is empty. This introduces some "terms and conditions," meaning that the actual execution timing is dependent on the state of the call stack.
    - This means that even if you specify a 0-millisecond delay, the callback will only execute after the global execution context is done.

  **Note** :- UTF-8 (Uniform Transformation Format 8-bit), is a character encoding standard that used for electronic communication. An encoding defines a mapping between bytes and text. Encoding is important as we consider the contents of a file to be in text format. As the utf-8 encoding is most common & covers nearly all characters of human languages, it is necessary to pass it as the options parameter to the fs.readFile().

# V8 JS Engine

  - When JavaScript code is executed, it goes through several stages in the V8 engine:-
    
    **Parsing Stage:-**

    1. **Lexical Analysis and Tokenization**
        - The main goal of lexical analysis is to break down the raw JavaScript code into manageable pieces called tokens. Each token represents a fundamental element of the language, such as keywords, operators, identifiers, and literals.
        Eg:- var a = 10; tokens = ['var', 'a', '=', '10', ';' ]

    2. **Syntax Analysis and Abstract Syntax Tree (AST)**
        - The tokens are converted into an Abstract Syntax Tree (AST). This process is crucial for transforming the flat list of tokens into a structured representation of the code. (https://astexplorer.net/)  to check the AST Tree.
        var a = 10;
        Variable Declaration
          |_ Identifier(a)
          |_ Literal (10)

        - **Syntax Errors** : When the V8 engine reads code, it processes tokens one by one. If an unexpected token is encountered that does not fit the grammar rules, a syntax error occurs. This is because the AST cannot be generated if the code does not adhere to the expected syntax, indicating that something is wrong with the structure of the code.
    
    **Interpreter & Compilation**
    1. **Interpreted Language:** These languages are executed line by line. The interpreter reads and executes the code directly, which can lead to slower execution times compared to compiled languages. eg:- Python.
        - Pros :- Faster to start executing code, easier to debug
        - Cons :- Slower execution compared to compiled languages because of the lineby-line interpretation
    
    2. **Compiled Languages:** These languages are first translated into machine code (binary code) through a process called compilation. The machine code is then executed by the computer’s hardware, leading to faster execution times. eg:- C, C++.
        - Pros :- Faster execution because the code is pre-compiled into machine code.
        - Cons :- Longer initial compilation time, more complex debugging process.

    3. **JavaScript is neither purely interpreted nor purely compiled. It utilizes a combination of both techniques**
        - **Initial Execution by INTERPRETER:** JavaScript uses an interpreter to execute code quickly and start running the script. This allows for rapid execution of scripts and immediate feedback.

        - **Just-In-Time (JIT) Compilation:** JavaScript engines like V8 use JIT compilation to improve performance. JIT compilation involves compiling code into machine code at runtime, just before execution. This process optimizes performance by compiling frequently executed code paths into optimized machine code.

        - **(JS CODE) -> (Initial Interpretation line by line) -> (Execution) -> (JIT Compilation ,optimization) -> (Machine Code Execution)**

    ![alt text](images/jsengine.png)

    4. **Optimization:** TurboFan converts the bytecode into optimized machine code, which improves performance for repeated executions.

    5. **Deoptimization:** If TurboFan’s assumptions are incorrect (e.g., a function that was optimized for numbers receives strings), the optimization may fail. In such cases, TurboFan will deoptimize the code and revert it to a less optimized state. The code is then sent back to Ignition for further interpretation and possible re-optimization.

    6. **Hot Code:** Refers to code that is executed frequently. TurboFan focuses on optimizing hot code to improve performance.

    7. **Ignition:** Converts the AST into bytecode. Bytecode is a lower-level, intermediate representation of the code that the JavaScript engine can execute more efficiently than raw source code. Ignition reads and executes the bytecode line by line.

    8. **TurboFan:** A compiler within the V8 engine that optimizes frequently executed (hot) code paths. When Ignition identifies a portion of the code that runs frequently (hot code), it sends this code to TurboFan for optimization.

  **Best Practice:**  For optimal performance, try to pass consistent types and values to functions. For example, if a function is optimized for numeric
  calculations, avoid passing strings to prevent deoptimization


# Libuv & Event Loop
  - The **Event loop** in libuv is the heart of how Node.js handles asynchronous operations. It allows Node.js to perform non-blocking I/O operations, even though
  JavaScript is single-threaded. Tasks that are offloaded to libuv include file system operations, DNS lookups, and network requests, among others.
  - The **Callback queue** is where callbacks are stored after an asynchronous operation is completed. The event loop processes this queue to execute the callbacks when the call stack is empty.
  - The **Thread pool**, on the other hand, is used for handling more time-consuming tasks that cannot be handled within the event loop without blocking it, such as file
  system operations or cryptographic functions.
    ![alt text](images/libuv.png)

  - Event loop continuosly checking call stack & callback queue, whenever call stack is empty then it takes task from the call back queue and pass it to call stack to execute.
    ![alt text](images/eventloop1.png)

  **The event loop in LIBUV operates in four major phases:**
    
    1. **Timers Phase:** In this phase, all callbacks that were set using setTimeout or setInterval are executed. These timers are checked, and if their time has expired, their corresponding callbacks are added to the callback queue for execution.

    2. **Poll Phase:** After timers, the event loop enters the Poll phase, which is crucial because it handles I/O callbacks. For instance, when you perform a file read operation using fs.readFile , the callback associated with this I/O operation will be executed in this phase. The Poll phase is responsible for handling all I/Orelated tasks, making it one of the most important phases in the event loop.

    3. **Check Phase:** Next is the Check phase, where callbacks scheduled by the setImmediate function are executed. This utility API allows you to execute callbacks immediately after the Poll phase, giving you more control over the order of operations.

    4. **Close Callbacks Phase:** Finally, in the Close Callbacks phase, any callbacks associated with closing operations, such as socket closures, are handled. This phase is typically used for cleanup tasks, ensuring that resources are properly released.

  **Event Loop Cycle with process.nextTick() and Promises [veryimportant]**
    Before the event loop moves to each of its main phases (Timers, I/O Callbacks, Poll, Check, and Close Callbacks), it first processes any pending microtasks. Microtasks include tasks scheduled using process.nextTick() and Promise callbacks. This ensures that these tasks are handled promptly before moving on to the next phase.
      ![alt text](images/eventloop2.png)

    ```javascript
      const fs = require("fs");
      setImmediate(() => {
        console.log("setImmediate");
      });

      setTimeout(() => {
        console.log("setTimeout");
      }, 0);

      Promise.resolve().then(() => {
        console.log("Promise 1");
      });

      fs.readFile("./file.txt", "utf-8", () => {
        setTimeout(() => {
          console.log("setTimeout inside readFile");
        },0);

        process.nextTick(() => {
          console.log("process.nextTick inside readFile");
        });

        setImmediate(() => {
          console.log("setImmediate inside readFile");
        });
        console.log("File reading completed");
      });

      process.nextTick(() => {
        console.log("process.nextTick");
      });

      console.log("Last line of the script");

      /**
      * Output:
      * Last line of the script
      * process.nextTick
      * Promise 1
      * setTimeout
      * setImmediate
      * File reading completed
      * process.nextTick inside readFile
      * setImmediate inside readFile
      * setTimeout inside readFile
      */
    ```

  **Note:** When the event loop is empty and there are no more tasks to execute, it enters the poll phase and essentially waits for incoming events

## Thread Pool In Libuv
  - Whenever there's an asynchronous task, V8 offloads it to libuv. For example, when reading a file, libuv uses one of the threads in its thread pool. The file system (fs) call is assigned to a thread in the pool, and that thread makes a request to the OS. While the file is being read, the thread in the pool is fully occupied and cannot perform any other tasks. Once the file reading is complete, the engaged thread is freed up and becomes available for other operations. For instance, if you're performing a cryptographic operation like hashing, it will be assigned to another thread. There are certain functions for which libuv uses the thread pool.

  - In Node.js, the default size of the thread pool is 4 threads: **UV_THREADPOOL_SIZE=4**
  - Now, suppose you make 5 simultaneous file reading calls. What happens is that 4 file calls will occupy 4 threads, and the 5th one will wait until one of the threads is free.

  **If you're dealing with synchronous code, Node.js is single-threaded. But if you're dealing with asynchronous tasks, it utilizes libuv's thread pool, making it multithreaded.**

  - To change the size of the Thread Pool :- **process.env.UV_THREADPOOL_SIZE = 8;**

  - For API Request, **Thread Pool Not Being Used**

    ![alt text](images/api-request-handle-by-libuv.png)

  - In the libuv library, when it interacts with the OS for networking tasks, it uses sockets. Networking operations occur through these sockets. Each socket has a socket descriptor, also known as a file descriptor (although this has nothing to do with the file system)

  - When an incoming request arrives on a socket, and you want to write data to this connection, it involves blocking operations. To handle this, a thread is created for each request. However, creating a separate thread for each connection is not practical, especially when dealing with thousands of requests. Instead, the system uses efficient mechanisms provided by the OS, such as epoll (on Linux) or kqueue (on macOS). These mechanisms handle multiple file descriptors (sockets) without needing a thread per connection.

  **Here’s how it works:**
    1. epoll (Linux) and kqueue (macOS) are notification mechanisms used to manage many connections efficiently.
    2. When you create an epoll or kqueue descriptor, it monitors multiple file descriptors (sockets) for activity.
    3. The OS kernel manages these mechanisms and notifies libuv of any changes or activity on the sockets.
    4. This approach allows the server to handle a large number of connections efficiently without creating a thread for each one.

  - The kernel-level mechanisms, like epoll and kqueue , provide a scalable way to manage multiple connections, significantly improving performance and resource utilization in a high-concurrency environment.

  - **File Descriptors (FDs)** are integral to Unix-like operating systems, including Linux and macOS. They are used by the operating system to manage open files, sockets, and other I/O resources.

  - **Socket descriptors** are a special type of file descriptor used to manage network connections. They are essential for network programming, allowing processes to communicate over a network.

  - **Event Emitters** are a core concept in Node.js, used to handle asynchronous events. They allow objects to emit named events that can be listened to by other parts of the application. The EventEmitter class is provided by the Node.js events module.

  ```javascript
    const EventEmitter = require('node:events');
    const eventEmitter = new EventEmitter();
    eventEmitter.on('start', () => {
      console.log('started');
    });
    eventEmitter.emit('start');
  ``` 

  - **Streams** in Node.js are objects that facilitate reading from or writing to a data source in a continuous fashion. Streams are particularly useful for handling large amounts of data efficiently.

  - **Buffers** are used to handle binary data in Node.js. They provide a way to work with raw memory allocations and are useful for operations involving binary data, such as reading files or network communications.

  - **Pipes** in Node.js are a powerful feature for managing the flow of data between streams. They simplify the process of reading from a readable stream and writing to a writable stream, facilitating efficient and seamless data processing. Piping in NodeJS is the process by which byte data from one stream is sent to another stream.

    ![alt text](images/nodejs-lesson-1.png)

# Web And Server

  - The term "server" can refer to both hardware and software, depending on the context.
    - **Hardware:** A physical machine (computer) that provides resources and services to other computers (clients) over a network.
    - **Software:** An application or program that handles requests and delivers data to clients.
  
  - **Deploying an Application on a Server:** When someone says "deploy your app on a server," they usually mean:
    1. Hardware Aspect: You need a physical machine (server) to run your application. This machine has a CPU, RAM, storage, etc.
    2. Operating System (OS): The server hardware runs an operating system like Linux or Windows. Your application runs on this OS.
    3. Server Software: The software (e.g., a web server like Apache or an application server built with Node.js) that handles requests from users.

  - **Software Servers in Node.js:** When you create an HTTP server in Node.js, you’re building an application that listens for requests from clients and responds to them. This is an example of a software server.

      ![alt text](images/client-server-arch.png)
      ![alt text](images/client-server-arch2.png)
      ![alt text](images/client-server-arch3.png)

  - **Creating multiple HTTP server**, it means we are setting up two differentNode.js applications. The distinction between these servers is defined by a port, which is a 4-digit number (e.g., port 3000, 3001).

  - In many companies, the frontend and backend may also be hosted on different servers. This separation allows each part of the system to be optimized for its specific role, ensuring better performance and making the system more scalable and resilient. This distributed approach helps large companies manage massive amounts of data and traffic efficiently, ensuring that users have a smooth and responsive experience.

      ![alt text](images/client-server-arch4.png)

  - **Sockets Vs Web Sockets**
    - When a user makes a request to a website, a socket connection is established between the client and the server. This connection is typically used for a single request-response cycle: the client sends a request, the server processes it, sends back the response, and then the socket is closed. This process involves opening a new connection for each request.

    - On the other hand, WebSockets introduce a more efficient method by allowing the connection to remain open. This means that after the initial connection is established, it stays active, allowing for continuous communication between the client and server. Both the client and server can send and receive data at any time without the need to re-establish the connection. This persistent connection is ideal for real-time applications, where continuous interaction is required, such as in chat applications, online gaming, or live updates.

  - **Creating a Server**

    ```javascript
      const http = require("http");
      const server = http.createServer((req, res) => {
        if(req.url === "/getSecretData") {
          res.end("Secret Data!!!");
        } else {
          res.end("Hello World!!!");
        }
      });
      server.listen(7777);

      // localhost:7777 => Hello World!!!
      // localhost:7777/getSecretData => Secret Data!!!
    ```

  **Note:** We use Express to create a server. Express is a framework built on top of Node.js that makes our lives easier

# Database - SQL or NoSQL

  - **Database:** Organized collection of data or a type of data store based on the use of a DBMS, ths software that interacts with the end users, applications, and analyze the data.
  - **Types of databases:** 
    1. **Relational DB - MySQL, PostgreSQL:** Relational databases like MySQL and PostgreSQL use structured tables with predefined schemas, making them ideal for handling complex queries and transactions. They ensure data integrity through ACID properties and are widely used for applications requiring robust, relational data models.

    2. **NoSQL DB - MongoDB:** MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, allowing for dynamic schemas. It's highly scalable and ideal for handling large volumes of unstructured or semi-structured data, making it popular for modern web applications.

    3. **In-memory DB - Redis:** Redis is an in-memory database known for its high-speed data processing capabilities. It supports various data structures like strings, hashes, and lists, making it suitable for caching, real-time analytics, and message brokering.

    4. **Distributed SQL DB - CockroachDB**
    5. **Time Series DB - InfluxDB**
    6. **OO DB - db4o**
    7. **Graph DB - Neo4j**
    8. **Hierarchical DB - IBM IMS**
    9. **Network DB - IDMS**
    10. **Cloud DB - Amazon RDS**

  - Most commonly used databases are :
    1. Relational DB
    2. NoSQL DB

  - NoSQL databases can be classified into four main types:
    1. Document Databases **(MongoDB use this NoSQL database)**
    2. Key-Value Databases
    3. Graph Databases
    4. Wide-Column Databases
    5. Multi-Model Databases

  ![alt text](images/rdbmsvsmongodb.png)
  ![alt text](images/rdbmsvsmongodb2.png)

  - **Table Structure:** RDBMS organizes data into tables with rows and columns. In contrast, NoSQL document databases use collections of documents, where each document can have a flexible and nested structure.
  - **Data Organization:** RDBMS has a structured format, while NoSQL offers a flexible schema, allowing documents to vary in structure.
  - **Schema:** RDBMS requires a fixed schema, meaning the structure must be predefined and is not easily changeable. NoSQL databases have a schemaless design, allowing for easy changes and adaptability.
  - **Query Language:** RDBMS uses SQL for querying, which is a standardized language for relational databases. NoSQL databases have their own query mechanisms, which can vary depending on the
  database system.
  - **Scaling:** RDBMS generally faces challenges with horizontal scaling (scaling out across multiple servers). NoSQL databases are designed for easier horizontal scaling, making them more suitable for distributed environments.
  - **Relationships:** RDBMS uses foreign keys and joins to manage relationships between tables. NoSQL document databases handle relationships by embedding related data within documents or using references.
  - **Use Case:** RDBMS is often used in scenarios requiring complex transactions and strong consistency, such as banking systems. NoSQL databases are preferred for applications needing flexible data models and high-performance, such as content management systems and real-time data processing.
  - **Examples:** RDBMS examples include banking applications that need ACID compliance and complex transactions. NoSQL examples include systems like content management and real-time analytics platforms, where flexibility and scalability are key

# MongoDB 
  
  1. **Create a New User and Password**
    - Go to mongodb.com and create a new M0 cluster
    - Get the connection string and replace the password with the one you created.

  2. **Install MongoDB Compass and Connect**
      - Create a new database and collection.
      - Create a new document with some fields.

  3. **Set Up MongoDB Using Code**
      - Install the MongoDB npm package: `npm install mongodb` 
        - [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/6.8/)

  4. **Create and Run the Database Script**
      - Create a new file `database.js`.
      - Add the necessary code to the file.
      - Run the file using `node database.js`.
      - Check the output in the console.
      - Verify the database and collection in MongoDB Compass.

  5. **Check CRUD Operations**
      - Refer to the documentation for CRUD operations queries.
      - Go to the collection option in the documentation and check the query for many operations.

  6. **Set Up .gitignore**
      - Create a `.gitignore` file and add `node_modules/` to it.

  7. **Use Mongoose ORM in Production**
      - In production, use Mongoose ORM for MongoDB, which is a wrapper around the MongoDB npm package and provides a schema-based solution for MongoDB operations.
        - [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)