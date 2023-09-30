import React, { useEffect, useState } from "react";
import BlogCards from "../Components/BlogCards";
import Featured from "../Components/Featured";

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
    <div className="flex justify-between">
      <div className="w-2/3">
        {posts.length > 0 &&
          posts.map((post) => <BlogCards key={post} {...post} />)}
      </div>
      <div className="w-1/3">
        {posts.length > 0 &&
          posts.map((post) => <Featured key={post} {...post} />)}
      </div>
    </div>
  );
};

export default Home;
