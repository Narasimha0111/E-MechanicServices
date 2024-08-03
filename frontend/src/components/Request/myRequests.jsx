import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';


const handleDelete = async(id)=>{
  try {
    await axios.delete(`http://localhost:4000/api/v1/request/delReq/${id}`,{withCredentials:true,headers:{'Content-Type':'application/json'}})
    toast.success('Request Deleted successfully.');
  } catch (error) {
    toast.error(error.response.data.message);

  }
}

const MyRequests = () => {

  const [requests,setRequests]=useState([])
  const {isAuthorized}=useContext(Context);
  const navigateTo=useNavigate();

  useEffect(()=>{
    try {
      axios.get('http://localhost:4000/api/v1/request/getMyReq',{withCredentials:true}).then((res)=>{
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
    <>
     <section className='jobs page'>
      <div className="container">
        <h1>My Requests</h1>
        <div className="banner">
          {
            requests.myReq && requests.myReq.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <Link to={`/req/${element._id}`}>Request Details</Link>
                  <p>{element.requestCreatedon}</p>
                  
                  {
                    element.status==='Raised'? (<>
                    <button onClick={()=>handleDelete(element._id)}>Delete</button>
                      <Link to={`/upreq/${element._id}`}>Update Request</Link>    
                    </>):(<><p>{element.status}</p></>)
                  }

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

export default MyRequests