import { types } from "../types/types";
import {
  firebase,
  google,
  facebook,
} from "../../config/firebase/firebaseConfig";

import Swal from "sweetalert2";
import { startLoading, finishLoading } from "./uiErrors";

const login = (user) => {
  return {
    type: types.login,
    payload: {
      id: user.uid,
      name: user.displayName,
      imageUrl: user.photoURL,
      isAuthenticated: true,
    },
  };
};

const logout = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: types.logout,
          payload: {},
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const loginGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(google)
      .then(({ user }) => {
        dispatch(login(user));
      });
  };
};

const loginFacebook = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(facebook)
      .then(({ user }) => {
        dispatch(login(user));
      });
  };
};

const loginEmailPassword = (email, password) => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(startLoading());
        dispatch(login(user));
        dispatch(finishLoading());
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
          footer: "",
        });
      });
  };
};

const registerEmailPasswordName = (email, pass, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        user.updateProfile()
        dispatch(login(user));

        Swal.fire({
          position: "center",
          text: "Registro Exitoso",
          icon: "success",
          title: user.displayName,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
          footer: "",
        });
      });
  };
};

export {
  login,
  loginEmailPassword,
  loginFacebook,
  loginGoogle,
  logout,
  registerEmailPasswordName,
};
