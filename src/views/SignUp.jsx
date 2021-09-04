import React from "react";
import { Form, Container } from "react-bootstrap";
import { useForm } from "../hooks/useForm";
import { registerEmailPasswordName } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "validator";
import { removeError, setError } from "../redux/actions/uiErrors";
import CustomButton from "../components/CustomButton";
import constants from "../helpers/constants";

const { SIGN_UP, NAME, EMAIL, PASSWORD, REPEAT_PASSWORD, SIGN_IN } = constants;
const SignUp = () => {
  const history = useHistory();
  const { msjError, loading } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
  });

  const { name, email, pass1, pass2 } = values;

  const formValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError("Nombre requerido"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setError("Email requerido"));
      return false;
    } else if (pass1 !== pass2 || pass1 < 5) {
      dispatch(setError("La contraseña es invalida"));
      return false;
    }

    dispatch(removeError(""));
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formValid()) {
      dispatch(registerEmailPasswordName(email, pass1, name));
      reset();

      setTimeout(() => {
        history.push("/login");
      }, 2500);
    }
  };

  return (
    <Container
      className="d-flex m-auto align-self-center"
      style={{
        height: "80vh",
      }}
    >
      <Form onSubmit={handleRegister} className="m-auto col-6">
        <h1 className="h3 mb-3 font-weight-normal">Formulario de Registro</h1>
        {msjError && <div className="alert alert-danger">{msjError}</div>}
        <Form.Group className="mb-3">
          <Form.Label>{NAME}</Form.Label>
          <Form.Control
            className="mb-1"
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{EMAIL}</Form.Label>
          <Form.Control
            className="mb-1"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{PASSWORD}</Form.Label>
          <Form.Control
            className="mb-1"
            type="password"
            placeholder="Password"
            name="pass1"
            value={pass1}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{REPEAT_PASSWORD}</Form.Label>
          <Form.Control
            className="mb-1"
            type="password"
            placeholder="Password"
            name="pass2"
            value={pass2}
            onChange={handleInputChange}
          />
        </Form.Group>
        <CustomButton
          custom="primary"
          type="submit"
          className="my-1 btn-socials align-self-center"
          value={SIGN_UP}
          disabled={loading}
        />
        <p>
          ¿Ya Tienes una cuenta?{" "}
          <span>
            <Link to="/login" className="custom-text-primary">
              {SIGN_IN}
            </Link>
          </span>
        </p>
      </Form>
    </Container>
  );
};

export default SignUp;
