import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';



const CompletedRequests = () => {

  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/ComReq',{withCredentials:true}).then((res)=>{
        setRequests(res.data);
        toast.success('Requests are fetched');
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
        <h1>Completed Requests</h1>
        <div className="banner">
          {
            requests.myReq && requests.myReq.map((element)=>{
              return (
                <div className="card" key={element._id}>
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
    </>
  )
}

export default CompletedRequests