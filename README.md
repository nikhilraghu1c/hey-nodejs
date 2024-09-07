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