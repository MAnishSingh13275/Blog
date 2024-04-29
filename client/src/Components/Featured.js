import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Featured = ({ title, summary, cover, author, createdAt, _id }) => {
  return (
    <Card className="grid grid-cols-2 m-5 items-start">
      <CardHeader
        shadow={false}
        floated={false}
        className="rounded m-2"
      >
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            className="w-full h-full object-cover rounded"
            alt=""
          />
        </Link>
      </CardHeader>
      <CardBody className="flex flex-col justify-around p-3">
        <div className="overflow-clip">
          <div className="truncate">
            <Link to={`/post/${_id}`} className="">
              <Typography
                variant="h4"
                color="blue-gray"
                className="capitalize text-2xl truncate"
              >
                {title}
              </Typography>
            </Link>
          </div>
          <div className="">
            <Typography color="gray" className="font-bold">
              {author.username}
            </Typography>
            <Typography color="gray" className="font-light text-[10px]">
              <time> {format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </Typography>
          </div>
          <Typography color="gray" className="font-normal line-clamp-4 mt-2 truncate">
            {summary}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default Featured;
