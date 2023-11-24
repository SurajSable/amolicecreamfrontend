
const loggedInUser=(data)=>{
    return{
        type:"LOGGED_IN_USER",
        payload:data
    }
}
export default loggedInUser;