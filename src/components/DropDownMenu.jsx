import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "./Avatar";

import { dropdownMenu } from "../helpers/menu";
import { logout } from "../redux/actions/authActions";
import { Link } from "react-router-dom";
import constants from "../helpers/constants";

const { LOGOUT } = constants;
const DropDownMenu = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Avatar width="40px" user={user} />
      <DropdownButton variant="black" title={user.name}>
        {dropdownMenu.map((item, index) =>
          item.label === LOGOUT ? (
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
          ) : (
            <Dropdown.Item
              as={Link}
              key={index}
              disabled={user.isAuthenticated}
              to={item.path}
            >
              {item.label}
            </Dropdown.Item>
          )
        )}
      </DropdownButton>
    </>
  );
};

export default DropDownMenu;
