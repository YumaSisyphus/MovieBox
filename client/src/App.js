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
import HomePage from "./components/templates/HomePage/HomePage";
import PrivateRoutes from "./utils/PrivateRoutes";
import EditProfile from "./components/templates/EditProfile/EditProfile";
import MovieListHome from "./components/templates/MovieList/MovieListHome";
import MovieList from "./components/templates/MovieList/MovieList";
import Movies from "./components/templates/Movies/Movies";
import CinemaPage from "./components/templates/CinemaPage/CinemaPage";
import Cinemas from "./components/templates/Cinemas/Cinemas";
import MoviesWatched from "./components/templates/MoviesWatched/MoviesWatched";
import Watchlist from "./components/templates/Watchlist/Watchlist";
import Favorite from "./components/templates/Favorite/Favorite";
import Lists from "./components/templates/Lists/Lists";
import AddPage from "./components/templates/AddPage/AddPage";
import Seats from "./components/templates/Seats/Seats";
import Dashboard from "./components/templates/dashboard/Dashboard";
import Edit from "./components/templates/Edit/Edit";
import UserLists from "./components/templates/UserLists/UserLists";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={"/welcome"} Component={WelcomeScreen} />
            <Route path="/login" Component={Login}></Route>
            <Route path="/register" Component={Register} />
            <Route path="/terms" Component={TermsOfUse} />
            <Route element={<PrivateRoutes />}>
              <Route path="/profile" Component={ProfileContainer} />
              <Route path="/cinemas" Component={Cinemas} />
              <Route path="/cinema" Component={CinemaPage} />
              <Route path="/usermovie" Component={MoviesWatched} />
              <Route path="/watchlist" Component={Watchlist} />
              <Route path="/favorite" Component={Favorite} />
              <Route path="/films" Component={MovieListHome} />
              <Route path="/filmslist" Component={MovieList} />
              <Route path="/lists" Component={Lists} />
              <Route path="/actorPage" Component={ActorPage} />
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="/edit" Component={Edit} />
              <Route path="/addpage" Component={AddPage} />
              <Route path="/movies" Component={Movies} />
              <Route path="/moviePage" Component={MoviePage} />
              <Route path="/" Component={HomePage} />
              <Route path="/editProfile" Component={EditProfile} />
              <Route path="/Seats" Component={Seats} />
              <Route path="/userlists" Component={UserLists}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
