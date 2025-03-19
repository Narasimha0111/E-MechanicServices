import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostReq = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  

  const { isAuthorized, user } = useContext(Context);

  const handleReqPost = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/v1/request/postReq",
         {
              title,
              description,
              category,
              location,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(); 
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Customer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>APPLY FOR A NEW REQUEST</h3>
          <form onSubmit={handleReqPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Service Title"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                
                <option value="">Select Category</option>
                <option value="Periodic Services">Periodic Services</option>
                <option value="Deep All Round Spa">
                Deep All Round Spa
              
                </option>
                <option value="Premium Top Wash">
                Premium Top Wash
                </option>
                <option value="AC service & repair">
                AC service & repair
                </option>
                <option value="Tyres & wheel care">Tyres & wheel care</option>
                <option value="Car Inspections">
                Car Inspections
                </option>
                <option value="Fuel Emergency">Fuel Emergency</option>
                <option value="WindShields & Lights">
                WindShields & Lights
                </option>
                <option value="Breaks & Batteries">
                Breaks & Batteries
                </option>
                <option value="Oil Exchange & Break Fluid Check">Oil Exchange & Break Fluid Check</option>
                <option value="Air Filter">Air Filter</option>
                <option value="Electric Services">Electric Services</option>
              </select>
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
            <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target,value)}
            placeholder="service"
            />
            
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Problem Description"
            />
            <button type="submit">Raise a Request</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostReq