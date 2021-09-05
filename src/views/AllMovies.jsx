import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import MovieDetails from "../components/MovieDetails";
import MoviesList from "../components/MoviesList";
import { getMovies } from "../redux/actions/moviesActions";
// import "../scripts/bulkCreateMovies"
const AllMovies = () => {
  const dispacth = useDispatch();
  const movies = useSelector((state) => state.movies);
  const search = useSelector((state) => state.search);
  useEffect(() => {
    dispacth(getMovies());
  }, [dispacth]);
  return (
    <div>
      <Carousel />
      <Container>
        <h1 className="fw-bold px-4 m-4">
          {search.isSearch ? "Resultados de busqueda" : "Todas las Peliculas"}
        </h1>
      </Container>
      <Container className="d-flex">
        <MoviesList movies={movies} />
      </Container>
      <MovieDetails />
    </div>
  );
};

export default AllMovies;
