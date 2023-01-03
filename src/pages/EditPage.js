import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { selectBlog } from "../store/blog/selectors";
import { editContentDetails, fetchBlogDataById } from "../store/blog/thunks";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";

export default function EditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const blogData = useSelector(selectBlog);

  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    if (blogData) {
      console.log("from edit", blogData);
      setDate(blogData.date);
      setTitle(blogData.title);
      setText(blogData.text);
      setCategory(blogData.categoryId);
    } else {
      navigate("/");
    }
  }, [blogData, navigate, dispatch]);

  function submitForm(event) {
    event.preventDefault();
    const categoryName = categories.find(
      (c) => c.id === parseInt(category)
    ).name;

    dispatch(
      editContentDetails(blogData.id, category, categoryName, date, title, text)
    );
    navigate(`/blogs/${blogData.id}`);
  }

  return (
    <FormWrapper>
      <Form action="#">
        <Title>Edit blog Post</Title>
        <FormGroup>
          <FormLabel>Edit category:</FormLabel>
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
