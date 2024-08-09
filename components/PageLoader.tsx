import React from "react";
import Loader from "./Loader";
import Heading from "./Heading";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-100 z-50">
      <div className="flex gap-2 justify-center items-center">
        <Loader size={100} />{" "}
        <Heading level={1} size="xxl" className="text-gray-50">
          Loading ...
        </Heading>
      </div>
    </div>
  );
};

export default PageLoader;
