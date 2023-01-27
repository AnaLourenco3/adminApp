import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { selectBlog } from "../store/blog/selectors";
import { editContentDetails } from "../store/blog/thunks";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";
import { selectToken } from "../store/user/selectors";

export default function EditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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
      setVideoUrl(blogData.videoUrl);
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
      editContentDetails(
        blogData.id,
        category,
        categoryName,
        date,
        title,
        text,
        videoUrl
      )
    );
    navigate(`/blogs/${blogData.id}`);
  }

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <Container>
      <ButtonBack onClick={() => navigate(`/blogs/${blogData.id}`)}>
        Back
      </ButtonBack>
      <ContainerBody>
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
                Update!
              </Button>
            </FormGroup>
          </Form>
        </FormWrapper>
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
  max-width: 700px;

  width: 100%;

  margin: 0 auto auto auto;

  text-align: center;
`;

export const FormWrapper = styled.div`
  display: flex;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 700px;
  display: inline-block;
  text-align: left;
`;

export const Title = styled.h1`
  margin: 60px auto 80px auto;
  text-align: center;
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

const ButtonBack = styled.button`
  border: none;
  background: none;
`;
