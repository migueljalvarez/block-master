import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRouter = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      component={(props) =>
        user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRouter.propTypes = {
  component: PropTypes.func.isRequired,
};
