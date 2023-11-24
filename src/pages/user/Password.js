import React,{ useState}from "react";
import UserNav from "../../components/nav/UserNav";
import firebase from "../../firebase"
import { toast } from "react-toastify";

const Password=()=>{
    const [password,setPassword]=useState()
    const[loading,setLoading]=useState(false)
    const handleSubmit =(e)=>{
e.preventDefault()
setLoading(true)
firebase.auth().currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("Password updated succesfully");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
    }

return(
<div className="container-fluid mt-5 pt-5 ">
    <div className="row">
        <div className="col-md-2">
            <UserNav/>
        </div>
        <div className="col">
            <form onSubmit={handleSubmit}>
             <div className="form-group">
             {loading ? (
            <h4 className="text-danger mt-2 mb-3">Loading..</h4>
          ) : (
            <h4 className=" mt-2 mb-3">Password Update</h4>
          )}
                <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="type new password"
                disabled={loading}
                />
                <button  className="btn btn-outline-primary rounded-pill text-center mt-4"
          style={{ width: '100%' }}
                disabled={!password || password.length<6 || loading}>
                    Submit
                </button>
             </div>
            </form>
        </div>
    </div>
</div>
)}

export default Password;