import React from "react";

const Loader = ({ size = 100, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#FFF"
      strokeWidth="10"
      {...props}
    >
      <circle cx="50" cy="50" r="35" strokeOpacity="0.2" />
      <circle cx="50" cy="50" r="35">
        <animate
          attributeName="stroke-dasharray"
          from="0 220"
          to="220 220"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-220"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default Loader;
