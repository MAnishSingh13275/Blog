import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const notLoggedIn = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal "
      >
        <Link to="/" className="flex items-center hover:text-blue-900">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal "
      >
        <Link to="/Login" className="flex items-center hover:text-blue-900">
          Login
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal "
      >
        <Link to="/SignUp" className="flex items-center hover:text-blue-900">
          SignUp
        </Link>
      </Typography>
    </ul>
  );
  const loggedIn = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal "
      >
        <Link to="/" className="flex items-center hover:text-blue-900">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/MyBlogs" className="flex items-center hover:text-blue-900">
          My Blogs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          to="/CreatePost"
          className="flex items-center hover:text-blue-900"
        >
          CreatePost
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link
          onClick={logout}
          className="flex items-center hover:text-blue-900"
        >
          LogOut
        </Link>
      </Typography>
    </ul>
  );
  function logout() {
    fetch("http://localhost:4000/LogOut", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    <Navigate to={"/Home"}/>
  }

  const email = userInfo?.email;
  return (
  
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as={Link}
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            LOGO
          </Typography>
          <div className="flex items-center gap-4">
            {email && (
              <>
                <div className="mr-4 hidden lg:block">{loggedIn}</div>
              </>
            )}
            {!email && (
              <>
                <div className="mr-4 hidden lg:block">{notLoggedIn}</div>
              </>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {email && (
            <>
              <div className="mr-4 hidden lg:block">{loggedIn}</div>
            </>
          )}
          {!email && (
            <>
              <div className="mr-4 hidden lg:block">{notLoggedIn}</div>
            </>
          )}
        </MobileNav>
      </Navbar>
  );
};

export default NavBar;
