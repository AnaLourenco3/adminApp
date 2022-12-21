import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload.js";

import { Navigation, MessageBox } from "./components";
// import { Homepage, Login, SignUp } from "./pages"

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
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
      {/* <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes> */}
    </div>
  );
}

export default App;
