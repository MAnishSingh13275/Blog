import { React } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {format} from "date-fns"

export default function BlogCards({ title, summary, cover, content, createdAt }) {
  return (
    <Card className="flex-row w-full max-w-[48rem] m-5">
      <CardHeader
        shadow={false}
        floated={false}
        className="w-2/5 shrink-0 m-0 rounded-r-none"
      >
        <img
          src={'http://localhost:4000/'+cover}
          alt="image"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="blue" className="uppercase mb-4">
          startups
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="font-light text-[10px] mb-8">
         <time> {format(new Date(createdAt),"MMM d, yyyy HH:mm")}</time>
        </Typography>
        <Typography color="gray" className="font-normal mb-8">
          {summary}
        </Typography>
        <a href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Learn More
            <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
          </Button>
        </a>
      </CardBody>
    </Card>
  );
}
