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
import { PrivateRouter } from "./PrivateRouter";
import FormLoadBanner from "../components/FormLoadBanner";
import FormMovie from "../views/FormMovie";
import TopRatedMovies from "../views/TopRatedMovies";
import LeastRatedMovies from "../views/LeastRatedMovies";
import Carousel from "../components/Carousel";

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
        <Carousel />
        <Switch>
          <PublicRouter exact path="/login" component={Login} />
          <PublicRouter exact path="/signup" component={SignUp} />
          <PrivateRouter exact path="/banner/load" component={FormLoadBanner} />
          <PrivateRouter exact path="/movie/add" component={FormMovie} />
          <PrivateRouter exact path="/movie/edit/:id" component={FormMovie} />

          <Route exact path="/movie/top" component={TopRatedMovies} />
          <Route exact path="/movie/least" component={LeastRatedMovies} />
          <Route exact path="/" component={AllMovies} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default Routers;
