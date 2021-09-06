import { types } from "../types/types";

const initialState = {
  isSearch: false,
  searchTerm: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.searchTitle:
      return {
        isSearch: action.payload.isSearch,
        searchTerm: action.payload.searchTerm,
      };
    default:
      return state;
  }
};

export { searchReducer };
