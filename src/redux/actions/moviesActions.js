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

const getMovies = () => {
  return async (dispatch) => {
    const movies = await Movies.findAll();
    dispatch({
      type: types.movieList,
      payload: movies,
    });
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
const searchMovies = (name) => {
  return (dispatch) => {
    // search(name).then((data) => {
    //   dispatch({
    //     type: types.moviesSearch,
    //     payload: {
    //       results: data
    //     }
    //   });
    // });
  };
};

const getMovieById = (id) => {
  return async (dispatch) => {
    const movie = await Movies.findById(id);
    dispatch(selectMovie({ ...movie, isUpdate: false }));
  };
};
const getTopMovies = () => {
  return async (dispatch) => {
    const movies = await Movies.findMoviesByRate("rate", ">", 5);
    dispatch({
      type: types.moviesTop,
      payload: movies,
    });
  };
};

const getLeastMovies = () => {
  return async (dispatch) => {
    const movies = await Movies.findMoviesByRate("rate", "<=", 5);
    dispatch({
      type: types.moviesLeast,
      payload: movies,
    });
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
