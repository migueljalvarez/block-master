import { types } from "../types/types";
import Banner from "../../services/banner";
import Swal from "sweetalert2";
import { startLoading, finishLoading } from "./uiErrors";

const createBanner = (data) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const banner = await Banner.create(data);
      dispatch({
        type: types.bannerCreate,
        payload: banner,
      });
      dispatch(finishLoading());
      Swal.fire({
        position: "center",
        text: "Carga Exitosa",
        icon: "success",
        title: banner.name,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha Ocurrido un Error",
        text: error.message,
        footer: "",
      });
    }
  };
};
const getBanners = () => {
  return async (dispacth) => {
    const banner = await Banner.findAll();

    dispacth({
      type: types.bannerList,
      payload: banner,
    });
  };
};
export { createBanner, getBanners };
