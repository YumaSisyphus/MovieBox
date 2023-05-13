import { Switch, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";
import { theme } from "./utils/Theme";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import Dashboard from "./components/templates/dashboard/Dashboard";
import AddEdit from "./components/templates/Edit/AddEdit"
import Movielist from "./components/templates/MovieList/Movielist";
import MoviePage from "./components/templates/MoviePage/MoviePage";
import ProfileContainer from "./components/templates/Profile/ProfileContainer";
import Register from "./components/templates/Register/Register";
import Login from "./components/templates/Login/Login";

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
        {/* <ThemeProvider theme={theme}> */}
        <Routes>
          <Route exact path="/" Component={WelcomeScreen} />
          <Route path="/addEdit" Component={AddEdit} />
          <Route path="/update/:id" Component={AddEdit} />
          <Route path="/MovieList" Component={Movielist} />
          <Route path="/MoviePage" Component={MoviePage} />
          <Route path="/Profile" Component={ProfileContainer} />
          <Route path="/Register" Component={Register} />
          <Route path="/Login" Component={Login} />
          <Route path="/Dashboard" Component={Dashboard} />
        </Routes>

        {/* </ThemeProvider> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
