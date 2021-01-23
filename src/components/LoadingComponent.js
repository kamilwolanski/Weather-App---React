import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingComponent = () => {
  let [loading] = useState(true);
  let [color] = useState("#ffffff");
  return (
    <>
      <div className="sweet-loading">
        <ClipLoader color={color} loading={loading} size={150} />
      </div>
    </>
  );
};

export default LoadingComponent;
