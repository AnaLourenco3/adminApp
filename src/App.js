import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import ManageFeedback from "./pages/ManageFeedback.js";
import NewBlogPage from "./pages/NewBlogPage.js";
import Homepage from "./pages/Homepage";
import { Navigation, MessageBox } from "./components";
import DetailsPage from "./pages/DetailsPage";
import EditPage from "./pages/EditPage";
import DetailsImagePage from "./pages/DetailsImagePage";
import EditMainImage from "./pages/EditMainImage";
import EditCAtegoryData from "./pages/EditCAtegoryData";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <div className="container">
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/blogs/:id" element={<DetailsPage />} />
          <Route path="/edit-blog" element={<EditPage />} />
          <Route path="/images-blog" element={<DetailsImagePage />} />
          <Route path="/feedbacks" element={<ManageFeedback />} />
          <Route path="/new-blog" element={<NewBlogPage />} />
          <Route path="/edit-main-blog-image" element={<EditMainImage />} />
          <Route path="/edit-category-data" element={<EditCAtegoryData />} />
          {/*<Route path="/signup" element={<SignUp />} /> */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
