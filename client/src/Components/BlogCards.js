import { React } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function BlogCards({
  title,
  summary,
  cover,
  content,
  createdAt,
  _id
}) {
  return (
    <Card className="flex-row w-full max-w-[48rem] m-5">
      {" "}
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 shrink-0 m-0 rounded-r-none"
      >
        <Link to={`/post/${_id}`}>
          <img
            src={"http://localhost:4000/" + cover}
            alt="image"
            className="w-full h-full object-cover"
          />
        </Link>
      </CardHeader>
      <CardBody className="w-[35vw] flex flex-col justify-around h-[35vh]">
        <div className="overflow-clip">
          {" "}
          <Link to={`/post/${_id}`}>
            <Typography variant="h4" color="blue-gray" className="mb-2 text-center">
              {title}
            </Typography>
          </Link>
          <Typography color="gray" className="font-light text-[10px] mb-8">
            <time> {format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
          </Typography>
          <Typography color="gray" className="font-normal mb-8">
            {summary}
          </Typography>
        </div>
        <div>
          <Link to={`/post/${_id}`} className="p-0">
            <Button variant="text" className="flex items-center p-0 gap-2">
              Learn More
              <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
