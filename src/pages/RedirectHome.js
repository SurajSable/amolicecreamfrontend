import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHome = () => {
  const navigate = useNavigate()
  const [count, setCount] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="container p-5 text-center mt-5 pt-5">
      <div className="text-danger">Your are not authorised for this page , Please click on below link to go Home page</div>
      <Link to="/">Home Page</Link>
      <p>Redirecting you on home page in {count} seconds</p>
    </div>
  )
}
export default RedirectHome;