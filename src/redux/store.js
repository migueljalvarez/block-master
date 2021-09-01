import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { authReducer } from "./reducers/authReducer";
import thunk from "redux-thunk";
import { bannerReducer } from "./reducers/bannerReducer";
import { movieReducer, moviesReducer } from "./reducers/moviesReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  banner: bannerReducer,
  movies: moviesReducer,
  movie: movieReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
