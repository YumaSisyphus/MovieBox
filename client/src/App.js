import { Switch, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";
import { theme } from "./utils/theme";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import Dashboard from "./components/templates/dashboard/Dashboard";
import AddEdit from "./components/templates/Edit/AddEdit"

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
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Routes>
            <Route exact path="/" Component={Dashboard} />
            <Route path="/addEdit" Component={AddEdit} />
            <Route path="/update/:id" Component={AddEdit} />
          </Routes>

        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
