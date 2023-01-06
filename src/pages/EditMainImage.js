import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectBlog } from "../store/blog/selectors";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { replaceMainImageBlog } from "../store/blog/thunks";

export default function EditMainImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogData = useSelector(selectBlog);

  const [file, setFile] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(replaceMainImageBlog(blogData.id, mainImageUrl));
    setMainImageUrl(null);
    navigate(`/blogs/${blogData.id}`);
  };

  useEffect(() => {
    if (blogData) {
      console.log("from edit", blogData);
    } else {
      navigate("/");
    }
  }, [blogData, navigate]);

  return (
    <Container>
      <ButtonBack onClick={() => navigate(`/blogs/${blogData.id}`)}>
        Back
      </ButtonBack>
      <ContainerBody>
        <FormWrapper>
          <Title>Edit main image</Title>
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
          {mainImageUrl && (
            <img src={mainImageUrl} alt="chosen" style={{ width: "300px" }} />
          )}
        </FormWrapper>
        {blogData && (
          <div>
            <Title>Main Image</Title>
            <Images>
              <Image>
                <img
                  src={blogData.mainImageUrl}
                  height="300"
                  alt="upload"
                  style={{ marginBottom: "20px" }}
                />
              </Image>
            </Images>
          </div>
        )}
      </ContainerBody>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px;
`;

const ContainerBody = styled.div`
  text-align: center;
  display: flex;
  gap: 70px;

  width: 100%;

  margin: 12px auto auto auto;

  text-align: center;
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
  display: block;
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

const ButtonBack = styled.button`
  border: none;
  background: none;
`;
