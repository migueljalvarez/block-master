import React from "react";
import { Form, Container } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";
import {
  loginEmailPassword,
  loginFacebook,
  loginGoogle,
} from "../redux/actions/authActions";
import constants from "../helpers/constants";
import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";
const { EMAIL, PASSWORD, SIGN_IN, SIGN_IN_WITH_GOOGLE, SIGN_IN_WITH_FACEBOOK } =
  constants;

const Login = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });
  const { loading } = useSelector((state) => state.ui);
  const { email, password } = values;

  const handleloginGoogle = () => {
    dispatch(loginGoogle());
  };

  const handleLoginWithFacebook = () => {
    dispatch(loginFacebook());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginEmailPassword(email, password));
    reset();
  };

  const SocialsButtons = () => {
    return (
      <Container className="d-flex justify-content-between my-1  m-auto">
        <CustomButton
          custom="google"
          value={SIGN_IN_WITH_GOOGLE}
          Icon={FcGoogle}
          iconClassName="m-1"
          iconSize={20}
          onClick={handleloginGoogle}
          margin="5px"
          size="lg"
        />
        <CustomButton
          custom="facebook"
          value={SIGN_IN_WITH_FACEBOOK}
          Icon={FaFacebook}
          iconClassName="m-1"
          iconSize={20}
          onClick={handleLoginWithFacebook}
          margin="5px"
          size="lg"
        />
      </Container>
    );
  };

  return (
    <Container
      className="d-flex m-auto flex-column align-self-center"
      style={{
        height: "80vh",
      }}
    >
      <h1 className="text-center my-5">{SIGN_IN}</h1>

      <Form className="col-6 m-auto" onSubmit={handleSubmit} method="POST">
        <SocialsButtons />
        <div className="divider">Or</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{EMAIL}</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{PASSWORD}</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </Form.Group>

        <CustomButton
          custom="primary"
          type="submit"
          className="my-1 btn-socials align-self-center"
          value={SIGN_IN}
          disabled={loading}
        />
        <hr />

        <p className=" float-end">
          ¿No tienes una cuenta?{" "}
          <Link to="/signup" className="custom-text-primary">
            Registrate
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
