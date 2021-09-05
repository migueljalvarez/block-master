import { types } from "../types/types";
import Movies from "../../services/movies";
import Swal from "sweetalert2";
import { startLoading, finishLoading } from "./uiErrors";

const selectMovie = (movie) => {
  return (dispatch) => {
    dispatch({
      type: types.movie,
      payload: movie,
    });
  };
};

const getMovies = (opt) => {
  return (dispatch) => {
    switch (opt.action) {
      case "next":
        return Movies.next(dispatch, types);
      case "previous":
        return Movies.previous(dispatch, types);
      default:
        return Movies.findAll(dispatch, types);
    }
  };
};

const createMovies = (data) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const movie = await Movies.create(data);

      dispatch({
        type: types.movieCreate,
        payload: movie,
      });
      dispatch(finishLoading());
      Swal.fire({
        position: "center",
        text: "Carga Exitosa",
        icon: "success",
        title: movie.name,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha Ocurrido un Error",
        text: error.message,
        footer: "",
      });
    }
  };
};

const updateMovies = (id, data) => {
  return async (dispatch) => {
    dispatch(startLoading());
    await Movies.update(id, data)
      .then((movie) => {
        dispatch(selectMovie({ ...movie, isUpdate: true }));

        dispatch(finishLoading());
        Swal.fire({
          position: "center",
          text: "Carga Exitosa",
          icon: "success",
          title: movie.name,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ha Ocurrido un Error",
          text: error.message,
          footer: "",
        });
      });
  };
};
const searchMovies = (search) => {
  return (dispatch) => {
    Movies.search(search, dispatch, types);
  };
};

const getMovieById = (id) => {
  return async (dispatch) => {
    const movie = await Movies.findById(id);
    dispatch(selectMovie({ ...movie, isUpdate: false }));
  };
};
const getTopMovies = (opt) => {
  return (dispatch) => {
    switch (opt?.action) {
      case "nextPage":
        return Movies.findByRate(dispatch, types, { action: "nextPage" });
      case "prevPage":
        return Movies.findByRate(dispatch, types, { action: "prevPage" });
      default:
        return Movies.findByRate(dispatch, types, { action: "top" });
    }
  };
};

const getLeastMovies = (opt) => {
  return (dispatch) => {
    switch (opt?.action) {
      case "next":
        return Movies.next(dispatch, types, opt);
      case "previous":
        return Movies.previous(dispatch, types, opt);
      default:
        return Movies.findByRate(dispatch, types, { action: "least" });
    }
  };
};

export {
  createMovies,
  getLeastMovies,
  getMovieById,
  getMovies,
  getTopMovies,
  searchMovies,
  selectMovie,
  updateMovies,
};
