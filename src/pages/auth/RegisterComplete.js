import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from '../../firebase';
import { toast } from "react-toastify";
import { createOrUpdateUser } from "../../functions/auth";
import loggedInUser from "../../redux/actions/loggedInUser";
import { useDispatch } from "react-redux";

const RegisterCompleteForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"))
  }, [])
  //api call -data -it required  time
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await firebase.auth().signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = firebase.auth().currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redirect
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch(loggedInUser({
              email: res.data.email,
              name: res.data.name,
              role: res.data.role,
              id: res.data._id,
              token: idTokenResult.token,
            }));
          }
          )
          .catch(err => console.log("createUpdateuser", err));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (<>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        placeholder="Please type your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled
      />
      <input
        type="password"
        className="form-control mt-2"
        placeholder="Please type your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <button type="submit" className="btn btn-primary rounded-pill mt-3">Registration Complete</button>
    </form>
  </>)
}
const RegisterComplete = () => {
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete Form</h4>
          <RegisterCompleteForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterComplete;