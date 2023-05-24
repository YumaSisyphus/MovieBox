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
import HomePage from "./components/templates/HomePage/HomePage";
import PrivateRoutes from "./utils/PrivateRoutes";
import EditProfile from "./components/templates/EditProfile/EditProfile";
import Cookies from "universal-cookie";

function App() {
  const cookies = new Cookies();
  const token = cookies.get('token');


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} Component={token ? HomePage : WelcomeScreen} />
            <Route path="/login" Component={Login} >
            </Route>
            <Route path="/register" Component={Register} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" Component={ProfileContainer} />
              <Route path="/actorPage" Component={ActorPage} />
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="/edit" Component={AddEdit} />
              <Route path="/update/:id" Component={AddEdit} />
              <Route path="/moviePage" Component={MoviePage} />
              <Route path="/home" Component={HomePage} />
              <Route path="/editProfile" Component={EditProfile} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
