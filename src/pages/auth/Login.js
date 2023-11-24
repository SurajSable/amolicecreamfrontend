import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import firebase, { googleAuthProvider } from '../../firebase';
import { useNavigate, useLocation } from "react-router-dom";
import EmailIcon from '@mui/icons-material/Email';
import { useDispatch, useSelector } from "react-redux";
import loggedInUser from "../../redux/actions/loggedInUser";
import { toast } from "react-toastify";
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()

    const roleBasedRedirect = (res) => {
        let intended = location?.state;
        if (intended) {
            navigate(intended.from);
        } else {
            if (res.data.role === 'admin') {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/history")
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch(loggedInUser({
                        email: res.data.email,
                        name: res.data.name,
                        role: res.data.role,
                        id: res.data._id,
                        token: idTokenResult.token,
                    }));
                    roleBasedRedirect(res)
                }
                )
                .catch(err => console.log("createUpdateuser", err));
            toast.success("login succesfull")
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    return (<div>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                placeholder="Please type your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <input
                type="password"
                className="form-control mt-3"
                placeholder="Please type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-grid gap-2">
                <Button variant="contained" disableElevation
                    type="submit"
                    className="btn btn-primary rounded-pill mt-3 object-fit-cover"
                    disabled={!email || password.length < 6}
                >
                    <EmailIcon className="me-2" /> Login with email/password
                </Button>
            </div>
        </form>
    </div>)
}

const Login = () => {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        let intended = location?.state;
        if (intended) {
            navigate(intended.from);
        } else {
            if (res.data.role === 'admin') {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/history")
            }
        }
    }
    useEffect(() => {
        let intended = location?.state;
        if (intended) {
            return;
        } else {
            if (user?.email && user?.token) navigate("/")
        }
    }, [user, navigate])

    const googleLogin = () => {
        firebase.auth()
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch(loggedInUser({
                            email: res.data.email,
                            name: res.data.name,
                            role: res.data.role,
                            id: res.data._id,
                            token: idTokenResult.token,
                        }));
                        roleBasedRedirect(res)
                    })
                    .catch(err => console.log("createUpdateuser", err));
                dispatch(loggedInUser({
                    email: user.email,
                    token: idTokenResult.token,
                }))
                toast.success("login successfull using Gmail");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    }
    return (
        <div className="container p-5 mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="mb-3">Login</h4>
                    <LoginForm />
                    <div className="d-grid gap-2">
                        <Button variant="contained" disableElevation
                            type="submit"
                            className="btn rounded-pill mt-3"
                            color="error"
                            onClick={googleLogin}
                        >
                            <GoogleIcon className="me-2" />  Login with google
                        </Button>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <Link to="/forgot/password" className=" text-primary ">
                            Forgot Password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;