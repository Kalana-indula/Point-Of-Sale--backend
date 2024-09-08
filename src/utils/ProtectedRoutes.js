import {Outlet, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

const ProtectedRoutes=()=>{

    const navigate=useNavigate();

    useEffect(() => {
        //Getting the token stored in login stage
        const token=localStorage.getItem("token");

        //Redirect user to login page if token is unavailable
        if(!token){
            navigate("/login/user");
        }else{
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
        }
    }, [navigate]);


    //Return child element
    if(!localStorage.getItem("token")){
        return null;
    }
    return<Outlet/>
}

export default ProtectedRoutes;