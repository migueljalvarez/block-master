import { types } from "../types/types";
import Banner from "../../services/banner";
// const createBanner = () => {
//   return (dispacth) => {

//   };
// };

export const getBanners = () => {
  return async (dispacth) => {
    const banner = await Banner.findAll();
    
    dispacth({
      type: types.bannerList,
      payload: banner,
    });
  };
};
