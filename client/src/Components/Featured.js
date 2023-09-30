import { React } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Featured({
  title,
  summary,
  cover,
  content,
  author,
  createdAt,
  _id,
}) {
  return (
    <Card className="grid m-5 w-[25vw]">
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
      <CardBody className="flex flex-col justify-around h-[30vh] p-3">
        <div className="overflow-clip">
          <div className="h-[35%] overflow-hidden">
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
          <div className="h-[35%] overflow-hidden">
            <Typography color="gray" className="font-normal">
              {summary}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
