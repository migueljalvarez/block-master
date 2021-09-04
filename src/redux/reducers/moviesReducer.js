import constants from "../../helpers/constants";
import { types } from "../types/types";

const initialState = {
  name: "movie",
  imageUrl: constants.DEFAULT_MOVIE_POSTER,
  rate: 0,
  gender: ["example1", "example2"]
};
const stateList = [initialState];
const moviesReducer = (state = stateList, action) => {
  switch (action.type) {
    case types.movieList:
    case types.moviesTop:
    case types.moviesLeast:
      return action.payload;
    default:
      return state;
  }
};

const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case types.movie:
      return action.payload;
    case types.movieEdit:
      return action.payload;
    default:
      return state;
  }
};
export { moviesReducer, movieReducer };
