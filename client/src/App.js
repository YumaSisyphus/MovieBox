import { ThemeProvider } from "@mui/material";
import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";

import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import Login from "./components/templates/login/LoginScreen";
import Register from "./components/templates/register/RegisterScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./utils/Themes";


function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/WelcomeScreen" element={<WelcomeScreen />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
