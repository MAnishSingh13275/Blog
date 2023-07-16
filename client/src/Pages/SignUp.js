import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const setUser = (e) => {
    setUsername(e.target.value);
  };
  const setPass = (e) => {
    setPassword(e.target.value);
  };
  const setMail = (e) => {
    setEmail(e.target.value);
  };
  const [redirect, setRedirect] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/SignUp", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration Done");
      setRedirect(true);
    }
    if (username === "" || password === "" || email === "") {
      alert("All fields are required");
    }
    if (response === 400) {
      alert("User already exists");
    }
  };

  if (redirect) {
    return <Navigate to={"/Login"} />;
  }
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h4"
          color="blue-gray"
          className="flex justify-center"
        >
          Sign Up
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal flex justify-center"
        >
          Enter your details to register.
        </Typography>
        <form
          onSubmit={register}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" value={username} onChange={setUser} />
            <Input size="lg" label="Email" value={email} onChange={setMail} />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={setPass}
            />
            <Button onClick={register}>Register</Button>
          </div>
        </form>
        <Typography
          id="btn"
          color="gray"
          className="mt-4 text-center font-normal"
        >
          Already have an account?{" "}
          <Link
            to="/Login"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign In
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default SignUp;
