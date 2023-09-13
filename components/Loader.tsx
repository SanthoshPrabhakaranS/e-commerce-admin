"use client";

import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loader = () => {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <BounceLoader
        color={"#b7babc"}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
