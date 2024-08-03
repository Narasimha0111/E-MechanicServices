import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MyServices = () => {

  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/getMyser',{withCredentials:true}).then((res)=>{
        setRequests(res.data);
            })
    } catch (error) {
      console.log(error);
    }
  },[isAuthorized])

  if(!isAuthorized){
    navigateTo('/login');
  }



  return (
    <>
    <section className='jobs page'>
      <div className="container">
        <h1>My Services</h1>
        <div className="banner">
          {
            requests.myServ && requests.myServ.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.req_name}</p>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <Link to={`/req/${element._id}`}>Request Details</Link>
                  <p>{element.requestCreatedon}</p>
                  <p>{element.status}</p>
                  <Link to={`/upser/${element._id}`}>Update the Status</Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
    </>
  )
}

export default MyServices