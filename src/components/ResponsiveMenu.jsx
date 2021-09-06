import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/svg/logo-blockBuster.svg";
import { FaTimes } from "react-icons/fa";
import { dropdownMenu } from "../helpers/menu";
import { useSelector, useDispatch } from "react-redux";
import constants from "../helpers/constants";
import { logout } from "../redux/actions/authActions";
const { LOGOUT, SIGN_IN } = constants;

const ResponsiveMenu = ({ items, isShow, handleToggleMenu }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const defaultMenu = [];
  items.map((item, index) =>
    defaultMenu.push(
      <Link
        className="text-white text-decoration-none m-2"
        key={index}
        to={item.path}
      >
        {item.label}
      </Link>
    )
  );

  const dropMenu = [];
  let isDisabled = false;
  dropdownMenu.map((item, index) => {
    if (item.label === SIGN_IN || item.label === "Registrarse") {
      isDisabled = true;
      dropMenu.push(
        <Link
          key={index}
          className="text-white text-decoration-none m-2"
          disabled={isDisabled}
          to={item.path}
        >
          {item.label}
        </Link>
      );
    } else if (item.label === LOGOUT) {
      dropMenu.push(
        <Link
          key={index}
          role="button"
          disabled={!user.isAuthenticated}
          onClick={handleLogout}
          className="text-white text-decoration-none m-2"
          to="/"
        >
          {item.label}
        </Link>
      );
    } else {
      dropMenu.push(
        <Link
          key={index}
          className="text-white text-decoration-none m-2"
          disabled={isDisabled}
          to={item.path}
        >
          {item.label}
        </Link>
      );
    }
    return items;
  });
  return (
    <div
      id="responsive-menu"
      className={`bg-black ${
        isShow ? "show" : "hide"
      }  d-flex  text-uppercase bold flex-column`}
    >
      <div className="">
        <button
          id="closeResponsiveMenu"
          className="btn"
          onClick={handleToggleMenu}
        >
          <FaTimes size={24} className="text-white" />
        </button>
      </div>

      <div id="" className="w-100 d-flex flex-column text-center">
        <img
          id="logoResponsive"
          alt="block master"
          src={logo}
          width="150"
          height="200"
          className="d-inline-block align-top mx-auto"
        />
        {defaultMenu}
        {dropMenu}
      </div>
    </div>
  );
};

export default ResponsiveMenu;
