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

  - **DaisyUI:** component library for Tailwind CSS
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

- Create a New file for different section like navbar.
- Install **react-router-dom** for defining the routes.

  ```javascript
  import { BrowserRouter, Routes, Route } from "react-router-dom";

  function App() {
    return (
      <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<h1>Base Page</h1>} />
            <Route path="/login" element={<h1>Login Page</h1>} />
            <Route path="/test" element={<h1>Test Page</h1>} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App;
  ```

- Now to systemically define the routes, First need to create a body component **Body.jsx** which is parent routes.
- Body component will be open on default route **"/"** & also define **</Outlet** inside it so children component will also open inside it.

  ```javascript
  import { Outlet } from "react-router-dom";
  import NavBar from "./NavBar";
  import Footer from "./Footer";

  const Body = () => {
    return (
      <div>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  export default Body;
  ```

- Now define the routes in the **App.jsx** component which also includes the child routes

  ```javascript
  function App() {
    return (
      <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App;
  ```

# Start Building The UI Components with API

### Login Page Implementation

- Create a login page html using DaisyUI
- Also Add react useState hook and click event using js.
- For hitting API Call we will gonna use **axios** external library (**npm i axios**).
- Now when you hit the backend api then **CORS** will occur because your backend and UI port is different. (**localhost === 127.0.0.1**)
- To solve the cors error, need to install external library **cors (npm install cors)** in the backend (nodejs) & add middleware in the app.js
  ```javascript
  // in the backend file app.js
  app.use(cors());
  ```
- Now API will work but For http or localhost, cookies will not set. Cookies only set when origin and the server is https. So to set the cookies need to whitelist the URL in the backend.

  ```javascript
  app.use(
    cors({
      origin: "http://localhost:5173", // origin is the URL of the frontend application that you want to allow to access your API
      credentials: true, // credentials is set to true to allow the frontend to send cookies
    })
  );
  ```

- And IN UI , need to send the withCredentials to be true as options when hitting the api.
  ```javascript
  axios.post(
    "http://localhost:7777/login",
    {
      emailId,
      password,
    },
    { withCredentials: true }
  );
  ```

### React Redux

- Redux is an open-source JavaScript library for managing and centralizing application state.
- https://redux-toolkit.js.org/tutorials/quick-start
- **npm install @reduxjs/toolkit react-redux**
- Create a file named **src/utils/appStore.js**. Import the configureStore API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it. This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing. we can install **redux-devtools** extension in chrome to see store values.

  ```javascript
  import { configureStore } from "@reduxjs/toolkit";

  const appStore = configureStore({
    reducer: {},
  });

  export default appStore;
  ```

- Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> around our application in src/App.jsx. Import the Redux store we just created, put a <Provider> around your <BrowserRouter>, and pass the store as a prop:

  ```javascript
  import { Provider } from "react-redux";
  import appStore from "./utils/appStore";

  function App() {
    return (
      <>
        <Provider store={appStore}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
  ```

- Add a new file named src/utils/userSlice.js. In that file, import the createSlice API from Redux Toolkit.
- Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.
- Redux requires that we write all state updates immutably, by making copies of data and updating the copies. However, Redux Toolkit's createSlice and createReducer APIs use Immer inside to allow us to write "mutating" update logic that becomes correct immutable updates.

  ```javascript
  import { createSlice } from "@reduxjs/toolkit";

  const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
      addUser: (state, action) => {
        return action.payload;
      },
      removeUser: (state, action) => {
        return null;
      },
    },
  });

  export const { addUser, removeUser } = userSlice.actions;
  export default userSlice.reducer;
  ```

- Next, we need to import the reducer function from the user slice and add it to our store (**/appStore.js**). By defining a field inside the reducer parameter, we tell the store to use this slice reducer function to handle all updates to that state.

  ```javascript
  import { configureStore } from "@reduxjs/toolkit";
  import userReducer from "./userSlice";

  const appStore = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  export default appStore;
  ```

- Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data when we get the successfull response from login api and dispatch actions using useDispatch and set the data in the store.

  ```javascript
    // Login.jsx component
    import { useDispatch } from "react-redux";
    import { addUser } from "./utils/userSlice";

    const Login = () => {
      const dispatch = useDispatch();

      const handleLogin = async () => {
        try {
          const res = await axios.post(...);
          dispatch(addUser(res.data));
        } catch (error) {
          console.error(error);
        }
      };
    };
  ```

- Now after setting up the Redux store (set the user data), we can access the user data from the store using the useSelector hook in any component.
- **useSelector** is a hook from react-redux that allows you to extract data from the Redux store state, using a selector function.
- In this navbar, we are using useSelector to get the user data from the store and display it in the navbar like user firstName & user photo.
  ```javascript
    // ./NavBar.jsx
    import { useSelector } from "react-redux";
    const NavBar = () => {
      const user = useSelector((store) => store.user);
      return (
        ...
          {user && (
            <div className="flex-none gap-2">
              <div className="form-control">Welcome, {user.firstName}</div>
                ...
              </div>
          )}
        ...
      );
    };
    export default NavBar;
  ```

### Phase 2 Of UI Implementation

- useNavigate is a hook from react-router-dom that returns a navigate function that can be used to navigate to different routes.

  ```javascript
    import { useNavigate } from "react-router-dom";
    ...
    const navigate = useNavigate();
    ...
    navigate("/login");
  ```

- The fetchUser function in **Body.jsx** is used to fetch the user data from the backend and store it in the Redux store and also redirect to the login page if the user is not authenticated. if user data is already present in the store then return from here and don't fetch it again.

- **Implement Logout Feature:**

  1. Call the logout api from the navbar logout button click
  2. Clear the user data from the store by using **dispatch(removeUser())**.
  3. navigate to the login page using useNavigate().

- **Strict Mode:**
  1. React Strict Mode is a development tool that helps identify potential bugs and issues in a React application's code. It does this by running additional checks and warnings during rendering.
  2. Here are some things that React Strict Mode can help with: Identifying components with unsafe lifecycles, Detecting unexpected side effects, Warning about legacy string ref API usage, Warning about deprecated findDOMNode usage, and Ensuring reusable state.
  3. To enable Strict Mode in a React application, you can wrap your entire application or specific components in the <React.StrictMode> component.
  4. Strict Mode checks are only run in development mode and do not impact the production build. It does not render any visible UI.

  ```javascript
    // main.jsx
    createRoot(document.getElementById('root')).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  ```

- **Implement User Card Template:** Create one **UserCard.jsx** file and by using daisyui build the template for the user card and use that user card in the feed page.

- **Implement Edit LoggedInUser Profile:-**
  1. Create new file **EditProfile.jsx** and add it in the **Profile.jsx** then it will show when user click on profile.
  2. From **Profile.jsx**, get user data from store and show current user values in the fields.
  3. Now implement the **/profile/edit** api to update the user profile with new values and also update the user store value.
  4. Also add **User Card Template** to show how it looks in another user feed page.
  5. Also show the notification when profile updated successfully.

- **Implement Connections Page:** Create one **Connections.jsx** file to show all the connections and implement **/user/connections** api to get the connections list.

- **Implement Connection Requests Page:** Create one **Requests.jsx** file to show all the connection requests and implement **/user/requests/received** api to get the requests list. Also add 2 buttons **Accept & Reject** to accept and reject the connection requests. Also implement the api **request/review/:status/:requestId** on click of the **accept** & **reject** button and remove that request from the page.

- **Implement API for Feed Page for Ignored or Interested (/request/send/:status/:userId) & After api response remove that user from feed store**