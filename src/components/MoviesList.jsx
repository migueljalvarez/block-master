import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { getMovieById } from "../redux/actions/moviesActions";
import Rate from "./Rate";

const MoviesList = memo(({ movies }) => {
  console.log(movies);
  const dispacth = useDispatch();
  const handleSelectMovie = (e) => {
    e.preventDefault();
    const id = e.target.id;
    dispacth(getMovieById(id));
  };

  return (
    <div className="d-flex">
      {movies?.map((movie, index) => (
        <div
          key={index}
          className="m-2 rounded"
          onClick={(e) => handleSelectMovie(e)}
        >
          <img
            id={movie.id}
            src={movie.posterUrl}
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
