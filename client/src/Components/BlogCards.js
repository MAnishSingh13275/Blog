import { React } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function BlogCards({
  title,
  summary,
  cover,
  content,
  author,
  createdAt,
  _id,
}) {
  return (
    <Card className="grid lg:grid-cols-2 m-5 w-[50vw]">
      <CardHeader
        shadow={false}
        floated={false}
        className="shrink-0 m-2 lg:rounded-r-none rounded"
      >
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            className="w-full h-full object-cover"
            alt=""
          />
        </Link>
      </CardHeader>
      <CardBody className="flex flex-col justify-around h-[35vh] p-3">
        <div className="overflow-clip">
          <div className="truncate">
            <Link to={`/post/${_id}`} className="">
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 capitalize"
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
          <Typography color="gray" className="font-normal text-ellipsis line-clamp-4">
            {summary}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
