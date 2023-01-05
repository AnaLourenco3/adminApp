import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteImageBlog, postBlogImages } from "../store/blog/thunks";
import { selectBlog, selectImagesBlog } from "../store/blog/selectors";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function DetailsImagePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

  const blogData = useSelector(selectBlog);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      const image = URL.createObjectURL(file);
      return image;
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    // FOR BUG IN CHROME
    event.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedImages.forEach(async (imageUrl) => {
      const file = await fetch(imageUrl).then((r) => r.blob());
      URL.revokeObjectURL(imageUrl);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        dispatch(postBlogImages(reader.result, blogData.id));
      };
    });
    setSelectedImages([]);
  };

  const handleDelete = (id) => {
    dispatch(deleteImageBlog(id));
  };

  const deleteHandler = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  return (
    <Container>
      <ButtonBack onClick={() => navigate(`/blogs/${blogData.id}`)}>
        Back
      </ButtonBack>
      <Title>Upload Images in your blog post</Title>
      <Label>
        + Add Images
        <br />
        <span>up to 10 images</span>
        <Input
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </Label>
      <br />

      <Input type="file" multiple />

      {selectedImages.length > 0 &&
        (selectedImages.length > 10 ? (
          <Error>
            You can't upload more than 10 images! <br />
            <span>
              please delete <b> {selectedImages.length - 10} </b> of them{" "}
            </span>
          </Error>
        ) : (
          <UploadButton
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </UploadButton>
        ))}

      <Images>
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <Image key={image}>
                <img
                  src={image}
                  height="200"
                  alt="upload"
                  style={{ marginBottom: "7px" }}
                />

                <ButtonImage onClick={() => deleteHandler(image)}>
                  Remove from list
                </ButtonImage>
                <ImgP>{index + 1}</ImgP>
              </Image>
            );
          })}
      </Images>
      <Title>Images in your blog post</Title>
      <Images>
        {blogData &&
          blogData.blogImages.map((image) => {
            return (
              <Image key={image.id}>
                <img
                  src={image.imagesUrl}
                  height="200"
                  alt="upload"
                  style={{ marginBottom: "7px" }}
                />

                <ButtonImage onClick={() => handleDelete(image.id)}>
                  Delete
                </ButtonImage>
              </Image>
            );
          })}
      </Images>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 60px auto 60px auto;
`;

const Label = styled.label`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dotted black;
  border-radius: 20px;
  width: 10rem;
  height: 10rem;
  cursor: pointer;
  font-size: large;

  label span {
    font-weight: lighter;
    font-size: small;
    padding-top: 0.5rem;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
`;
const Input = styled.input`
  display: none;
`;
const Images = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  margin: 1rem 0.5rem;
  position: relative;
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

const ImgP = styled.p`
  padding: 0 0.5rem;
  margin: 0;
`;

const UploadButton = styled.button`
  margin: 0 auto 30px auto;

  width: 10rem;
  height: 3rem;

  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 20px;

  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }
`;
const Error = styled.p`
  text-align: center;

  .error span {
    color: red;
  }
`;

const ButtonBack = styled.button`
  border: none;
  background: none;
`;
