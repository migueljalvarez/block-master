import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import MovieDetails from "../components/MovieDetails";
import MoviesList from "../components/MoviesList";
import { getLeastMovies } from "../redux/actions/moviesActions";

const LeastRatedMovies = () => {
  const dispacth = useDispatch();
  const movies = useSelector((state) => state.movies);
  const search = useSelector((state) => state.search);

  console.log(movies);
  useEffect(() => {
    dispacth(getLeastMovies());
  }, [dispacth]);

  return (
    <div>
      <Carousel />
      <Container>
        <h1 className="fw-bold px-4 m-4">
          {search.isSearch
            ? "Resultados de busqueda"
            : "Peliculas menos valoradas"}
        </h1>
      </Container>
      <Container className="d-flex">
        <MoviesList movies={movies.sort((a, b) => b.rate - a.rate)} />
      </Container>
      <MovieDetails />
    </div>
  );
};

export default LeastRatedMovies;
