import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MovieDetails from "../components/MovieDetails";
import MoviesList from "../components/MoviesList";
import { getLeastMovies } from "../redux/actions/moviesActions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import Carousel from "../components/Carousel";

const LeastRatedMovies = () => {
  const dispacth = useDispatch();
  const movies = useSelector((state) => state.movies);
  const search = useSelector((state) => state.search);

  useEffect(() => {
    dispacth(getLeastMovies());
  }, [dispacth]);

  const handleNext = () => {
    const opt = {
      action: "next",
    };
    dispacth(getLeastMovies(opt));
  };

  const handlePrevious = () => {
    const opt = {
      action: "prev",
    };
    dispacth(getLeastMovies(opt));
  };

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
      <Container className="d-flex justify-content-center">
        <MoviesList
          movies={movies.sort((a, b) => b.rate - a.rate && b.year - a.year)}
        />
      </Container>
      <Container className="m-auto d-flex justify-content-around pb-5">
        <CustomButton
          custom="primary"
          value="prev"
          Icon={FaChevronLeft}
          iconClassName="mx-1"
          onClick={handlePrevious}
          className="mx-2 bold"
        />
        <CustomButton
          custom="primary"
          value="next"
          Icon={FaChevronRight}
          iconClassName="mx-1"
          onClick={handleNext}
          className="mx-2 flex-row-reverse bold"
        />
      </Container>
      <MovieDetails />
    </div>
  );
};

export default LeastRatedMovies;
