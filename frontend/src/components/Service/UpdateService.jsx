import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const UpdateService = () => {

  const [status,setStatus]=useState("");
  const [ser_des,setSer_des]=useState("");

  const { isAuthorized, user } = useContext(Context);
  const {id}=useParams();

  const handleReqStatus = async (e) => {
    e.preventDefault();
    
    await axios
      .put(
        `http://localhost:4000/api/v1/request/updReq/${id}`,
         {
              status,
              ser_des,
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
  if (!isAuthorized || (user && user.role !== "Mechanic")) {
    navigateTo("/");
  }
  return (
    <>
    <div className="job_post page">
        <div className="container">
          <h3>Update the Status</h3>
          <form onSubmit={handleReqStatus}>
            <div className="wrapper">
              
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Update Status</option>
                <option value="Repairing">Repairing</option>
                <option value="Service completed">
                Service completed
                </option>
              </select>
            </div>
            <textarea
              rows="10"
              value={ser_des}
              onChange={(e) => setSer_des(e.target.value)}
              placeholder="Service Description"
            />
            <button type="submit">Update Status</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateService