import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Requests = () => {
  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/getAll',{withCredentials:true}).then((res)=>{
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
        <h1>All Requests History</h1>
        <div className="banner">
          {
            requests.requests && requests.requests.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.req_name}</p>
                  <p>{element.pick_name}</p>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.status}</p>
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

export default Requests