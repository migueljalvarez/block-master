import { types } from "../types/types";

const initialState = {
  name: "movie",
  posterUrl:
    "https://marketplace.canva.com/EAEXISLskrQ/2/0/1131w/canva-modern-monochromatic-movie-poster-891_5y8EPF0.jpg",
  rate: 0,
};
const stateList = [initialState];
const moviesReducer = (state = stateList, action) => {
  switch (action.type) {
    case types.movieList:
      return action.payload;
    default:
      return state;
  }
};

const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case types.movie:
      return action.payload;
    default:
      return state;
  }
};
export { moviesReducer, movieReducer };
