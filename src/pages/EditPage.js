import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { selectCategories, selectBlog } from "../store/blog/selectors";
import { fetchCategories } from "../store/categories/thunks";
import { addNewBlogPost } from "../store/blog/thunks";
// import { postStory } from "../../store/user/actions";
// import axios from "axios";

export default function EditPage() {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [category, setCategory] = useState(1);
  //   const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState("");
  //   const [files, setFiles] = useState("");
  //   const [images, setImages] = useState("");

  const blogData = useSelector(selectBlog);

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setMainImageUrl(reader.result);
    };
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  function submitForm(event) {
    event.preventDefault();

    dispatch(addNewBlogPost(category, date, title, text, mainImageUrl));
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <FormWrapper>
      <Form action="#">
        <Title>Edit blog Post</Title>

        <FormGroup>
          <FormLabel>Date:</FormLabel>
          <Input
            value={date}
            onChange={(event) => setDate(event.target.value)}
            type="text"
            placeholder="Date example: 27.12.2022"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Title:</FormLabel>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Post title"
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Text:</FormLabel>
          <TextArea
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder="Write your text here"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Main Image url:</FormLabel>
          <InputImage
            id="mainImage"
            onChange={(e) => handleChange(e)}
            type="file"
            placeholder="Main picture"
            required
            accept="image/png, image/jpeg, img/jpg, image/jfif"
          />
          {mainImageUrl && (
            <img src={mainImageUrl} alt="chosen" style={{ width: "300px" }} />
          )}
        </FormGroup>
        {/* <FormGroup>
            <FormLabel>
              Add video url (only youtube supported): example
              https://www.youtube.com/embed/xNRJwmlRBNU
            </FormLabel>
            <Input
              id={videoUrl}
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              type="text"
              placeholder="Video Url"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Add post images:</FormLabel>
            <InputImage
              id={images}
              value={images}
              onChange={(event) => setImages(event.target.value)}
              type="file"
              placeholder="Pictures on blog details"
              required
              accept="image/png, image/jpeg, img/jpg, image/jfif"
              multiple
            />
            {images &&
              images.map((i) => (
                <img src={i} alt="chosen" style={{ width: "300px" }} />
              ))}
          </FormGroup> */}
        <FormGroup>
          <Button type="submit" onClick={submitForm}>
            Post!
          </Button>
        </FormGroup>
      </Form>
    </FormWrapper>
  );
}

export const FormWrapper = styled.div`
  display: flex;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 700px;
`;

export const Title = styled.h1`
  margin-top: 60px;
`;

export const FormGroup = styled.div``;

export const FormLabel = styled.label``;

export const Input = styled.input`
  display: block;
  width: 100%;
  /* background-color: white; */
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const InputImage = styled.input`
  display: flex;
  margin: 10px 0 20px 0;
  /* padding: 0 20px; */
`;

export const InputSelect = styled.select`
  display: block;
  width: 100%;
  background-color: white;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 2px;
  box-sizing: border-box;
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
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: vertical;
  background-color: white;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
`;
