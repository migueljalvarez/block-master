import React from "react";
import Rate from "./Rate";

const MoviesList = ({movies}) => {
  return (
    <div className="d-flex">
      {movies.map((movie, index) => (
        <div key={index} className="m-2 rounded">
          <img
            src={movie.imageUrl}
            alt={movie.name}
            width="220px"
            height="330px"
            className="rounded"
          />
          <Rate rate={movie.rate} />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
