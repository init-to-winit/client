import React, { useState } from "react";
import Testimonial from "../../assets/images/Testimonial.jpg";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      quote:
        "This platform has completely changed the way I connect with coaches. The personalized analytics helped me improve my game tremendously!",
      name: "Alex Carter",
      position: "Professional Soccer Player",
      image: "/images/testimonials/alex-carter.jpg",
    },
    {
      quote:
        "Finding talented athletes has never been easier. The data-driven insights allow me to scout and train players effectively.",
      name: "Coach Michael Roberts",
      position: "Basketball Coach",
      image: "/images/testimonials/michael-roberts.jpg",
    },
    {
      quote:
        "As a sponsor, I can now discover rising stars with great potential. The platform bridges the gap between players and sponsors seamlessly.",
      name: "Samantha Lee",
      position: "Sports Sponsorship Manager",
      image: "/images/testimonials/samantha-lee.jpg",
    },
    {
      quote:
        "I love how I can track my progress, get feedback, and access opportunities that were previously out of reach. This app is a game-changer!",
      name: "Jordan Smith",
      position: "Aspiring Tennis Player",
      image: "/images/testimonials/jordan-smith.jpg",
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <img
        className="absolute top-0 left-0"
        src="saturn-assets/images/testimonials/blue-light.png"
        alt=""
      />
      <img
        className="absolute bottom-0 right-0"
        src="saturn-assets/images/testimonials/orange-light.png"
        alt=""
      />
      <div className="relative container px-4 mx-auto">
        <div className="max-w-lg lg:max-w-7xl mx-auto">
          <div className="flex flex-wrap -mx-4 mb-18 items-center">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <div className="max-w-md xl:max-w-xl">
                <h1 className="font-heading text-4xl xs:text-6xl font-bold text-primary">
                  <span>Our</span>{" "}
                  <span className="font-serif bg-secondary italic">happy</span>{" "}
                  <span>clients say about us</span>
                </h1>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-md lg:ml-auto">
                <p className="text-gray-500">
                  Connecting athletes, coaches, and sponsors like never before.
                  Whether you're training for excellence, scouting the best
                  talent, or investing in future champions, our platform
                  empowers your journey to success.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4 items-center">
            <div class="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <div class="lg:max-w-md xl:max-w-lg">
                <img class="block w-full rounded-xl" src={Testimonial} alt="" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="max-w-lg">
                <img
                  className="block mb-8"
                  src="saturn-assets/images/testimonials/quote.svg"
                  alt=""
                />

                <div>
                  <p className="text-2xl font-semibold text-gray-900 mb-5">
                    “{testimonials[current].quote}”
                  </p>
                  <span className="block text-gray-900 font-semibold mb-1">
                    — {testimonials[current].name}
                  </span>
                  <span className="block text-gray-500 mb-10">
                    {testimonials[current].position}
                  </span>
                </div>

                <div className="flex gap-3">
                  {testimonials.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer ${
                        current === index ? "bg-orange-900" : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
