import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import { useParams } from "react-router-dom";
import makeAnimated from "react-select/animated";
import Select from "../components/Select";
import { createBanner } from "../redux/actions/bannerActions";

const customPrimary = "#fed941";
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    "&:hover": {
      backgroundColor: customPrimary,
    },
    color: "#000",
    backgroundColor: state.isSelected ? customPrimary : "#fff",
  }),
};

const FormLoadBanner = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [optionSelected, setOptionSelected] = useState(null);
  // const banner = useSelector((state) => state.banner);
  const { loading } = useSelector((state) => state.ui);
  const movies = useSelector((state) => state.movies);

  const optionsSelect = movies.map((movie) => ({
    label: movie.name,
    value: movie.id,
  }));
  const animatedComponents = makeAnimated();
  const initialState = {
    name: "",
    imageUrl: "",
    movieId: "",
  };
  const [values, handleInputChange, handleFileChange, handleClickFile, reset] =
    useForm(initialState);
  const { name } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!param.id) {
      dispatch(createBanner(values));
    } else {
      // dispatch(updateMovies(param.id, values));
    }
    reset();
  };

  const handleChangeSelect = (selected) => {
    setOptionSelected(selected);
    const e = {
      target: {
        name: "movieId",
        value: `/Movies/${selected.value}`,
      },
    };
    handleInputChange(e);
  };

  return (
    <Container>
      <Container>
        <Form
          className="d-flex flex-column"
          onSubmit={handleSubmit}
          method={param.id ? "PATCH" : "POST"}
        >
          <h1>
            {param.id
              ? "Actualizar información del banner"
              : "Carga un nuevo banner"}
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
            <Form.Label>Banner</Form.Label>
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
            <Form.Label>Movie</Form.Label>

            <Select
              styles={customStyles}
              closeMenuOnSelect={true}
              hideSelectedOptions={false}
              components={{ animatedComponents }}
              allowSelectAll={false}
              placeholder="Selecciona la pelicula asociada"
              value={optionSelected}
              options={optionsSelect}
              onChange={handleChangeSelect}
            />
          </Form.Group>
          <CustomButton
            className="float-end-flex"
            type="submit"
            custom="primary"
            value={param.id ? "Actualizar " : "Cargar Banner"}
            margin="10px 0px"
          />
        </Form>
      </Container>
    </Container>
  );
};

export default FormLoadBanner;
