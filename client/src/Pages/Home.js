import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import BlogCards from "../Components/BlogCards";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/Post")
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="">
      <div>
        {posts.length > 0 ? (
          <Carousel posts={posts} />
        ) : (
          <div className="w-full h-[20vh] flex justify-center items-center">
            Loading...
          </div>
        )}
      </div>
      <div className="">
        <div className="flex justify-center my-2">
          <h1 className="text-4xl font-bold">Daily Blogs</h1>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-2">
            {posts.map((post) => (
              <div key={post._id}>
                <BlogCards {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[20vh] flex justify-center items-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
