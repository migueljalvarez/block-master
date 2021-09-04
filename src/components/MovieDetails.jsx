import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { FaPlay, FaPlus, FaPen, FaTimes } from "react-icons/fa";
import { Modal, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../redux/actions/moviesActions";
import { useHistory } from "react-router-dom";
import YouTube from "react-youtube";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const movie = useSelector((state) => state.movie);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    dispatch(selectMovie({}));
    setShow(false);
  };

  useEffect(() => {
    if (movie.name) setShow(true);
    history.listen((location) => {
      if (location) {
        setShow(false);
      }
    });
  }, [movie.name]);

  const handleEdit = (movie) => {
    history.push(`/movie/edit/${movie.id}`);
  };
  const gender = movie.gender || [""];
  return (
    <div className="d-flex">
      <Modal show={show} onHide={handleClose} size="lg">
        <Container className=" d-flex justify-content-end text-white">
          <CustomButton
            className="bg-transparent text-white"
            type="button"
            Icon={FaPen}
            iconSize={15}
            onClick={() => handleEdit(movie)}
          />
          <CustomButton
            className="bg-transparent text-white"
            type="button"
            Icon={FaTimes}
            iconSize={20}
            onClick={handleClose}
          />
        </Container>

        <Modal.Body className="d-flex flex-wrap">
          <Container>
            <img
              src={movie.imageUrl}
              alt={movie.name}
              width="220"
              height="330"
              className="rounded"
            />
          </Container>

          <Container>
            <h1>{movie?.name}</h1>
            <p>{movie?.description}</p>
            <p>
              {movie?.year} • {gender.join("/")} • {movie?.duration}
            </p>

            <div
              className="d-flex"
              style={{
                bottom: "15px",
                left: "50px",
              }}
            >
              <CustomButton
                custom="primary"
                value="Ver Ahora"
                margin="0px 5px"
                Icon={FaPlay}
                iconSize="15"
                iconClassName="mx-1"
                className="text-uppercase bold"
              />
              <CustomButton
                custom="dark"
                value="Ver más tarde"
                margin="0px 5px"
                borderColor="primary"
                Icon={FaPlus}
                iconSize="15"
                iconClassName="mx-1"
                className="text-uppercase bold"
              />
            </div>
          </Container>
        </Modal.Body>
        <h2>Trailer</h2>
        <div className="d-flex flex-wrap justify-content-center">
          <YouTube
            className=""
            videoId={movie.trailerUrl?.split("=").pop()}
          />
        </div>
      </Modal>
    </div>
  );
};
export default MovieDetails;
