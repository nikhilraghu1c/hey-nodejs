import NavBar from "./NavBar";
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
      <NavBar />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
