# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts:

  1. A dev server that provides rich feature enhancements over native ES modules, for example extremely fast Hot Module Replacement (HMR).

  2. A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

# Initialize the Dev Tinder UI Projects

- Using Vite + React
- **npm create vite@latest devTinder-web -- --template react**
- To start the app :-

  - npm install
  - npm run dev (dev: vite in package.json)
  - remove all the unwanted code

- Install Tailwind CSS

  - **Tailwindcss:** A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

  - Configure tailwindcss using below docs url
    **https://tailwindcss.com/docs/guides/vite**
    1. npm install -D tailwindcss postcss autoprefixer
    2. npx tailwindcss init -p
    3. Update tailwindconfig.js
       ```javascript
       /** @type {import('tailwindcss').Config} */
       export default {
         content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
         theme: {
           extend: {},
         },
         plugins: [],
       };
       ```
    4. Add tailwind css in the index.css
       ```css
       @tailwind base;
       @tailwind components;
       @tailwind utilities;
       ```
    5. Now run and try some css classes of tailwind in app.jsx
       ```javascript
       export default function App() {
         return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
       }
       ```

- Install Daisy UI

  - **DaisyUi:** component library for Tailwind CSS
  - Provide many component which is compatible with tailwindcss

  - Configure Daisy UI with projects
    **https://daisyui.com/docs/install**

    1. npm install -D daisyui
    2. Add daisyUI to tailwind.config.js:
       ```javascript
       module.exports = {
         //...
         plugins: [require("daisyui")],
       };
       ```
