import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../Components/Editor";


const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const addTitle = (e) => {
    setTitle(e.target.value);
  };
  const addSummary = (e) => {
    setSummary(e.target.value);
  };
  const addFiles = (e) => {
    setFiles(e.target.files);
  };
  const createNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    e.preventDefault();
    console.log(files);
    const response = await fetch("http://localhost:4000/Post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Fields can not be empty");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <form className="mt-8 mb-2 flex justify-center">
        <div className="mb-4 flex flex-col w-[80%] gap-6 text-center ">
          <Input
            size="lg"
            label="Title"
            type="text"
            value={title}
            onChange={addTitle}
          />
          <Input
            size="lg"
            label="Summary"
            type="text"
            value={summary}
            onChange={addSummary}
          />
          <Input type="file" size="lg" label="Image" onChange={addFiles} />
          <Editor value={content} onChange={setContent} />
          <Button onClick={createNewPost}>Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
