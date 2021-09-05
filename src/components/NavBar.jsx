import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/svg/logo-blockBuster.svg";
import { menu } from "../helpers/menu";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { BiDoorOpen, BiX } from "react-icons/bi";
// import { FaBars } from "react-icons/fa";
// import ResposiveMenu from "./ResposiveMenu";
import {
  searchMovies,
  getMovies,
  getLeastMovies,
  getTopMovies,
} from "../redux/actions/moviesActions";
import SearchBar from "./SearchBar";
import { DefaultMenu } from "../helpers/defaultMenu";
import DropDownMenu from "./DropDownMenu";
import { types } from "../redux/types/types";
const NavBar = () => {
  const dispatch = useDispatch();
  // const [isShowMenu, setIsShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const handleToggleMenu = () => {
  //   setIsShowMenu(!isShowMenu);
  // };

  const history = useHistory();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < 1) {
      switch (history.location.pathname) {
        case "/movie/least":
          dispatch(getLeastMovies());
          break;
        case "/movie/top":
          dispatch(getTopMovies());
          break;
        default:
          dispatch(getMovies());
      }
      dispatch({
        type: types.searchTitle,
        payload: {
          isSearch: false,
        },
      });
    }
  };

  useEffect(() => {
    return history.listen((location) => {
      if (location) {
        // setIsShowMenu(false);
      }
    });
  }, [history]);

  return (
    <div className="w-100">
      <Navbar id="nav-contarner-main" bg="black" className="container ">
        {/* <span
          id="toggle-menu"
          className="text-white bg-danger mx-4"
          onClick={handleToggleMenu}
        >
          {isShowMenu ? <BiX size={25} /> : <FaBars size={25} />}
        </span> */}
        <Container id="nav-contarner-brand">
          <Navbar.Brand href="/">
            <img
              alt="block master"
              src={logo}
              width="130"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav>
              <DefaultMenu
                className="text-white bold text-decoration-none mx-4"
                currentMenu={menu}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>

        <SearchBar
          filter={searchMovies}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          placeholder="Busca tu pelicula favorita"
        />
        <DropDownMenu />
      </Navbar>

      {/* <ResposiveMenu
        user={user}
        isShow={isShowMenu}
        items={menu}
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
      /> */}
    </div>
  );
};

export default NavBar;
