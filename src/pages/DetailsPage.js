import styled from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectBlog } from "../store/blog/selectors";
import { deleteBlog, fetchBlogDataById } from "../store/blog/thunks";
import { Button } from "./ManageFeedback";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

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
    <Container>
      <ButtonBack onClick={() => navigate("/")}>Back</ButtonBack>
      <ContainerBody>
        <ContainerBlogDetails>
          <ContainerMainImg style={{ position: "relative" }}>
            <img src={blogData.mainImageUrl} alt="mainImage" width="100%" />
            <RoundButton onClick={() => navigate("/edit-main-blog-image")}>
              <MdEdit
                style={{
                  position: "relative",

                  zIndex: "3",
                  fontSize: "20px",
                  fill: "white",
                }}
              />
            </RoundButton>
          </ContainerMainImg>
          <Buttons>
            <Button
              style={{ marginRight: "20px" }}
              onClick={(e) => onDelete(e, blogData.id)}
            >
              Delete
            </Button>
            <Link to={"/edit-blog"} style={{ textDecoration: "none" }}>
              <Button style={{ marginRight: "20px" }}>Edit Content</Button>
            </Link>
            <Link to={"/images-blog"} style={{ textDecoration: "none" }}>
              <Button>Add/Delete Post Images</Button>
            </Link>
            <Link to={"/images-blog"} style={{ textDecoration: "none" }}></Link>
          </Buttons>
          <p>Category: {blogData.category.name}</p>
          <p>{blogData.date}</p>
          <h2>{blogData.title}</h2>
          <p>{blogData.text}</p>
        </ContainerBlogDetails>

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
                </Image>
              );
            })}
        </Images>
      </ContainerBody>
    </Container>
  );
}

export default DetailsPage;

const Container = styled.div`
  padding: 2rem 0;
  margin-top: 30px;
`;

const ContainerBody = styled.div`
  width: 100%;
  min-height: 800px;
  max-height: none;
  margin: 125px auto auto auto;
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

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 40px;
  } ;
`;
const ContainerMainImg = styled.div`
  width: 55%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
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

const ButtonBack = styled.button`
  border: none;
  background: none;
`;

const RoundButton = styled.button`
  position: absolute;
  bottom: 25px;
  right: 25px;
  height: 32px;
  width: 32px;
  background: rgba(239, 239, 240, 0.5);
  border-radius: 50%;
  vertical-align: center;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
`;
