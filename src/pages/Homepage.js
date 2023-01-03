import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";

import {
  FormWrapper,
  Title,
  Form,
  FormGroup,
  FormLabel,
  InputSelect,
} from "./NewBlogPage";

import { selectBlogs } from "../store/blog/selectors";
import { fetchBlogData } from "../store/blog/thunks";
import { fetchCategoriesWithData } from "../store/categories/thunks";
import { selectCategoriesWithData } from "../store/categories/selectors";
import { Button, Container, Image, ImagesCard } from "./ManageFeedback";
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
    <div>
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
      <Container>
        {blogs.map((b) => {
          return (
            <ImagesCard key={b.id}>
              <Image
                src={b.mainImageUrl}
                alt="categories"
                style={{ width: "300px", height: "200px", marginRight: "10px" }}
              />
              <h3>{b.title}</h3>
              <Link to={`/blogs/${b.id}`}>See more</Link>
            </ImagesCard>
          );
        })}
      </Container>
    </div>
  );
}

export default Homepage;
