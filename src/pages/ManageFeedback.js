import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteFeedback,
  fetchFeedbacks,
  postFeedback,
} from "../store/feedback/thunks";
import { selectFeedbacks } from "../store/feedback/selectors";
import styled from "styled-components";
import { selectToken } from "../store/user/selectors";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

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
    dispatch(postFeedback(image));
    setImage(null);
  };

  const dispatch = useDispatch();
  const feedbacks = useSelector(selectFeedbacks);

  const onDelete = (e, feedbackId) => {
    e.preventDefault();
    dispatch(deleteFeedback(feedbackId));
  };

  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  return (
    <Container>
      <FormWrapper>
        <Title>Upload a Feedback</Title>
        <Form onSubmit={(e) => handleSubmit(e)} className="form">
          <input
            id="file"
            type="file"
            name="image"
            onChange={(e) => handleChange(e)}
            required
            accept="image/png, image/jpeg, img/jpg, image/jfif"
            className="form-input"
          />
          <Button type="submit">Submit</Button>
        </Form>
        {image && <img src={image} alt="chosen" style={{ width: "300px" }} />}
      </FormWrapper>

      <div>
        <Title>Feedbacks on your page</Title>
        <Images>
          {feedbacks &&
            feedbacks.map((f) => {
              return (
                <Image key={f.id}>
                  <img
                    src={f.imageUrl}
                    height="200"
                    alt="upload"
                    style={{ marginBottom: "20px" }}
                  />
                  <ButtonImage onClick={(e) => onDelete(e, f.id)}>
                    Delete
                  </ButtonImage>
                </Image>
              );
            })}
        </Images>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px;
  text-align: center;
  display: flex;
  gap: 70px;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 60px auto 60px auto;
`;

export const FormWrapper = styled.div`
  display: inline-block;
`;

export const Form = styled.form`
  width: 300px;
  max-width: 700px;
`;

export const Images = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.div`
  margin: 1rem 0.5rem;
  position: relative;
  width: 150px;
`;

export const Button = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 30px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  /* display: flex;
  flex-direction: row; */
  margin-top: 7px;
`;

const ButtonImage = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  border: none;
  color: white;
  background-color: #f7797d;
  border-radius: 5px;
  padding: 3px 5px;

  &:hover {
    scale: 1.1;
  }
`;
