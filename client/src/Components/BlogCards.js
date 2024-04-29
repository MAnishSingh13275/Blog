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
    <Card className="grid lg:grid-row-2 mx-auto mt-5 max-w-[40vw] h-[70vh] overflow-hidden">
      <CardHeader
        shadow={false}
        floated={false}
        className="max-w-full h-[35vh] rounded m-2"
      >
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            className="w-full h-full object-top object-cover rounded"
            alt=""
          />
        </Link>
      </CardHeader>
      <CardBody className="">
        <div className="">
          <Link to={`/post/${_id}`} className="">
            <Typography
              variant="h4"
              color="blue-gray"
              className=" line-clamp-1"
            >
              {title}
            </Typography>
          </Link>

          <div className="">
            <Typography color="gray" className="font-bold">
              {author.username}
            </Typography>
            <Typography color="gray" className="font-light text-[10px]">
              <time> {format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
            </Typography>
          </div>
          <Typography color="gray" className="font-normal line-clamp-4">
            {summary}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
