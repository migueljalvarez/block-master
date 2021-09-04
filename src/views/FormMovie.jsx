import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import Select from "../components/Select";
import CustomButton from "../components/CustomButton";
import makeAnimated from "react-select/animated";
import { components } from "react-select";
import constants from "../helpers/constants";
import { useDispatch, useSelector } from "react-redux";

import {
  createMovies,
  getMovieById,
  updateMovies,
} from "../redux/actions/moviesActions";
import { useParams } from "react-router-dom";

const { DEFAULT_MOVIE_POSTER, GENDERS_MOVIES } = constants;

const FormMovie = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const [optionSelected, setOptionSelected] = useState(null);
  const initialState = {
    name: "",
    description: "",
    gender: [],
    duration: "",
    year: 0,
    rate: 0,
    imageUrl: "",
    trailerUrl: "",
  };

  const { loading } = useSelector((state) => state.ui);
  const movie = useSelector((state) => state.movie);
  const [isLoading, setIsLoading] = useState(true);
  const getCurrentMovies = () => {
    if (param.id) {
      dispatch(getMovieById(param.id));
    }
  };
  useEffect(() => {
    if (isLoading) {
      getCurrentMovies();
      setIsLoading(false);
    }
    if (movie.isUpdate) {
      reset();
      getCurrentMovies();
    }
  }, [dispatch, isLoading, movie.isUpdate]);

  const [values, handleInputChange, handleFileChange, handleClickFile, reset] =
    useForm(param.id ? movie : initialState);

  const animatedComponents = makeAnimated();
  const {
    name,
    description,
    gender,
    duration,
    year,
    rate,
    imageUrl,
    trailerUrl,
  } = values;

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const MultiValue = (props) => (
    <components.MultiValue {...props}>
      <span>{props.data.label}</span>
    </components.MultiValue>
  );

  const handleChangeSelect = (selected) => {
    setOptionSelected(selected);
    const e = {
      target: {
        name: "gender",
        value: selected.map((s) => s.label),
      },
    };
    handleInputChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!param.id) {
      dispatch(createMovies(values));
    } else {
      dispatch(updateMovies(param.id, values));
    }
    reset();
  };

  return (
    <Container className="d-flex">
      <Container>
        <Form
          className="d-flex flex-column"
          onSubmit={handleSubmit}
          method={param.id ? "PATCH" : "POST"}
        >
          <h1>
            {param.id
              ? "Actualizar informacion de la pelicula"
              : "Carga una nueva pelicula"}
          </h1>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Nombre de la pelicula"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripcion:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Descripción"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Poster:</Form.Label>
            <div
              className=""
              style={{
                display: "flex",
              }}
            >
              <Form.Control
                className=""
                type="file"
                name="file"
                id="fileSelector"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Form.Control
                className="w-75"
                type="text"
                name="imageUrl"
                id="image"
                readOnly
                style={{
                  borderRadius: "2px 0px 0px 2px",
                }}
                placeholder="Seleccione un archivo"
              />

              <CustomButton
                className="w-25 float-left"
                custom="primary"
                onClick={handleClickFile}
                type="button"
                value="Cargar Poster"
                borderRadius="0px 2px 2px 0px"
                disabled={loading}
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Año:</Form.Label>
            <Form.Control
              name="year"
              type="number"
              value={year}
              onChange={handleInputChange}
              placeholder="Año de estreno"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duración:</Form.Label>
            <Form.Control
              name="duration"
              value={duration}
              onChange={handleInputChange}
              placeholder="Duración 1h 1m"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Calificación:</Form.Label>
            <Form.Control
              name="rate"
              type="number"
              value={rate}
              onChange={handleInputChange}
              placeholder="Calificación"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Gender:</Form.Label>

            <Select
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option, MultiValue, animatedComponents }}
              allowSelectAll={false}
              placeholder="Selecciona los generos asociados"
              value={optionSelected}
              options={GENDERS_MOVIES}
              onChange={handleChangeSelect}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Trailer</Form.Label>
            <Form.Control
              name="trailerUrl"
              type="text"
              value={trailerUrl}
              onChange={handleInputChange}
              placeholder="Trailer Url"
            />
          </Form.Group>
          <CustomButton
            className="float-end-flex"
            type="submit"
            custom="primary"
            value={param.id ? "Actualizar " : "Cargar Pelicula"}
            margin="10px 0px"
          />
        </Form>
      </Container>
      <Container>
        <Container className="d-flex w-auto">
          <Container className="flex-column">
            <h1>{name || "Example Title"}</h1>
            <p>
              {description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. At earum ab aspernatur? Omnis nobis doloremque, minus accusamus unde accusantium ipsa harum quis voluptates impedit exercitationem illo neque eligendi distinctio obcaecati!"}
            </p>
            <p>
              {year || new Date().getFullYear()} •{" "}
              {gender?.join("/") || "example / example"} • {duration || "1h"}
            </p>
          </Container>
          <Container className="w-auto">
            <img
              src={imageUrl || DEFAULT_MOVIE_POSTER}
              alt={name}
              width="220"
              height="330"
              className="rounded"
            />
          </Container>
        </Container>
        <Container>
          <h2>Trailer</h2>
          <iframe
            src={`https://www.youtube.com/embed/${trailerUrl?.split("=").pop()}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            className="w-100"
            height="300"
          ></iframe>
        </Container>
      </Container>
    </Container>
  );
};

export default FormMovie;
