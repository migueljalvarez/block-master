import React from "react";
import { useDispatch } from "react-redux";
import { Form, FormControl } from "react-bootstrap";
import searchIcon from "../assets/svg/search.svg";

const SearchBar = ({ filter, handleSearch, searchTerm, placeholder }) => {
  const dispatch = useDispatch();
  
  const search = (e) => {
    e.preventDefault();
    if (searchTerm.length > 0) {
      dispatch(filter(searchTerm.toUpperCase()));
    }
  };

  return (
    <div>
      <Form className="search d-flex mx-5">
        <FormControl
          type="search"
          className=""
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder={placeholder}
        />
        <button onClick={search}>
          <img src={searchIcon} alt="search" />
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
