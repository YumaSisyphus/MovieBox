import { ThemeProvider } from "@mui/material";
import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";
import "./App.css";
import React from "react";
import Login from "./components/templates/login/LoginScreen";
import Register from "./components/templates/register/RegisterScreen";
import ProfileContainer from "./components/templates/Profile/ProfileContainer";
import TermsOfUse from "./components/legal/TermsOfUse";
import ActorPage from "./components/templates/actorPage/ActorPage";
import MoviePage from "./components/templates/moviePage/movie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./utils/Themes";
import Dashboard from "./components/dashboard/Dashboard";
import AddEdit from "./components/Edit/AddEdit";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={WelcomeScreen} />
            <Route path="/Login" Component={Login} />
            <Route path="/Register" Component={Register} />
            <Route path="/Profile" Component={ProfileContainer} />
            <Route path="/Terms" Component={TermsOfUse} />
            <Route path="/ActorPage" Component={ActorPage} />
            <Route path="/Dashboard" Component={Dashboard} />
            <Route path="/Edit" Component={AddEdit} />
            <Route path="/update/:id" Component={AddEdit} />
            <Route path="/MoviePage" Component={MoviePage} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
