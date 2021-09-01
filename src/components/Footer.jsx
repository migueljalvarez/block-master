import React from "react";
import constants from "../helpers/constants";
const { TEXT_FOOTER } = constants;

const Footer = () => {
  return (
    <footer className="d-flex bg-black">
      <p className="text-white py-3 m-auto">{TEXT_FOOTER}</p>
    </footer>
  );
};

export default Footer;
