import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";

import { dropdownMenu } from "../helpers/menu";
import { logout } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import constants from "../helpers/constants";

const { LOGOUT, SIGN_IN } = constants;
const DropDownMenu = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const items = [];
  let isDisabled = false;

  dropdownMenu.map((item, index) => {
    if (item.label === SIGN_IN || item.label === "Registrarse") {
      isDisabled = true;
      items.push(
        <Dropdown.Item
          as={Link}
          key={index}
          disabled={isDisabled}
          to={item.path}
        >
          {item.label}
        </Dropdown.Item>
      );
    } else if (item.label === LOGOUT) {
      items.push(
        <Dropdown.Item
          as={Link}
          key={index}
          role="button"
          disabled={!user.isAuthenticated}
          onClick={handleLogout}
          to="/"
        >
          {item.label}
        </Dropdown.Item>
      );
    } else {
      items.push(
        <Dropdown.Item
          as={Link}
          key={index}
          disabled={isDisabled}
          to={item.path}
        >
          {item.label}
        </Dropdown.Item>
      );
    }
    return items;
  });

  return (
    <>
      <Avatar width="40px" user={user} />
      <DropdownButton variant="black" title="">
        {items}
      </DropdownButton>
    </>
  );
};

export default DropDownMenu;
