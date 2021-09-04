import constants from "./constants";
const { SIGN_IN, LOGOUT } = constants;

const menu = [
  {
    label: "Todas",
    path: "/all",
  },
  {
    label: "Más valoradas",
    path: "/movie/top",
  },
  {
    label: "Menos valoradas",
    path: "/movie/least",
  },
];

const dropdownMenu = [
  {
    label: "Cargar Banner",
    path: "/banner/load",
  },
  {
    label: "Cargar Pelicula",
    path: "/movie/add",
  },
  {
    label: "Registrarse",
    path: "/signup",
  },
  {
    label: SIGN_IN,
    path: "/login",
  },
  {
    label: LOGOUT,
    path: "/logout",
  },
];

export { menu, dropdownMenu };
