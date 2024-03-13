import React from "react";
import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> {location.state.message}</h1>
    </div>
  );
}
export default Error;
