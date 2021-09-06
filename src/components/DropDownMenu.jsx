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
  dropdownMenu.map((item, index) => {
    if (item.label === SIGN_IN || item.label === "Registrarse") {
      items.push(
        <Dropdown.Item
          as={Link}
          key={index}
          disabled={user.isAuthenticated}
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
          disabled={user.isAuthenticated}
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
          disabled={!user.isAuthenticated}
          to={item.path}
        >
          {item.label}
        </Dropdown.Item>
      );
    }
    return items;
  });

  return (
    <div className="dropDownMenu d-flex">
      <Avatar width="40px" user={user} />
      <DropdownButton variant="black" title="">
        {items}
      </DropdownButton>
    </div>
  );
};

export default DropDownMenu;
