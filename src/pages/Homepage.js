import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";

import { Title, Form, FormGroup, FormLabel, InputSelect } from "./NewBlogPage";

import axios from "axios";
import { apiUrl } from "../config/constants";

function Homepage() {
  const [category, setCategory] = useState("");
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const updateSelectCategory = async (e) => {
    setCategory(e.target.value);
    const id = e.target.value;
    try {
      const response = await axios.get(`${apiUrl}/categories/${id}/blogs`);
      console.log("this is from /categories with blogs", response.data);
      setBlogs(response.data.blogs);
    } catch (e) {
      setBlogs([]);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container>
      <Welcome>Hello Miriam,</Welcome>
      <Welcome>welcome to your Admin Page</Welcome>
      <FormWrapper>
        <Form action="#">
          <Title>Your Posts on MiEvents Webpage</Title>
          <FormGroup>
            <FormLabel>Choose a category:</FormLabel>
            <InputSelect
              name="category"
              onChange={updateSelectCategory}
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
        </Form>
      </FormWrapper>

      <ContainerBlogs>
        {blogs.map((b) => {
          return (
            <Images key={b.id}>
              {b.mainImageUrl && (
                <Image
                  src={b.mainImageUrl ? b.mainImageUrl : ""}
                  alt="categories"
                  style={{
                    width: "300px",
                    height: "200px",
                    marginRight: "30px",
                  }}
                />
              )}
              <Data>
                <h4>{b.title}</h4>
                <Link to={`/blogs/${b.id}`}>See more</Link>
              </Data>
            </Images>
          );
        })}
      </ContainerBlogs>
    </Container>
  );
}

export default Homepage;

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px;
  text-align: center;
`;

const Images = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const Image = styled.img`
  margin: 1rem 0.5rem;
  position: relative;
  width: 150px;
`;

const FormWrapper = styled.div`
  display: inline-block;
`;

const ContainerBlogs = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

const Welcome = styled.p`
  font-size: 2rem;
  font-family: Amsterdam;
  text-align: center;
`;
