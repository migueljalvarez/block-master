import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import { authReducer } from "./reducers/authReducer";
import thunk from "redux-thunk";
import { bannerReducer, bannersReducer } from "./reducers/bannerReducer";
import { movieReducer, moviesReducer } from "./reducers/moviesReducer";
import { uiReducer } from "./reducers/uiReducer";
import { searchReducer } from "./reducers/searchReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  banners: bannersReducer,
  banner: bannerReducer,
  movies: moviesReducer,
  movie: movieReducer,
  ui: uiReducer,
  search: searchReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
