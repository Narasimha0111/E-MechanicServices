import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import {toast} from 'react-hot-toast'
import { Navigate,Link, redirect ,useNavigate} from 'react-router-dom'
import { FaRegUser,FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from 'react-icons/fa6';
import {RiLock2Fill} from 'react-icons/ri'
import axios from 'axios';

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [role,setRole]=useState("")
  const navigateTo=useNavigate();

  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context)

  const handleLogin = async(e)=>{
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/user/login',{email,password,role},{withCredentials:true,headers:{'Content-Type':'application/json'}})
      toast.success('User Login Successful');
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      navigateTo('/');
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  }

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }
  return <>
  <div className="authPage">
      <div className="container">
        <div className="left">
      <div className="header">
          <img src="/login2.jpg" alt="logo" />
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As </label>
            <div>
              <select value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Customer">Customer</option>
                <option value="Mechanic">Mechanic</option>
                <option value="Admin">Admin</option>
              </select>
              <FaRegUser></FaRegUser>
            </div>
          </div>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
              placeholder="Eg:raja@gmail.com" />
              <MdOutlineMailOutline></MdOutlineMailOutline>
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password" />
              <RiLock2Fill></RiLock2Fill>
            </div>
          </div>
          <button type="submit">Login</button>
          <Link to={'/register'}>New User</Link>
        </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="Login" />
        </div>
      </div>
    </div>
  </>
}

export default Login