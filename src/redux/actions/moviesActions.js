import { types } from "../types/types";
import Movies from "../../services/movies";

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
const getMovieById = (id)=> {
  return async (dispatch) => {
    const movie = await Movies.findById(id)
    dispatch(selectMovie(movie))
  };
}
export { getMovies, searchMovies, selectMovie , getMovieById};
