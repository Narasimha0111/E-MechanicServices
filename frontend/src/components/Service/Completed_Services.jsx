import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Completed_Services = () => {

  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/ComSer',{withCredentials:true}).then((res)=>{
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
        <h1>Completed Services</h1>
        <div className="banner">
          {
            requests.myServ && requests.myServ.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.req_name}</p>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.requestCreatedon}</p>
                  <p>{element.status}</p>
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

export default Completed_Services