import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Featured from "./Featured";

const Carousel = ({ posts }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true, // Enable autoplay
    // autoplaySpeed: 3000, // Set autoplay interval in milliseconds (e.g., 3000ms = 3 seconds)
    // Adjust these values to change the gap between posts
    slideMargin: 4, // Margin between slides
    cssEase: "linear", // Smooth transition
  };

  return (
    <div className="p-2">
      <div className="flex justify-center my-2">
        <h1 className="text-4xl font-bold">Featured Blogs</h1>
      </div>
      <div className="carousel-container min-w-0 overflow-hidden h-[30vh]">
        <Slider {...settings}>
          {posts.length > 0 &&
            posts.map((post) => (
              <div key={post._id}>
                <Featured {...post} />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
