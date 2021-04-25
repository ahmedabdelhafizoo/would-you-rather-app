import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="text-center col-md-8 col-lg-6 mx-auto p-0">
    <img
      src={require("../assets/images/404.svg").default}
      alt="404 not founded"
    />
    <h3 className="my-3">Page not found</h3>
    <Link to="/" className="text-primary font-weight-bold">
      Go To Home
    </Link>
  </div>
);

export default NotFound;
