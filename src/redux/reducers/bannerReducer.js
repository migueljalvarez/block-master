import { types } from "../types/types";

const initialState = [
  {
    name: "",
    coverUrl:
      "https://www.laranayeltrebol.com/wp-content/uploads/2017/02/AlimentacionSaludable101-1200x310.jpg",
    movieId: "",
  },
];

const bannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.bannerList:
      return action.payload.length > 0 ? action.payload : state;
    default:
      return state;
  }
};

export { bannerReducer };
