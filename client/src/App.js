import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MyBlogs from "./Pages/MyBlogs";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/MyBlogs" element={<MyBlogs/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/SignUp" element={<SignUp/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
