import React, { useEffect, useState } from "react";
import ViewsFilter from "./ViewsFilter";

const Filters = () => {
  const [selectedView, setSelectedView] = useState("all");

  const handleSelect = (value: string) => {
    setSelectedView(value);
    console.log("Selected view:", value);
  };

  useEffect(() => {
    console.log("selectedView", selectedView);
  }, [selectedView]);

  return (
    <div>
      <ViewsFilter onSelect={handleSelect} />
      {/* You can now use selectedView for filtering or other logic */}
    </div>
  );
};

export default Filters;
