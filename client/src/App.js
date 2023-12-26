import Login from "./components/Login.js";
import Register from "./components/Register.jsx";
import Navbar from "./components/Navbar.js";
import Dashboard from "./components/Dashboard.js";
import {BrowserRouter, Route,Routes } from "react-router-dom";
// import Switch from "react-dom";

function App() {
  return (


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <>
           
            <Navbar />
            <Dashboard /> 
          </>
        } />

      </Routes>
    </BrowserRouter>
  );
}

// <Route path="/navbar" element={<Navbar />} />

export default App;
