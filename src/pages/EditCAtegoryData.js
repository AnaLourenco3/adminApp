import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";
import { selectBlog } from "../store/blog/selectors";
import { editContentDetails, fetchBlogDataById } from "../store/blog/thunks";
import { useNavigate } from "react-router-dom";
import { selectCategories } from "../store/categories/selectors";
import { fetchCategories } from "../store/categories/thunks";

export default function EditCAtegoryData() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
    if (categories.id) {
      setQuote(categories.quote);
      setDescription(categories.description);
    }
  }, [categories, dispatch]);

  function submitForm(event) {
    event.preventDefault();
    const categoryName = categories.find(
      (c) => c.id === parseInt(category)
    ).name;

    dispatch(editContentDetails(categories.id, quote, description));
    // navigate(`/blogs/${blogData.id}`);
  }

  return (
    <Container>
      {/* <ButtonBack onClick={() => navigate(`/blogs/${blogData.id}`)}>
        Back
      </ButtonBack> */}
      <ContainerBody>
        <FormWrapper>
          <Form action="#">
            <Title>Edit Category Data</Title>
            <FormGroup>
              <FormLabel>Category:</FormLabel>
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
              <FormLabel>Quote:</FormLabel>
              <Input
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Description:</FormLabel>
              <Input
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
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

export const Input = styled.textarea`
  display: block;
  width: 100%;
  /* background-color: white; */
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
  resize: vertical;
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
