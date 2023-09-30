import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";

const EditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then(response => {
      response.json().then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  const UpdatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  const addTitle = (e) => {
    setTitle(e.target.value);
  };
  const addSummary = (e) => {
    setSummary(e.target.value);
  };
  const addFiles = (e) => {
    setFiles(e.target.files);
  };



  if (redirect) {
    return <Navigate to={"/post/" + id} />;
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
          <Button onClick={UpdatePost}>Update</Button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
