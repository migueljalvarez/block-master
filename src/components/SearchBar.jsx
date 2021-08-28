import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, FormControl } from "react-bootstrap";

import searchIcon from "../assets/svg/search.svg";

const SearchBar = ({ filter, handleChange, searchTerm, placeholder }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchTerm.length > 0) {
      dispatch(filter(searchTerm.toLowerCase()));
    }
  }, [searchTerm, dispatch, filter]);

  return (
    <div>
      <Form className="search d-flex mx-5">
        <FormControl
          type="search"
          className=""
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <button>
          <img src={searchIcon} alt="search" />
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
