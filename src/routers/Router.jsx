import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { PublicRouter } from "./PublicRouter";
import { firebase } from "../config/firebase/firebaseConfig";
import { login } from "../redux/actions/authActions";

import Login from "../views/Login";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AllMovies from "../views/AllMovies";
// import Pokemons from "../pages/Pokemons";

const Routers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <PublicRouter exact path="/login" component={Login} />
          <Route exact path="/" component={AllMovies} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default Routers;
