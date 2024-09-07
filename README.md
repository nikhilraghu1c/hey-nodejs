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

# GLobal Object

- In browser (this, self, frames ) referes to window (global object)
- In NodeJS - Global object is (global) and (this) refers to blank object
- globalThis - New Global object, Standard conviction for all browser and JS Run time Environment
- In NodeJS - globalThis === global (which is true). 
