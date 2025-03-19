import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {GiHamburgerMenu} from 'react-icons/gi'
import {toast} from 'react-hot-toast';

const Navbar = () => {
  const {show,setShow}=useState(false);
  const {isAuthorized,setIsAuthorized,user} = useContext(Context);
  console.log(user)
  console.log(`********************************Is Authorized is :${isAuthorized}*******************************`);
  const navigateTo=useNavigate();
  const handleLogout = async()=>{
    try {
      const response = await axios.get('http://localhost:4000/api/v1/user/logout',{withCredentials:true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo('/login');
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  }
  return (
    <>
    <nav className={isAuthorized? "navbarShow":"navbarHide"}>
      <div className="container">
        <div className="logo">
          <img id='logo'  src="/logo3.avif" alt="logo" />
        </div>
        <ul className={!show ? "menu":"show-menu menu"}>
          <li>
            <Link to={'/'} onClick={()=>setShow(false)}>Home</Link>
          </li>

          {
            user && user.role==='Admin' && isAuthorized ? (
              <>
              <li>
            <Link to={'/req/getAll'} onClick={()=>setShow(false)}>ALL Requests</Link>
            </li>
            <li>
            <Link to={'/actusers'} onClick={()=>setShow(false)}>ALL Verified Users</Link>
            </li>
            <li>
            <Link to={'/getUsers'} onClick={()=>setShow(false)}>Verification Pending</Link>
            </li>
              </>
            ):(
              <></>
            )
          }
          
          {
            user && user.role==='Customer' && isAuthorized ? (
              <>
              <li>
                <Link to={'/req/post'} onClick={()=>setShow(false)}>Raise a Request</Link>
              </li>
              <li>
                <Link to={'/myreq'} onClick={()=>setShow(false)}>My Active Requests</Link>
              </li>
              <li>
                <Link to={'/ComReq'} onClick={()=>setShow(false)}>Completed Requests</Link>
              </li>
              </>
            ):(
              <></>
            )
          }
          {
            user && user.role==='Mechanic' && isAuthorized ? (
              <>
              <li>
                <Link to={'/myserv'} onClick={()=>setShow(false)}>My Active Services</Link>
              </li>
              <li>
              <Link to={'/actreq'} onClick={()=>setShow(false)}>Active Requests</Link>
              </li>
              <li>
                <Link to={'/ComSer'} onClick={()=>setShow(false)}>Completed Services</Link>
              </li>
              </>
            ):(
              <></>
            )
          }
          <button onClick={handleLogout}>LOGOUT</button>  
        </ul>
        <div className='hamburger'>
          <GiHamburgerMenu onClick={()=>setShow(!show)}/>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar