import React, { useEffect, useState } from "react";
import BlogCards from "../Components/BlogCards";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/Post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>{posts.length > 0 && posts.map((post) => <BlogCards {...post} />)}</>
  );
};

export default Home;
