import React, { useState, useEffect } from "react";
import firebase from '../../firebase';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Registerform = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("env", process.env.REACT_APP_REGISTER_REDIRECT_URL)
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        };
        try {
            await firebase.auth().sendSignInLinkToEmail(email, config)
            toast.success(
                `Email is sent to ${email}. Click the link to complete your registration.`
            );
            // save user email in local storage
            window.localStorage.setItem("emailForRegistration", email);
        } catch (error) {
            toast.error(`An error occurred! ${error.message}`);
        }
        //clear email
        setEmail("")
    }

    return (
        <div className="mb-2">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Please type your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
                <div class="d-grid gap-2 ">
                    <button className=" d-grid gap-2 btn btn-primary mt-3 rounded-pill" disabled={!email}>
                        Register
                    </button>
                </div>
            </form>
        </div>)
}

const Register = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if (user?.email && user?.token) navigate("/")
    }, [user, navigate])
    return (
        <div className="container p-5 mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 ">
                    <h4 className="mb-3">Register</h4>
                    <Registerform />
                </div>
            </div>
        </div>
    )
}

export default Register;