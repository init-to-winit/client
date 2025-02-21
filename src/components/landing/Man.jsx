import React from "react";
import ManRunning from "../../assets/images/man-running.png";
import { CircleCheckBig } from "lucide-react";
export default function Man() {
  return (
    <div className="flex max-7xl mx-auto items-center justify-center gap-16 mb-[5rem]">
      <div>
        <div className="my-[2rem]">
          <h1 className="text-4xl my-3 font-medium bg-secondary px-4 rounded-md py-2 text-primary inline-block">
            Empowering Athletes
          </h1>
          <h1 className="text-4xl font-medium px-4 rounded-sm text-primary">
            through every connection.
          </h1>
        </div>
        <p className="max-w-lg">
          Seamless athlete management and reliable performance insights. You can
          trust Vismoh to deliver every time.
        </p>
        <p className="my-7">Look no further for the solution to your needs.</p>
        <div className="flex gap-8">
          <div className="flex gap-2">
            <CircleCheckBig size={20} />
            <p className="font-semibold">Beautiful Sections</p>
          </div>
          <div className="flex gap-2">
            <CircleCheckBig size={20} />
            <p className="font-semibold">Suited to every player</p>
          </div>
        </div>
      </div>
      <div>
        <img src={ManRunning} alt="" />
      </div>
    </div>
  );
}
