import React, { memo } from "react";
import { useDispatch } from "react-redux";
import constants from "../helpers/constants";
import { selectMovie } from "../redux/actions/moviesActions";
import Rate from "./Rate";

const MoviesList = ({ movies }) => {
  const dispacth = useDispatch();
  const handleSelectMovie = (e, data) => {
    e.preventDefault();
    dispacth(selectMovie(data));
  };

  return (
    <div className="d-flex flex-wrap justify-content-center mb-5">
      {movies?.map((movie, index) => (
        <div
          key={index}
          className="m-2 rounded"
          onClick={(e) => handleSelectMovie(e, movie)}
        >
          <img
            id={movie.id}
            src={movie.imageUrl}
            alt={movie.name}
            width="220"
            height="330"
            className="rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = constants.DEFAULT_MOVIE_POSTER;
            }}
          />
          <Rate rate={movie.rate || 0} />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
