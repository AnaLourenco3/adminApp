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

  // console.log("from page", feedbacks);
  const onDelete = (e, feedbackId) => {
    e.preventDefault();
    dispatch(deleteFeedback(feedbackId));
  };

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Title>Upload a Feedback</Title>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
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
        </form>
        {image && <img src={image} alt="chosen" style={{ width: "300px" }} />}
      </div>

      <div>
        <h1>Feedbacks on your page</h1>
        <Container>
          {feedbacks &&
            feedbacks.map((f) => {
              return (
                <ImagesCard key={f.id}>
                  <Image src={f.imageUrl} alt="feedback" />
                  <Button onClick={(e) => onDelete(e, f.id)}>Delete</Button>
                </ImagesCard>
              );
            })}
        </Container>
      </div>
    </div>
  );
}

export const Title = styled.h1`
  margin-top: 60px;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
`;

export const ImagesCard = styled.div``;

export const Image = styled.img`
  width: 150px;

  &:hover {
    scale: 2;
  }
`;

export const Button = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  /* display: flex;
  flex-direction: row; */
  margin-top: 7px;
`;
