import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectBlog } from "../store/blog/selectors";
import { deleteBlog, fetchBlogDataById } from "../store/blog/thunks";
import { Button } from "./ManageFeedback";
import { useNavigate } from "react-router-dom";

function DetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const blogData = useSelector(selectBlog);
  console.log("from details", blogData);

  const onDelete = (e, blogId) => {
    e.preventDefault();
    dispatch(deleteBlog(blogId));
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchBlogDataById(id));
  }, [dispatch, id]);

  if (!blogData || parseInt(blogData.id) !== parseInt(id))
    return <p>Loading...</p>;

  return (
    <ContainerBody>
      <ContainerBlogDetails>
        <img src={blogData.mainImageUrl} alt="mainImage" width="500px" />
        <p>{blogData.date}</p>
        <h2>{blogData.title}</h2>
        <p>{blogData.text}</p>
        <Buttons>
          <Button
            style={{ marginRight: "20px" }}
            onClick={(e) => onDelete(e, blogData.id)}
          >
            Delete
          </Button>
          <Link to={`/edit-blog/${blogData.id}`}>
            <Button>Edit</Button>
          </Link>
        </Buttons>
      </ContainerBlogDetails>
    </ContainerBody>
  );
}

export default DetailsPage;

const ContainerBody = styled.div`
  width: 60%;
  min-height: 800px;
  max-height: none;
  margin: 125px auto auto;
  line-height: 30px;
  text-align: center;
  font-family: "Poppins";

  @media (max-width: 768px) {
    width: 90%;
    min-height: 500px;
    max-height: none;
    margin: 200px auto 110px auto;
    line-height: 15px;
    text-align: center;
  } ;
`;
const ContainerBlogDetails = styled.div`
  font-size: 1rem;
  margin-bottom: 70px;
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 40px;
  } ;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;
