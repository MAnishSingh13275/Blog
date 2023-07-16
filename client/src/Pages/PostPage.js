import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";

  return (
    <div className="flex flex-col items-center m-5">
      <div className="flex flex-col items-center gap-10 w-[80vw]">
        <div className="image">
          <img src={`http://localhost:4000/${postInfo.cover}`} />
        </div>
        <h1 className="text-5xl font-bold capitalize">{postInfo.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className="flex flex-col items-center justify-center" />
      </div>
    </div>
  );
};

export default PostPage;
