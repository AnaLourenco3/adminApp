import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";
import { addNewBlogPost } from "../store/blog/thunks";
// import { postStory } from "../../store/user/actions";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../config/constants";

export default function NewBlogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [category, setCategory] = useState(1);
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState("");

  //   const [files, setFiles] = useState("");
  //   const [images, setImages] = useState("");

  const categories = useSelector(selectCategories);
  const { id } = useParams();
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

  const submitForm = async (event) => {
    event.preventDefault();

    const response = await axios.post(`${apiUrl}/blogs`, {
      categoryId: category,
      date,
      title,
      text,
      mainImage: mainImageUrl,
      videoUrl,
    });
    setDate("");
    setTitle("");
    setText("");
    setMainImageUrl("");
    setVideoUrl("");

    navigate(`/blogs/${response.data.newBlogPost.id}`);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <FormWrapper>
        <Form action="#">
          <Title>New blog Post</Title>
          <FormGroup>
            <FormLabel>Choose a category:</FormLabel>
            <InputSelect
              name="category"
              onChange={(event) => setCategory(event.target.value)}
              required
              value={category}
            >
              <option value="">----Select a category----</option>
              {categories &&
                categories.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
            </InputSelect>
          </FormGroup>
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
          <FormGroup>
            <FormLabel>
              Add Youtube video url (only permitted for Tutorial category):
              example "https://www.youtube.com/embed/FFe8T93Xkh0" (tutorial
              video)
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
            <Button type="submit" onClick={submitForm}>
              Post!
            </Button>
          </FormGroup>
        </Form>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px auto auto auto;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 60px auto 60px auto;
`;

export const FormWrapper = styled.div`
  display: block;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 800px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
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

const Button = styled.button`
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
