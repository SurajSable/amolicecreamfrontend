import React, { useEffect, useState } from "react";
import firebase from '../../firebase';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false);
  const data = useSelector((stated) => stated.user)
  const navigate = useNavigate()
  useEffect(() => {
    if (data?.email && data?.token) navigate("/")
  }, [data, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };
    await firebase.auth()
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });

  }

  return (
    <div className="container col-md-6 offset-md-3 p-5 mt-5 ">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4 className="mb-3">Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <div class="d-grid gap-2 ">
          <button className=" d-grid gap-2 btn btn-primary mt-3 rounded-pill" disabled={!email}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default ForgotPassword;