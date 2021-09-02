import React, { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { FaPlay, FaPlus } from "react-icons/fa";
import { Modal, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectMovie } from "../redux/actions/moviesActions";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    dispatch(selectMovie({}));
    setShow(false);
  };

  useEffect(() => {
    if (movie.name) setShow(true);
  }, [movie.name]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body className="d-flex">
          <Container>
            <img
              src={movie.posterUrl}
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
              {movie?.year} • {movie?.gender?.join("/")} • {movie?.duration}
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
      </Modal>

      {/* <div
        className="w-100"
        style={{
          display: show ? "block" : "none",
          background: "#fff",
          position: "absolute",
          height: "100vh",
        }}
      ></div> */}
    </>
  );
};
export default MovieDetails;
