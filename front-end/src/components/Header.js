import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function Header(){
  

  const {setUserInfo, userInfo}= useContext(UserContext);
  

  useEffect(()=>{

    fetch('http://localhost:4000/profile', {

      credentials: 'include',
    }).then(response => {
       response.json().then(userInfo => {

         setUserInfo(userInfo);

       })
    })

  }, [])


  function logout() {
    fetch('http://localhost:4000/auth/logout', {

    credentials: "include",
    method: "POST"
    });
    setUserInfo('');
  }

  const username= userInfo?.username;

    return(

    //  =========================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        <header>
        <Link to='/' className="logo">
          MyBlog
        </Link>
        <nav>
          {username && (
            <>
             <Link to="/create">
              <b>Create new post</b>
             </Link>

             <a onClick={logout}><b>Logout</b></a>
            </>
          )}
          {! username && (
            <>

          <Link to="/login">
            <b>Login</b>
          </Link>

          <Link to="/register">
           <b>Register</b> 
          </Link>
            </>
          )}
         
        </nav>
      </header>
    //  =========================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



      
    )
}