import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';



const handleValidate = async(id)=>{
    // e.preventDefault();
    try {
      const {data}=await axios.put(`http://localhost:4000/api/v1/user/val/${id}`,{},{withCredentials:true,headers:{'Content-Type':'application/json'}})
      toast.success('User validated successfully.');
      window.location.reload(); 
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  }


  const handleDelete = async(id)=>{
    try {
      const {data}=await axios.delete(`http://localhost:4000/api/v1/user/deluser/${id}`,{},{withCredentials:true,headers:{'Content-Type':'application/json'}})
      toast.success('User Deleted successfully.');
      window.location.reload(); 
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  }


const Users = () => {

    const [users,setusers]=useState([])
    const {isAuthorized}=useContext(Context);
    const navigateTo=useNavigate();


    useEffect(()=>{

        
        
        try {
          axios.get('http://localhost:4000/api/v1/user/getAll',{withCredentials:true}).then((res)=>{
            setusers(res.data);
          })
        } catch (error) {
          console.log(error);
        }
      },[isAuthorized])
    
      
      if(!isAuthorized){
        navigateTo('/login');
        return ;
      }
      

  return (
    <>
    <section className='jobs page'>
      <div className="container">
        <h1>User list</h1>
        <div className="banner">
          {
            users.users && users.users.map((element)=>{
              return (
                <div className="card" key={element._id}>
                  <p>{element.name}</p>
                  <p>{element.email}</p>
                  <p>{element.phone}</p>
                  <p>{element.createdAt}</p>
                  <p>{element.role}</p>
                  <button onClick={() => handleValidate(element._id)} type='submit'>Validate</button>
                  <button onClick={() => handleDelete(element._id)} type='button'>Delete</button>
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

export default Users