import { types } from "../types/types";

const initialState = {
  isSearch: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.searchTitle:
      return {
        isSearch: action.payload.isSearch,
      };
    default:
      return state;
  }
};

export { searchReducer };
