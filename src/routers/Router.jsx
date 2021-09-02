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

// components
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

// views
import Login from "../views/Login";
import AllMovies from "../views/AllMovies";
import SignUp from "../views/SignUp";

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
          <PublicRouter exact path="/signup" component={SignUp} />
          <Route exact path="/" component={AllMovies} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default Routers;
