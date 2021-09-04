import { types } from "../types/types";

const initialState = {
  name: "",
  imageUrl:
    "https://www.laranayeltrebol.com/wp-content/uploads/2017/02/AlimentacionSaludable101-1200x310.jpg",
  movieId: "",
};
const stateList = [initialState];
const bannersReducer = (state = stateList, action) => {
  switch (action.type) {
    case types.bannerList:
      return action.payload.length > 0 ? action.payload : state;
    default:
      return state;
  }
};

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.bannerCreate:
      return action.payload;
    default:
      return state;
  }
};
export { bannersReducer, bannerReducer };
