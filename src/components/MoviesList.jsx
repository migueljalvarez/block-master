import React from "react";
import { useDispatch, useSelector } from "react-redux";
import constants from "../helpers/constants";
import { selectMovie } from "../redux/actions/moviesActions";
import Rate from "./Rate";
import SearchNotFound from "../assets/svg/not_found.svg";
const MoviesList = ({ movies }) => {
  const dispacth = useDispatch();
  const search = useSelector((state) => state.search);
  const handleSelectMovie = (e, data) => {
    e.preventDefault();
    dispacth(selectMovie(data));
  };

  return (
    <div className="d-flex flex-wrap justify-content-center mb-5">
      {movies.length > 0 ? (
        movies.map((movie, index) => (
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
        ))
      ) : (
        <div className="flex-column">
          <img className="m-auto" src={SearchNotFound} alt="not result" />
          <h5 className="text-center bold">{`No se encontraron resultados para “${search.searchTerm}”`}</h5>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
