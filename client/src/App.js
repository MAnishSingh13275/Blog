import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MyBlogs from "./Pages/MyBlogs";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Pages/CreatePost";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/MyBlogs" element={<MyBlogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/CreatePost" element={<CreatePost />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
