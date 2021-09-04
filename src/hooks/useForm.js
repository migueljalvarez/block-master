import { useState } from "react";
import { fileUpload } from "../helpers/fileUpload";

const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    fileUpload(file)
      .then((response) => {
        document.getElementById("image").value = response;

        setValues({
          ...values,
          imageUrl: response,
        });
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClickFile = (e) => {
    document.getElementById("fileSelector").click();
  };

  return [values, handleInputChange, handleFileChange, handleClickFile, reset];
};
export { useForm };
