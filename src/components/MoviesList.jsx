import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { selectMovie } from "../redux/actions/moviesActions";
import Rate from "./Rate";

const MoviesList = memo(({ movies }) => {
  const dispacth = useDispatch();
  const handleSelectMovie = (e, data) => {
    e.preventDefault();
    dispacth(selectMovie(data));
  };
  
  return (
    <div className="d-flex">
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
          />
          <Rate rate={movie.rate || 0} />
        </div>
      ))}
    </div>
  );
});

export default MoviesList;
