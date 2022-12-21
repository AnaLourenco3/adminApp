import React, { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000", {
        image: image,
      });
      console.log(result);
      //   setImage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="title">Upload an Image</h1>
      <Alert msg={errMsg} type="danger" />
      <Alert msg={successMsg} type="success" />
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={(e) => handleChange(e)}
          required
          accept="image/png, image/jpeg, img/jpg, image/jfif"
          className="form-input"
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>

      {image && <img src={image} alt="chosen" style={{ width: "300px" }} />}
    </div>
  );
}
