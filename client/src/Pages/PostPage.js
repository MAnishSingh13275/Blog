import { Button, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";


const PostPage = () => { 
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext)
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
      <div className="flex flex-col items-center w-[80vw]">
        <h1 className="text-5xl font-bold capitalize">{postInfo.title}</h1>
        <div className="author capitalize font-bold">
          by {postInfo.author.username}
        </div>
        <Typography color="gray" className="font-light text-[10px] mb-2">
          <time>
            {" "}
            {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
          </time>
        </Typography>
        {userInfo.id === postInfo.author._id && <Link to={`/edit/${postInfo._id}`} ><Button>Edit Post</Button></Link>}
        <div className="my-5">
          <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
          className="flex flex-col items-center justify-center"
        />
      </div>
    </div>
  );
};

export default PostPage;
