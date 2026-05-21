import {Navigate} from "react-router-dom";
import {MyContext} from "./MyContext.jsx";
import {useContext} from "react";

function ProtectedRoute({children}){
    const {user, loading}= useContext(MyContext);

    console.log("USER IN PROTECTED", user);
    console.log("LOADING", loading);

    if(loading){
        return <h1>Loading...</h1>
    }
    // console.log("For delete account", user);
    if(!user){
        return <Navigate to="/login" />
    }
    return children;
}

export default ProtectedRoute;