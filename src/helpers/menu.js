import constants from "./constants";
const { SIGN_IN, LOGOUT } = constants;

const menu = [
  {
    label: "Todas",
    path: "/all",
  },
  {
    label: "Más valoradas",
    path: "/top",
  },
  {
    label: "Menos valoradas",
    path: "/least",
  },
];

const dropdownMenu = [
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
