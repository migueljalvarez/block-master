import React from "react";
import { Container } from "react-bootstrap";
import MoviesList from "../components/MoviesList";
const movies = [
  {
    name: "Shan Shi",
    rate: 5.0,
    imageUrl:
      "https://www.cnet.com/a/img/resize/1a674ecf994dc53a3756a94b8c8252f90e88c795/hub/2021/04/19/111f2cf0-1f0e-4884-8733-a4809195773c/shang-chi-poster-marvel.jpg?auto=webp&width=1092",
  },
  {
    name: "Shan Shi",
    rate: 7.0,
    imageUrl:
      "https://www.cnet.com/a/img/resize/1a674ecf994dc53a3756a94b8c8252f90e88c795/hub/2021/04/19/111f2cf0-1f0e-4884-8733-a4809195773c/shang-chi-poster-marvel.jpg?auto=webp&width=1092",
  },
];
const AllMovies = () => {
  return (
    <div>
      <Container>
        <h1>Todas las Peliculas</h1>
      </Container>

      <Container className="d-flex">
        <MoviesList movies={movies}/>
      </Container>
    </div>
  );
};

export default AllMovies;
