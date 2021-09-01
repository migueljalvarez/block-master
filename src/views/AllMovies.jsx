import React, {memo, useEffect} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../components/Carousel";
import MovieDetails from "../components/MovieDetails";
import MoviesList from "../components/MoviesList";
import { getMovies } from "../redux/actions/moviesActions";

const AllMovies = () => {
  const dispacth = useDispatch();
  const movies = useSelector((state) => state.movies);
  
  console.log(movies);
  
  useEffect(() => {
    dispacth(getMovies());
  }, [dispacth]);

  return (
    <div>
      <Carousel />
      <Container>
        <h1 className="fw-bold">Todas las Peliculas</h1>
      </Container>
      <Container className="d-flex">
        <MoviesList movies={movies}/>
      </Container>
      <MovieDetails />
    </div>
  );
};

export default AllMovies;
