import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main';
import axios from 'axios';
import {toast} from 'react-hot-toast';

const handleAccept = async(id)=>{
  try {
    const {data}=await axios.put(`http://localhost:4000/api/v1/request/accpetReq/${id}`,{},{withCredentials:true,headers:{'Content-Type':'application/json'}})
    toast.success('Request accepted successfully.');
    window.location.reload(); 
  } catch (error) {
    toast.error(error.response.data.message);
    // console.log(error);
  }
}

const RequestDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/request/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.req);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        navigateTo("/notfound");
      });
  }, [isAuthorized]);

  if(!isAuthorized){
    navigateTo('/login');
  }
  return (
    <>
    <div className='jobDetail page'>
      <div className="container">
        <h3>Request Details</h3>
        <div className="banner">
            <p>
            Title : <span>{job.title}</span>
          </p>
          <p>
            Customer : <span>{job.req_name}</span>
          </p>
          <p>
            Category : <span>{job.category}</span>
          </p>
          <p>
            Description : <span>{job.description}</span>
          </p>
          <p>
            Mobile Number : <span>{job.phone}</span>
          </p>
          <p>
            Location : <span>{job.location}</span>
          </p>
          <p>
            Created On  : <span>{job.requestCreatedon}</span>
          </p>
          {
            user && user.role==='Mechanic'? (<><button onClick={()=>handleAccept(job._id)} type='submit'>Accept</button></>):(<></>)
          }
        </div>
      </div>
    </div>
    </>
  )
}

export default RequestDetails
