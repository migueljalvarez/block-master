import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import MovieDetails from "../components/MovieDetails";
import MoviesList from "../components/MoviesList";
import { getMovies } from "../redux/actions/moviesActions";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllMovies = () => {
  const dispacth = useDispatch();
  const movies = useSelector((state) => state.movies);
  const search = useSelector((state) => state.search);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      dispacth(
        getMovies({
          action: "get",
        })
      );
    }
    return () => setLoading(false);
  }, [dispacth, loading, movies]);

  const handleNext = () => {
    const opt = {
      action: "next",
    };
    dispacth(getMovies(opt));
  };

  const handlePrevious = () => {
    const opt = {
      action: "previous",
    };
    dispacth(getMovies(opt));
  };

  return (
    <div>
      <Container>
        <h1 className="fw-bold px-4 m-4">
          {search.isSearch ? "Resultados de busqueda" : "Todas las Peliculas"}
        </h1>
      </Container>
      <Container className="d-flex">
        <MoviesList movies={movies} />
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

export default AllMovies;
