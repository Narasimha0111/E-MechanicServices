import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ActiveRequests = () => {
  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/getAct',{withCredentials:true}).then((res)=>{
        setRequests(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  },[isAuthorized])

  if(!isAuthorized){
    navigateTo('/login');
  }
  return (
    <section className='jobs page'>
      <div className="container">
        <h1>Active Requests</h1>
        <div className="banner">
          {
            requests.requests && requests.requests.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.req_name}</p>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <Link to={`/req/${element._id}`}>Request Details</Link>
                  <p>{element.requestCreatedon}</p>
                  
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default ActiveRequests