import React, { useContext, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const login = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/Login", {
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Error");
    }
  };

  const setPass = (e) => {
    setPassword(e.target.value);
  };
  const setMail = (e) => {
    setEmail(e.target.value);
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h1"
          color="blue-gray"
          className="flex justify-center"
        >
          Login Up
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" value={email} onChange={setMail} />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={setPass}
            />
            <Button onClick={login}>Login</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
