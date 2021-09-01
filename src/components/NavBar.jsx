import React, { useState, useEffect } from "react";
import { Navbar, Container, Dropdown, Nav } from "react-bootstrap";
import logo from "../assets/svg/logo-blockBuster.svg";
import menu from "../helpers/menu";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { BiDoorOpen, BiX } from "react-icons/bi";
// import { FaBars } from "react-icons/fa";
// import { logout } from "../redux/actions";
// import ResposiveMenu from "./ResposiveMenu";
import { searchMovies, getMovies } from "../redux/actions/moviesActions";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const handleLogout = () => {
  //   dispatch(logout());
  // };
  // const handleToggleMenu = () => {
  //   setIsShowMenu(!isShowMenu);
  // };

  const history = useHistory();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length < 1) {
      dispatch(getMovies());
    } else {
      dispatch(searchMovies(e.target.value));
    }
  };

  const DefaultMenu = () => {
    return menu.map((item, index) => (
      <Link
        className="text-white bold text-decoration-none mx-4"
        key={index}
        to={item.path}
      >
        {item.label}
      </Link>
    ));
  };

  useEffect(() => {
    return history.listen((location) => {
      if (location) {
        setIsShowMenu(false);
      }
    });
  }, [history]);

  const ProfileImage = () => {
    return (
      <>
        <div id="profile-image">
          <img
            className="rounded-circle mx-1"
            width="40"
            src={user.imageUrl}
            alt={user.name}
          />
        </div>
      </>
    );
  };

  return (
    <Container className="d-flex w-100">
      <Navbar id="nav-contarner-main" bg="black" className="">
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
              <DefaultMenu />
            </Nav>
          </Navbar.Collapse>
        </Container>

        <SearchBar
          filter={searchMovies}
          handleChange={handleSearch}
          searchTerm={searchTerm}
          placeholder="Busca tu pelicula favorita"
        />
        <Dropdown className="d-flex">
          <ProfileImage />
          <Dropdown.Toggle variant="black" id="dropdown-basic" className="px-0">
            {user.name}
          </Dropdown.Toggle>

          <Dropdown.Menu className="mt-5">
            <Dropdown.Item href="#/action-1">Cargar Peliculas</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Cargar Banners</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Registrate</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Iniciar Sesion</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Cerrar Sesion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>

      {/* <ResposiveMenu
        user={user}
        isShow={isShowMenu}
        items={menu}
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
      /> */}
    </Container>
  );
};

export default NavBar;
